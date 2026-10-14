function AccesoCheckout({ productos, irALogin, irACrearCuenta, volverAlCarrito }) {
  const total = productos.reduce(
    (acumulado, producto) => acumulado + producto.precio * producto.cantidad,
    0,
  );

  return (
    <main className="auth-page checkout-access-page">
      <section className="auth-panel checkout-access-panel">
        <p className="checkout-access-etiqueta">Un paso más para finalizar</p>
        <h1>Continúa con tu compra</h1>
        <p className="checkout-access-description">
          Inicia sesión o crea una cuenta para continuar al pago.
        </p>
        <div className="checkout-access-total">
          <span>Total de tu pedido</span>
          <strong>S/ {total.toFixed(2)}</strong>
        </div>
        <div className="checkout-access-actions">
          <button type="button" onClick={irALogin}>
            Iniciar Sesión
          </button>
          <button type="button" className="auth-secondary-button" onClick={irACrearCuenta}>
            Crea tu cuenta
          </button>
        </div>
        <button
          type="button"
          className="checkout-access-back"
          onClick={volverAlCarrito}
        >
          Volver al carrito
        </button>
      </section>
    </main>
  );
}

export default AccesoCheckout;
