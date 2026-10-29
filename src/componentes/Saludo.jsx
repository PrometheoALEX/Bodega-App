
// Componente Saludo
function Saludo({ usuarioActual = 'Invitado' }) {
  return (
    <h2 className="home-greeting">¡Hola, {usuarioActual}!</h2>
  );
}

export default Saludo;