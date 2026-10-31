import { useEffect, useState } from 'react';
import { obtenerProductos, obtenerCategorias } from '../services/mockApi.js';

const categoriaTodos = { id: null, name: 'Todos los productos' };

function normalizarCategoria(categoria, indice) {
  if (typeof categoria === 'string') {
    return { id: categoria, name: categoria };
  }

  const id = String(categoria.id ?? categoria.categoryId ?? '');
  const nombresCorregidosPorId = {
    '6': 'Periféricos',
    '7': 'Refrigeración',
    '8': 'Accesorios',
  };
  const name = nombresCorregidosPorId[id] ?? categoria.name
    ?? categoria.nombre
    ?? categoria.categoryName
    ?? categoria.nombreCategoria
    ?? `Categoría ${indice + 1}`;

  return {
    id: id || name,
    name,
  };
}

function normalizarProducto(producto, categorias) {
  const name = producto.name ?? producto.nombre ?? '';
  const price = Number(producto.price ?? producto.precio);
  const image = producto.image ?? producto.imagen ?? '';
  const categoryValue = producto.category ?? producto.categoria ?? '';
  const categoryObject = typeof categoryValue === 'object' && categoryValue !== null
    ? categoryValue
    : null;
  const rawCategoryId = producto.categoryId
    ?? producto.category_id
    ?? categoryObject?.id
    ?? (typeof categoryValue === 'number' ? categoryValue : null);
  const rawCategoryName = categoryObject?.name
    ?? categoryObject?.nombre
    ?? categoryObject?.categoryName
    ?? (typeof categoryValue === 'string' ? categoryValue : null);
  const categoriaRelacionada = categorias.find((categoria) =>
    (rawCategoryId !== null && categoria.id === String(rawCategoryId)) ||
    (rawCategoryName !== null && categoria.name === rawCategoryName),
  );
  const category = categoriaRelacionada?.name
    ?? rawCategoryName
    ?? (rawCategoryId !== null ? `Categoría ${rawCategoryId}` : '');
  const categoryId = categoriaRelacionada?.id
    ?? (rawCategoryId !== null ? String(rawCategoryId) : category || null);
  const description = producto.description ?? producto.descripcion ?? '';

  return {
    ...producto,
    categoryId,
    name,
    price,
    image,
    category,
    description,
    // El carrito aún consume estos nombres; se mantienen mientras se migra esa pantalla.
    nombre: name,
    precio: price,
    imagen: image,
    categoria: category,
  };
}

