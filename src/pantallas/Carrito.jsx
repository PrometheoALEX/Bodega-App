function Carrito({
  productos,
  volverATienda,
  irAMetodoPago,
  aumentarCantidad,
  disminuirCantidad,
  quitarProducto,
}) {
  const total = productos.reduce(
    (acumulado, producto) => acumulado + producto.precio * producto.cantidad,
    0,
  );

  return (
    <div className="carrito">
      <h1>Carrito de Compra</h1>

      <div className="carrito-contenido">
        {productos.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            <div className="carrito-lista">
              {productos.map((producto) => (
                <div className="carrito-item" key={producto.id}>
                  <img src={producto.imagen} alt={producto.nombre} />
                  <div className="carrito-item-info">
                    <h3>{producto.nombre}</h3>
                    <p>
                      S/ {producto.precio.toFixed(2)} x {producto.cantidad}
                    </p>
                  </div>
                  <div className="carrito-item-controles">
                    <button
                      type="button"
                      onClick={() => disminuirCantidad(producto)}
                      aria-label={`Quitar una unidad de ${producto.nombre}`}
                    >
                      -
                    </button>
                    <span>{producto.cantidad}</span>
                    <button
                      type="button"
                      onClick={() => aumentarCantidad(producto)}
                      aria-label={`Agregar una unidad de ${producto.nombre}`}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="quitar-producto"
                      onClick={() => quitarProducto(producto.id)}
                    >
                      Quitar producto
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p className="carrito-total">Total: S/ {total.toFixed(2)}</p>
          </>
        )}

        <div className="carrito-acciones">
          <button type="button" onClick={volverATienda}>
            Volver a Bodega
          </button>
          <button
            type="button"
            className="boton-comprar"
            onClick={irAMetodoPago}
            disabled={productos.length === 0}
          >
            Comprar Ahora
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carrito;