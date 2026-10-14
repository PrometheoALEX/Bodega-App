import { useEffect, useState } from 'react';
import axiosClient from '../services/axiosClient'; // <-- Importamos tu cliente real de Axios

function Catalogo({
  volverAHome,
  irACarrito,
  aumentarCantidad,
  disminuirCantidad,
  carrito,
  usuarioActual,
}) {
  const [productos, setProductos] = useState([]);
  const [categoriasApi, setCategoriasApi] = useState(['Todos los productos']);
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos los productos');
  const [emailNewsletter, setEmailNewsletter] = useState("");
  const [mensajeNewsletter, setMensajeNewsletter] = useState("");
  const [cargandoProductos, setCargandoProductos] = useState(true);
  const [errorProductos, setErrorProductos] = useState("");

  useEffect(() => {
    let activo = true;

    async function cargarDatosBackend() {
      try {
        setCargandoProductos(true);
        
        // 1. Petición para obtener las categorías reales del backend
        const respuestaCategorias = await axiosClient.get('/categories');
        if (activo && respuestaCategorias.data) {
          // Adaptamos según cómo te devuelva el backend las categorías (ej. si son strings u objetos con .nombre)
          const nombresCategorias = respuestaCategorias.data.map(cat => typeof cat === 'string' ? cat : cat.nombre || cat.name);
          setCategoriasApi(['Todos los productos', ...nombresCategorias]);
        }

        // 2. Petición para obtener los productos (si aún no tienes productos, manejamos el array vacío o tu endpoint)
        try {
          const respuestaProductos = await axiosClient.get('/products');
          if (activo && respuestaProductos.data) {
            setProductos(respuestaProductos.data);
          }
        } catch {
          // Si el endpoint de productos aún no existe en tu backend, mantenemos la lista vacía sin romper la UI
          if (activo) setProductos([]);
        }

        setErrorProductos("");
      } catch (error) {
        if (activo) {
          setErrorProductos('Ocurrió un error al cargar los datos desde el servidor.');
        }
      } finally {
        if (activo) {
          setCargandoProductos(false);
        }
      }
    }

    cargarDatosBackend();

    return () => {
      activo = false;
    };
  }, []);

  const minimo = precioMin === "" ? null : Number(precioMin);
  const maximo = precioMax === "" ? null : Number(precioMax);
  const rangoInvalido = minimo !== null && maximo !== null && minimo > maximo;
  
  const productosDeCategoria = categoriaSeleccionada === 'Todos los productos'
    ? productos
    : productos.filter((producto) => producto.categoria === categoriaSeleccionada);
    
  const productosFiltrados = rangoInvalido
    ? []
    : productosDeCategoria.filter((producto) =>
        (minimo === null || producto.precio >= minimo) &&
        (maximo === null || producto.precio <= maximo),
      );

  function manejarNewsletter(e) {
    e.preventDefault();
    if (!emailNewsletter.trim()) {
      setMensajeNewsletter('Ingresa tu correo para suscribirte');
      return;
    }

    setMensajeNewsletter('¡Suscripción realizada correctamente!');
    setEmailNewsletter('');
  }

  return (
    <div className="catalogo">
      <div className="catalogo-acciones">
        <button type="button" onClick={volverAHome}>
          Volver a Home
        </button>
        <button
          type="button"
          className="boton-agregar-carrito"
          onClick={irACarrito}
          disabled={carrito.length === 0}
          aria-label="Abrir carrito de compras"
          title="Abrir carrito de compras"
        >
          Agregar al Carrito 🛒
        </button>
      </div>

      <header className="catalogo-header">
        <h1>Bodega</h1>
        <p className="catalogo-bienvenida">
          <span className="catalogo-avatar" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M20 21a8 8 0 0 0-16 0" />
              <circle cx="12" cy="8" r="4" />
            </svg>
          </span>
          <span>Bienvenido, {usuarioActual}</span>
        </p>
      </header>

      <div className="catalogo-layout">
        <aside className="catalogo-categorias">
          <h2>Categorías</h2>
          <nav aria-label="Categorías de productos">
            {categoriasApi.map((categoria) => {
              const cantidad = categoria === 'Todos los productos'
                ? productos.length
                : productos.filter((producto) => producto.categoria === categoria).length;

              return (
                <button
                  type="button"
                  key={categoria}
                  className={categoriaSeleccionada === categoria ? 'categoria-boton seleccionado' : 'categoria-boton'}
                  onClick={() => setCategoriaSeleccionada(categoria)}
                  aria-pressed={categoriaSeleccionada === categoria}
                >
                  <span>{categoria}</span>
                  <span className="categoria-cantidad">{cantidad}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="catalogo-contenido" aria-live="polite">
          <div className="filtro-precio" aria-label="Filtrar productos por precio">
            <label htmlFor="precio-min">Precio mínimo</label>
            <input
              id="precio-min"
              type="number"
              min="0"
              step="0.01"
              placeholder="Min"
              value={precioMin}
              onChange={(e) => setPrecioMin(e.target.value)}
            />
            <label htmlFor="precio-max">Precio máximo</label>
            <input
              id="precio-max"
              type="number"
              min="0"
              step="0.01"
              placeholder="Max"
              value={precioMax}
              onChange={(e) => setPrecioMax(e.target.value)}
            />
          </div>

          <div className="catalogo-resultados">
            <h2>{categoriaSeleccionada}</h2>
            {!cargandoProductos && !errorProductos && (
              <span>{productosFiltrados.length} productos</span>
            )}
          </div>

          {rangoInvalido && (
            <p className="filtro-mensaje" role="alert">
              El precio mínimo no puede ser mayor que el precio máximo.
            </p>
          )}

          {cargandoProductos && <p className="filtro-mensaje">Cargando datos del servidor...</p>}
          {!cargandoProductos && errorProductos && <p className="filtro-mensaje">{errorProductos}</p>}

          {!cargandoProductos && !errorProductos && (
            <div className="productos">
              {productosFiltrados.map((prod) => {
                const cantidad = carrito.find((producto) => producto.id === prod.id)?.cantidad || 0;

                return (
                  <div className="producto" key={prod.id}>
                    <img src={prod.imagen} alt={prod.nombre} />
                    <h3>{prod.nombre}</h3>
                    <p>S/ {prod.precio.toFixed(2)}</p>
                    <div className="producto-controles">
                      <button
                        type="button"
                        className="cantidad-boton"
                        onClick={() => disminuirCantidad(prod)}
                        aria-label={`Quitar una unidad de ${prod.nombre}`}
                      >
                        -
                      </button>
                      <span className="producto-cantidad">{cantidad}</span>
                      <button
                        type="button"
                        className="cantidad-boton"
                        onClick={() => aumentarCantidad(prod)}
                        aria-label={`Agregar una unidad de ${prod.nombre}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!rangoInvalido && !cargandoProductos && !errorProductos && productosFiltrados.length === 0 && (
            <p className="filtro-mensaje">No hay productos registrados o que coincidan con los filtros.</p>
          )}
        </section>
      </div>

      <footer className="catalogo-footer">
        <div>
          <h2>Recibe nuestras ofertas</h2>
          <p>Suscríbete al newsletter de TechStore.</p>
        </div>
        <form className="newsletter-form" onSubmit={manejarNewsletter}>
          <label htmlFor="newsletter-email">Correo electrónico</label>
          <div className="newsletter-controls">
            <input
              id="newsletter-email"
              type="email"
              placeholder="tu@correo.com"
              value={emailNewsletter}
              onChange={(e) => {
                setEmailNewsletter(e.target.value);
                setMensajeNewsletter("");
              }}
              required
            />
            <button type="submit">Suscribirme</button>
          </div>
          {mensajeNewsletter && <p role="status">{mensajeNewsletter}</p>}
        </form>
      </footer>
    </div>
  );
}

export default Catalogo;