function Catalogo({
  volverAHome,
  irACarrito,
  aumentarCantidad,
  disminuirCantidad,
  carrito,
  usuarioActual,
}) {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([categoriaTodos]);
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [ordenPrecio, setOrdenPrecio] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [emailNewsletter, setEmailNewsletter] = useState("");
  const [mensajeNewsletter, setMensajeNewsletter] = useState("");
  const [cargandoProductos, setCargandoProductos] = useState(true);
  const [errorProductos, setErrorProductos] = useState("");

  useEffect(() => {
    let activo = true;

    async function cargarDatos() {
      try {
        setCargandoProductos(true);
        const [respuestaProductos, respuestaCategorias] = await Promise.all([
          obtenerProductos(),
          obtenerCategorias(),
        ]);

        if (!activo) return;

        if (!respuestaProductos.success) {
          setErrorProductos(respuestaProductos.message || 'No se pudieron cargar los productos.');
          return;
        }

        const categoriasServidor = respuestaCategorias.success
          ? respuestaCategorias.data.map(normalizarCategoria)
          : [];
        const categoriasDisponibles = categoriasServidor.length > 0
          ? categoriasServidor
          : [...new Set(respuestaProductos.data.map((producto) => {
              const categoria = producto.category ?? producto.categoria;
              if (typeof categoria === 'object' && categoria !== null) {
                return categoria.name ?? categoria.nombre ?? categoria.categoryName;
              }
              return categoria ?? producto.categoryId ?? producto.category_id;
            }).filter((categoria) => categoria !== undefined && categoria !== null && categoria !== ''))]
              .map((categoria, indice) => normalizarCategoria(categoria, indice));

        const productosNormalizados = respuestaProductos.data.map((producto) =>
          normalizarProducto(producto, categoriasDisponibles),
        );
        setProductos(productosNormalizados);
        setCategorias([categoriaTodos, ...categoriasDisponibles]);
        setErrorProductos("");
      } catch {
        if (activo) {
          setErrorProductos('Ocurrió un error al cargar los datos.');
        }
      } finally {
        if (activo) {
          setCargandoProductos(false);
        }
      }
    }

    cargarDatos();

    return () => {
      activo = false;
    };
  }, []);

  const minimo = precioMin === "" ? null : Number(precioMin);
  const maximo = precioMax === "" ? null : Number(precioMax);
  const rangoInvalido = minimo !== null && maximo !== null && minimo > maximo;
  const productosDeCategoria = categoriaSeleccionada === null
    ? productos
    : productos.filter((producto) => producto.categoryId === categoriaSeleccionada);
  const productosFiltrados = rangoInvalido
    ? []
    : productosDeCategoria.filter((producto) =>
        (minimo === null || producto.price >= minimo) &&
        (maximo === null || producto.price <= maximo),
      );
  const productosOrdenados = [...productosFiltrados].sort((a, b) =>
    ordenPrecio === "ascendente"
      ? a.price - b.price
      : ordenPrecio === "descendente"
        ? b.price - a.price
        : 0,
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

  function quitarOrdenPrecioAlHacerClicEnVacio(e) {
    if (
      e.target instanceof Element &&
      !e.target.closest('button, input, a, select, textarea, label, form')
    ) {
      setOrdenPrecio("");
    }
  }

  return (
    <div className="catalogo" onClick={quitarOrdenPrecioAlHacerClicEnVacio}>
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
        <h1>techPoint</h1>
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
            {categorias.map((categoria) => {
              const cantidad = categoria.id === null
                ? productos.length
                : productos.filter((producto) => producto.categoryId === categoria.id).length;

              return (
                <button
                  type="button"
                  key={categoria.id ?? 'todos'}
                  className={categoriaSeleccionada === categoria.id ? 'categoria-boton seleccionado' : 'categoria-boton'}
                  onClick={() => setCategoriaSeleccionada(categoria.id)}
                  aria-pressed={categoriaSeleccionada === categoria.id}
                >
                  <span>{categoria.name}</span>
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
            <div className="filtro-orden-precio" role="group" aria-label="Ordenar productos por precio">
              <button
                type="button"
                className={ordenPrecio === "ascendente" ? "orden-precio-boton seleccionado" : "orden-precio-boton"}
                onClick={() => setOrdenPrecio("ascendente")}
                aria-pressed={ordenPrecio === "ascendente"}
              >
                Menor a mayor
              </button>
              <button
                type="button"
                className={ordenPrecio === "descendente" ? "orden-precio-boton seleccionado" : "orden-precio-boton"}
                onClick={() => setOrdenPrecio("descendente")}
                aria-pressed={ordenPrecio === "descendente"}
              >
                Mayor a menor
              </button>
            </div>
          </div>

          <div className="catalogo-resultados">
            <h2>{categorias.find((categoria) => categoria.id === categoriaSeleccionada)?.name ?? categoriaTodos.name}</h2>
            {!cargandoProductos && !errorProductos && (
              <span>{productosFiltrados.length} productos</span>
            )}
          </div>

          {rangoInvalido && (
            <p className="filtro-mensaje" role="alert">
              El precio mínimo no puede ser mayor que el precio máximo.
            </p>
          )}

          {cargandoProductos && <p className="filtro-mensaje">Cargando productos...</p>}
          {!cargandoProductos && errorProductos && <p className="filtro-mensaje">{errorProductos}</p>}

          {!cargandoProductos && !errorProductos && (
            <div className="productos">
              {productosOrdenados.map((prod) => {
                const cantidad = carrito.find((producto) => producto.id === prod.id)?.cantidad || 0;

                return (
                  <div className="producto" key={prod.id}>
                    <img src={prod.image} alt={prod.name} />
                    <p>{prod.category}</p>
                    <h3>{prod.name}</h3>
                    {prod.description && <p>{prod.description}</p>}
                    <p>S/ {prod.price.toFixed(2)}</p>
                    <div className="producto-controles">
                      <button
                        type="button"
                        className="cantidad-boton"
                        onClick={() => disminuirCantidad(prod)}
                        aria-label={`Quitar una unidad de ${prod.name}`}
                      >
                        -
                      </button>
                      <span className="producto-cantidad">{cantidad}</span>
                      <button
                        type="button"
                        className="cantidad-boton"
                        onClick={() => aumentarCantidad(prod)}
                        aria-label={`Agregar una unidad de ${prod.name}`}
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
            <p className="filtro-mensaje">No hay productos que coincidan con los filtros seleccionados.</p>
          )}
        </section>
      </div>

      <footer className="catalogo-footer">
        <div>
          <h2>Recibe nuestras ofertas</h2>
          <p>Suscríbete al newsletter de techPoint.</p>
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