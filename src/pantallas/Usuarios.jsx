import { useEffect, useState } from "react";
import axiosClient from "../services/axiosClient.js";

function obtenerListaUsuarios(datos) {
  if (Array.isArray(datos)) {
    return datos;
  }

  const lista = datos?.data ?? datos?.usuarios ?? datos?.content;
  return Array.isArray(lista) ? lista : null;
}

function Usuarios({ volverAHome }) {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controlador = new AbortController();

    async function cargarUsuarios() {
      try {
        const respuesta = await axiosClient.get("/usuarios", {
          signal: controlador.signal,
        });
        const lista = obtenerListaUsuarios(respuesta.data);

        if (!lista) {
          throw new Error("La respuesta del servidor no contiene una lista de usuarios.");
        }

        setUsuarios(lista);
      } catch (errorPeticion) {
        if (errorPeticion.code === "ERR_CANCELED") {
          return;
        }

        const mensajeApi = errorPeticion.response?.data?.message;
        setError(
          typeof mensajeApi === "string"
            ? mensajeApi
            : errorPeticion.message || "No se pudieron cargar los usuarios.",
        );
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarUsuarios();

    return () => controlador.abort();
  }, []);

  return (
    <main className="usuarios-page">
      <section className="usuarios-panel" aria-labelledby="usuarios-titulo">
        <h1 id="usuarios-titulo">Usuarios</h1>
        {cargando && <p role="status">Cargando usuarios...</p>}
        {error && <p className="usuarios-error" role="alert">{error}</p>}
        {!cargando && !error && usuarios.length === 0 && (
          <p>No hay usuarios para mostrar.</p>
        )}
        {!cargando && !error && usuarios.length > 0 && (
          <ul className="usuarios-lista">
            {usuarios.map((usuario, indice) => {
              const nombre =
                usuario.nombre ??
                usuario.name ??
                usuario.usuario ??
                usuario.username ??
                "Usuario";
              const identificador =
                usuario.id ?? usuario.email ?? `${nombre}-${indice}`;

              return (
                <li key={identificador}>
                  <strong>{nombre}</strong>
                  {usuario.email && <span>{usuario.email}</span>}
                </li>
              );
            })}
          </ul>
        )}
        <button type="button" onClick={volverAHome}>
          Volver al inicio
        </button>
      </section>
    </main>
  );
}

export default Usuarios;
