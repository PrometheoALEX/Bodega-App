import { useState } from 'react';

function DetalleProducto({ descripcion = 'Descripción no disponible.' }) {
  const [mostrar, setMostrar] = useState(false);

  return (
    <div>
      <button onClick={() => setMostrar(!mostrar)}>
        {mostrar ? 'Ver menos' : 'Ver más'}
      </button>
      {mostrar && <p>{descripcion}</p>}
    </div>
  );
}

export default DetalleProducto;
