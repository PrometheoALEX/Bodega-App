
// Componente Saludo
function Saludo({ usuarioActual = 'Invitado' }) {
  return (
    <h2>¡Hola, {usuarioActual}!</h2>
  );
}

export default Saludo;