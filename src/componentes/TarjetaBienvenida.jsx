function TarjetaBienvenida({ titulo, descripcion, irACatalogo }) {
  return (
    <div className="welcome-card">
      <h1>{titulo}</h1>
      <p className="welcome-description">{descripcion}</p>
      <div className="welcome-actions">
        <button type="button" onClick={irACatalogo}>
          Ir a Bodega
        </button>
      </div>
    </div>
  );
}

export default TarjetaBienvenida;
