import Saludo from '../componentes/Saludo';
import TarjetaBienvenida from '../componentes/TarjetaBienvenida';

function Home({ irACatalogo, irAUsuarios, irALogin, irACrearCuenta, usuarioActual }) {
  return (
    <div className="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Barra superior profesional para acceso rápido */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '20px 30px', width: '100%', boxSizing: 'border-box' }}>
        <button
          type="button"
          onClick={irALogin}
          style={{
            backgroundColor: '#0f766e',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'background 0.2s'
          }}
        >
          Iniciar Sesión
        </button>
        <button
          type="button"
          onClick={irACrearCuenta}
          style={{
            backgroundColor: 'white',
            color: '#0f766e',
            border: '2px solid #0f766e',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'background 0.2s'
          }}
        >
          Crear Cuenta
        </button>
      </div>

      {/* Contenido principal centrado */}
      <div className="home-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: '50px' }}>
        <Saludo usuarioActual={usuarioActual} />
        <TarjetaBienvenida
          titulo='Bienvenido a la Bodega "Selecta Xpress"'
          descripcion="Explora nuestros productos y encuentra todo lo que necesitas."
          irACatalogo={irACatalogo}
        />
        <button 
          type="button" 
          onClick={irAUsuarios}
          style={{ marginTop: '15px', background: 'transparent', border: 'none', color: '#334155', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Ver usuarios
        </button>
      </div>
    </div>
  );
}

export default Home;