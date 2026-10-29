import { useState } from "react";

const metodosPago = [
  { nombre: "Visa", clase: "logo-visa", logo: "VISA" },
  { nombre: "MasterCard", clase: "logo-mastercard", logo: "MC" },
  { nombre: "American Express", clase: "logo-amex", logo: "AMEX" },
  { nombre: "PayPal", clase: "logo-paypal", logo: "PayPal" },
  { nombre: "Pago por Transferencia", clase: "logo-transferencia", logo: "↔" },
  { nombre: "Yape / Plin", clase: "logo-yape", logo: "Yape / Plin" },
];

const piezasConfeti = Array.from({ length: 42 }, (_, indice) => ({
  id: indice,
  estilo: {
    "--confeti-x": `${(indice * 37) % 100}%`,
    "--confeti-delay": `${(indice % 8) * 0.09}s`,
    "--confeti-duracion": `${2.8 + (indice % 5) * 0.18}s`,
    "--confeti-giro": `${(indice * 73) % 540}deg`,
  },
  forma: indice % 3 === 0 ? "confeti-circulo" : "confeti-tira",
  color: `confeti-color-${indice % 5}`,
}));

function MetodoPago({ total, volverAlCarrito, volverATienda, confirmarCompra }) {
  const [metodoSeleccionado, setMetodoSeleccionado] = useState("");
  const [compraConfirmada, setCompraConfirmada] = useState(false);
  const [totalConfirmado, setTotalConfirmado] = useState(0);

  function completarCompra() {
    if (!metodoSeleccionado || total <= 0) return;

    setTotalConfirmado(total);
    confirmarCompra();
    setCompraConfirmada(true);
  }

  return (
    <main className="metodo-pago">
      {compraConfirmada && (
        <div className="confeti-celebracion" aria-hidden="true">
          <span className="confeti-celebracion-icono">🎉</span>
          {piezasConfeti.map((pieza) => (
            <span
              className={`confeti-pieza ${pieza.forma} ${pieza.color}`}
              key={pieza.id}
              style={pieza.estilo}
            />
          ))}
        </div>
      )}
      <div className="metodo-pago-encabezado">
        <p className="metodo-pago-etiqueta">Compra segura</p>
        <h1>Método de Pago</h1>
        {!compraConfirmada && (
          <p className="metodo-pago-instruccion">
            Selecciona cómo quieres pagar tu compra.
          </p>
        )}
      </div>

      <section className="metodo-pago-panel" aria-live="polite">
        {compraConfirmada ? (
          <div className="metodo-pago-exito">
            <p className="metodo-pago-etiqueta">Pedido confirmado</p>
            <h2>¡Gracias por tu compra!</h2>
            <p>
              Tu pedido de S/ {totalConfirmado.toFixed(2)} se registró con {metodoSeleccionado}.
            </p>
            <button className="metodo-pago-continuar" type="button" onClick={volverATienda}>
              Volver a Tech Point
            </button>
          </div>
        ) : (
          <>
            <div className="metodo-pago-resumen">
              <span>Total a pagar</span>
              <strong>S/ {total.toFixed(2)}</strong>
            </div>
            <h2 id="opciones-pago">Elige una opción</h2>
            <div className="metodos-pago-grid">
              {metodosPago.map((metodo) => (
                <button
                  className={`metodo-pago-opcion ${
                    metodoSeleccionado === metodo.nombre ? "seleccionado" : ""
                  }`}
                  type="button"
                  aria-pressed={metodoSeleccionado === metodo.nombre}
                  onClick={() => setMetodoSeleccionado(metodo.nombre)}
                  key={metodo.nombre}
                >
                  <span className={`metodo-pago-logo ${metodo.clase}`} aria-hidden="true">
                    {metodo.logo}
                  </span>
                  <span>{metodo.nombre}</span>
                </button>
              ))}
            </div>
            {metodoSeleccionado && (
              <p className="metodo-pago-confirmacion" role="status">
                Has seleccionado {metodoSeleccionado}.
              </p>
            )}
            <div className="metodo-pago-acciones">
              <button className="volver-carrito" type="button" onClick={volverAlCarrito}>
                Volver al Carrito
              </button>
              <button className="volver-tienda" type="button" onClick={volverATienda}>
                Volver a Tech Point
              </button>
              <button
                className="metodo-pago-continuar"
                type="button"
                onClick={completarCompra}
                disabled={!metodoSeleccionado || total <= 0}
              >
                Confirmar pedido
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default MetodoPago;