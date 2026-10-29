import { useState } from "react";

function CrearCuenta({ irAMetodoPago, irALogin, volver, textoVolver, onRegister }) {
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [cargando, setCargando] = useState(false);

  async function manejarEnvio(e) {
    e.preventDefault();

    if (!nombre.trim() || !usuario.trim() || !contrasena.trim()) {
      setMensajeError("Completa todos los campos para continuar");
      return;
    }

    setMensajeError("");
    setCargando(true);

    try {
      const respuesta = await onRegister({ nombre, usuario, password: contrasena });
      if (respuesta?.success) {
        irAMetodoPago();
      }
    } catch (error) {
      setMensajeError(error.message || "No se pudo crear la cuenta.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="auth-page register-page">
      <div className="auth-panel auth-panel-register">
        <h2>Crea tu Cuenta</h2>
        <form
          onSubmit={manejarEnvio}
          noValidate
        >
        {mensajeError && <p role="alert">{mensajeError}</p>}

        <label htmlFor="nombre">Nombre completo</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => {
            setNombre(e.target.value);
            setMensajeError("");
          }}
        />

        <label htmlFor="usuario">Usuario</label>
        <input
          id="usuario"
          type="text"
          value={usuario}
          onChange={(e) => {
            setUsuario(e.target.value);
            setMensajeError("");
          }}
        />

        <label htmlFor="contrasena">Contraseña</label>
        <div className="password-field">
          <input
            id="contrasena"
            type={mostrarContrasena ? "text" : "password"}
            value={contrasena}
            onChange={(e) => {
              setContrasena(e.target.value);
              setMensajeError("");
            }}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setMostrarContrasena((visible) => !visible)}
            aria-label={mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {mostrarContrasena ? "Ocultar" : "Mostrar"}
          </button>
        </div>

        <button type="submit" disabled={cargando}>
          {cargando ? "Creando cuenta..." : "Registrarse"}
        </button>
        </form>

        <button
          type="button"
          className="auth-secondary-button"
          onClick={irALogin}
        >
          Ingresa con tu cuenta
        </button>
        <button
          type="button"
          className="checkout-access-back"
          onClick={volver}
        >
          {textoVolver}
        </button>
      </div>

    </div>
  );
}

export default CrearCuenta;