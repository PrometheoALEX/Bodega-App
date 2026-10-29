function TarjetaBienvenida({ titulo, descripcion, irACatalogo }) {
  function actualizarBrillo(event) {
    if (event.pointerType !== 'mouse') return;

    const limites = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - limites.left) / limites.width) * 100;
    const y = ((event.clientY - limites.top) / limites.height) * 100;
    event.currentTarget.style.setProperty('--glow-x', `${x}%`);
    event.currentTarget.style.setProperty('--glow-y', `${y}%`);
  }

  function reiniciarBrillo(event) {
    event.currentTarget.style.removeProperty('--glow-x');
    event.currentTarget.style.removeProperty('--glow-y');
  }

  return (
    <div className="welcome-card">
      <h1 id="home-title">{titulo}</h1>
      <p className="welcome-description">{descripcion}</p>
      <div className="welcome-actions">
        <button
          className="home-explore-button"
          type="button"
          onClick={irACatalogo}
          onPointerMove={actualizarBrillo}
          onPointerLeave={reiniciarBrillo}
        >
          Explorar productos
        </button>
      </div>
    </div>
  );
}

export default TarjetaBienvenida;
