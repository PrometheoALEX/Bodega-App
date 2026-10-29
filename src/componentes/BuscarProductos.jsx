import { useState } from 'react';

function BuscarProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);

  function buscarProductos() {
    setCargando(true);

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setProductos(datos);
        setCargando(false);
      })
      .catch(() => {
        setProductos([]);
        setCargando(false);
      });
  }

  return (
    <div>
      <button onClick={buscarProductos}>Buscar productos</button>

      {cargando && <p>Cargando...</p>}
      {!cargando && productos.length === 0 && <p>No hay resultados.</p>}

      {productos.map((producto) => (
        <div key={producto.id}>
          <h3>{producto.title}</h3>
          <p>{producto.body}</p>
        </div>
      ))}
    </div>
  );
}

export default BuscarProductos;
