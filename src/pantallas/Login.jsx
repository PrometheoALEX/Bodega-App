import { useState } from "react";

function Login({ irAMetodoPago, irACrearCuenta, volverAlCheckout, onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario.trim() || !password.trim()) {
      setMensajeError("Completa el usuario y la contraseña para continuar");
      return;
    }

    setMensajeError("");
    setCargando(true);

    try {
      const respuesta = await onLogin({ usuario, password });
      
      // Aseguramos guardar el token si viene en la respuesta o si onLogin lo maneja
      if (respuesta?.token) {
        localStorage.setItem("token", respuesta.token);
      }

      if (respuesta?.success || respuesta?.token) {
        irAMetodoPago();
      }
    } catch (error) {
      setMensajeError(error.message || "No se pudo iniciar sesión.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-page login-page">
      <div className="auth-panel">
        <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80" noValidate>
        {mensajeError && <p role="alert">{mensajeError}</p>}
        <div>
          <label className="block text-sm font-medium">Usuario:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => {
              setUsuario(e.target.value);
              setMensajeError("");
            }}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Contraseña:</label>
          <div className="password-field">
            <input
            type={mostrarPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setMensajeError("");
            }}
            className="w-full border p-2 rounded"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setMostrarPassword((visible) => !visible)}
              aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {mostrarPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-2"
          disabled={cargando}
        >
          {cargando ? "Ingresando..." : "Ingresar"}
        </button>
        </form>

        <button
          type="button"
          className="checkout-access-back"
          onClick={volverAlCheckout}
        >
          Volver a opciones
        </button>

        <p>
          ¿Aún no tienes cuenta?{" "}
          <button type="button" onClick={irACrearCuenta}>
            Crear una cuenta
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;