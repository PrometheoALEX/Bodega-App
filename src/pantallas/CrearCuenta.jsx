import { useState } from "react";

function CrearCuenta({ irAMetodoPago, irALogin, volverAlCheckout, onRegister }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dni, setDni] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);

async function manejarEnvio(e) {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !dni.trim() || !phone.trim() || !email.trim() || !password.trim()) {
      setMensajeError("Por favor completa todos los campos obligatorios.");
      return;
    }

    if (!/^\d{8}$/.test(dni.trim())) {
      setMensajeError("El DNI debe tener exactamente 8 dígitos.");
      return;
    }

    setMensajeError("");
    setCargando(true);

    try {
      const datosAEnviar = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        dni: dni.trim(),
        phone: phone.trim(),
        email: email.trim(),
        password,
      };

      const respuesta = await onRegister(datosAEnviar);

      if (respuesta?.success) {
        irAMetodoPago();
      } else {
        throw new Error(respuesta?.message || "No se pudo crear la cuenta.");
      }
    } catch (error) {
      setMensajeError(error.message || "No se pudo crear la cuenta.");
    } finally {
      setCargando(false);
    }
  }




  return (
    <div className="auth-page register-page">
      <div 
        className="auth-panel auth-panel-register" 
        style={{ 
          padding: '20px 30px',
          boxSizing: 'border-box' 
        }}
      >
        <h2 style={{ marginBottom: '10px', fontSize: '22px', textAlign: 'center' }}>Crea tu Cuenta</h2>
        <form onSubmit={manejarEnvio} noValidate>
          {mensajeError && (
            <p role="alert" style={{ color: '#ef4444', fontSize: '13px', marginBottom: '6px', fontWeight: '500', textAlign: 'center' }}>
              {mensajeError}
            </p>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', marginBottom: '2px', display: 'block' }} htmlFor="firstName">Nombres</label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => { setFirstName(e.target.value); setMensajeError(""); }}
                style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', marginBottom: '2px', display: 'block' }} htmlFor="lastName">Apellidos</label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => { setLastName(e.target.value); setMensajeError(""); }}
                style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '6px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', marginBottom: '2px', display: 'block' }} htmlFor="dni">DNI</label>
              <input
                id="dni"
                type="text"
                maxLength="8"
                value={dni}
                onChange={(e) => { setDni(e.target.value); setMensajeError(""); }}
                style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', marginBottom: '2px', display: 'block' }} htmlFor="phone">Teléfono</label>
              <input
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setMensajeError(""); }}
                style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <label style={{ fontSize: '13px', fontWeight: '600', marginTop: '6px', marginBottom: '2px', display: 'block' }} htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setMensajeError(""); }}
            style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box' }}
          />

          <label style={{ fontSize: '13px', fontWeight: '600', marginTop: '6px', marginBottom: '2px', display: 'block' }} htmlFor="password">Contraseña</label>
          <div className="password-field" style={{ position: 'relative' }}>
            <input
              id="password"
              type={mostrarPassword ? "text" : "password"}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setMensajeError(""); }}
              style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box' }}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setMostrarPassword((visible) => !visible)}
              aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: '#0f766e' }}
            >
              {mostrarPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          {/* Botones principales uno al lado del otro más compactos */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '12px' }}>
            <button type="submit" disabled={cargando} style={{ padding: '10px', fontSize: '14px', fontWeight: '600', width: '100%' }}>
              {cargando ? "Registrando..." : "Registrarse"}
            </button>

            <button
              type="button"
              className="auth-secondary-button"
              onClick={irALogin}
              style={{ padding: '10px', fontSize: '13px', fontWeight: '600', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}
            >
              Ingresa con tu cuenta
            </button>
          </div>

          {/* Enlace inferior de volver */}
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <button
              type="button"
              className="checkout-access-back"
              onClick={volverAlCheckout}
              style={{ padding: '4px', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer', color: '#475569', textDecoration: 'underline' }}
            >
              Volver a opciones
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CrearCuenta;