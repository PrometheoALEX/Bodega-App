import { useEffect, useState } from 'react';
import Saludo from '../componentes/Saludo';
import TarjetaBienvenida from '../componentes/TarjetaBienvenida';

const diapositivas = [
  {
    imagen: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=1400&q=90',
    descripcion: 'Laptop gamer de alto rendimiento',
    titulo: 'Un mundo de posibilidades',
  },
  {
    imagen: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=90',
    descripcion: 'Setup gamer con iluminación y equipo de alto rendimiento',
    titulo: 'Entra en modo rendimiento',
  },
  {
    imagen: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=90',
    descripcion: 'Detalle de componentes electrónicos y tecnología',
    titulo: 'Tecnología en cada detalle',
  },
  {
    imagen: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1400&q=90',
    descripcion: 'Tarjeta gráfica y componentes de alto rendimiento',
    titulo: 'Potencia para tus ideas',
  },
  {
    imagen: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1400&q=90',
    descripcion: 'Laptop lista para acompañar nuevos proyectos',
    titulo: 'Listo para lo que sigue',
  },
];

function Home({ irACatalogo, irALogin, usuarioActual }) {
  const [diapositivaActual, setDiapositivaActual] = useState(0);

  useEffect(() => {
    const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (reducirMovimiento.matches) {
      return undefined;
    }

    const intervalo = window.setInterval(() => {
      setDiapositivaActual((actual) => (actual + 1) % diapositivas.length);
    }, 3000);

    return () => window.clearInterval(intervalo);
  }, []);

  const diapositiva = diapositivas[diapositivaActual];

  return (
    <main className="home">
      <header className="home-nav">
        <a className="home-brand" href="/" aria-label="Tech Point, inicio">
          <span className="home-brand-mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" fill="none">
              <rect x="5" y="5" width="30" height="30" rx="10" />
              <path d="M14 14h12M20 14v13M14 27h12" />
              <circle cx="29" cy="11" r="2" />
            </svg>
          </span>
          <span className="home-brand-copy">
            <strong>tech point</strong>
            <small>TECNOLOGÍA PARA TI</small>
          </span>
        </a>

        <p className="home-nav-note">
          <span aria-hidden="true" />
          Tecnología que te mueve
        </p>

        <button
          className="home-account"
          type="button"
          onClick={irALogin}
        >
          Mi cuenta
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10h12m-5-5 5 5-5 5" />
          </svg>
        </button>
      </header>

      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-content">
          <p className="home-eyebrow">
            <span aria-hidden="true" />
            CURADURÍA TECH · NUEVA TEMPORADA
          </p>
          <Saludo usuarioActual={usuarioActual} />
          <TarjetaBienvenida
            titulo="Tecnología que impulsa lo que haces."
            descripcion="Explora laptops, componentes y accesorios elegidos para acompañar todo lo que quieres hacer."
            irACatalogo={irACatalogo}
          />
          <div className="home-reassurance">
            <span className="home-reassurance-icon" aria-hidden="true">✓</span>
            <span>Encuentra tu próximo upgrade, sin complicaciones.</span>
          </div>
        </div>

        <div className="home-visual" aria-label="Espacio de trabajo con laptop y tecnología">
          <div className="home-visual-glow" />
          <div className="home-visual-image">
            <img
              key={diapositiva.imagen}
              src={diapositiva.imagen}
              alt={diapositiva.descripcion}
            />
          </div>
          <div className="home-visual-label">
            <span className="home-visual-label-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M4 16.5 8.5 12l3 3 7-8" />
                <path d="M14 7h4.5v4.5" />
              </svg>
            </span>
            <span>
              <small>ELIGE LO QUE SIGUE</small>
              <strong>{diapositiva.titulo}</strong>
            </span>
          </div>
          <span className="home-visual-index" aria-label={`Imagen ${diapositivaActual + 1} de ${diapositivas.length}`}>
            {String(diapositivaActual + 1).padStart(2, '0')} — {String(diapositivas.length).padStart(2, '0')}
          </span>
        </div>
      </section>

      <footer className="home-footer">
        <span>TODO PARA TU UNIVERSO DIGITAL</span>
        <div aria-label="Categorías de productos">
          <span>Laptops</span>
          <i aria-hidden="true" />
          <span>Componentes</span>
          <i aria-hidden="true" />
          <span>Accesorios</span>
        </div>
      </footer>
    </main>
  );
}

export default Home;