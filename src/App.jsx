import { useState } from "react";
import Login from "./pantallas/Login.jsx";
import Catalogo from "./pantallas/Catalogo.jsx";
import CrearCuenta from "./pantallas/CrearCuenta.jsx";
import Home from "./pantallas/Home.jsx";
import Carrito from "./pantallas/Carrito.jsx";
import MetodoPago from "./pantallas/MetodoPago.jsx";
import AccesoCheckout from "./pantallas/AccesoCheckout.jsx";
import Usuarios from "./pantallas/Usuarios.jsx";
import { loginUsuario, registrarUsuario } from "./services/mockApi.js";
import "./App.css";

function App() {
  const [pantallaActual, setPantallaActual] = useState("home");
  const [destinoAuth, setDestinoAuth] = useState("home");
  const [carrito, setCarrito] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState("Invitado");

  function abrirLogin(destino = "home") {
    setDestinoAuth(destino);
    setPantallaActual("login");
  }

  async function manejarLogin({ usuario, password }) {
    const respuesta = await loginUsuario({ usuario, password });

    if (!respuesta.success) {
      throw new Error(respuesta.message);
    }

    setUsuarioActual(respuesta.data.usuario.nombre);
    return respuesta;
  }

  async function manejarRegistro(datosUsuario) {
    const respuesta = await registrarUsuario(datosUsuario);

    if (!respuesta.success) {
      throw new Error(respuesta.message);
    }

    const usuarioRegistrado = respuesta.data.usuario;
    const nombreUsuario = [
      usuarioRegistrado.firstName,
      usuarioRegistrado.lastName,
    ].filter(Boolean).join(" ") || usuarioRegistrado.nombre || datosUsuario.email;

    setUsuarioActual(nombreUsuario);
    return respuesta;
  }

  function aumentarCantidad(producto) {
    setCarrito((productosActuales) => {
      const productoExistente = productosActuales.find(
        (productoEnCarrito) => productoEnCarrito.id === producto.id,
      );

      if (!productoExistente) {
        return [...productosActuales, { ...producto, cantidad: 1 }];
      }

      return productosActuales.map((productoEnCarrito) =>
        productoEnCarrito.id === producto.id
          ? { ...productoEnCarrito, cantidad: productoEnCarrito.cantidad + 1 }
          : productoEnCarrito,
      );
    });
  }

  function disminuirCantidad(producto) {
    setCarrito((productosActuales) =>
      productosActuales
        .map((productoEnCarrito) =>
          productoEnCarrito.id === producto.id
            ? { ...productoEnCarrito, cantidad: productoEnCarrito.cantidad - 1 }
            : productoEnCarrito,
        )
        .filter((productoEnCarrito) => productoEnCarrito.cantidad > 0),
    );
  }

  function quitarProducto(productoId) {
    setCarrito((productosActuales) =>
      productosActuales.filter((producto) => producto.id !== productoId),
    );
  }

  function continuarAlCheckout() {
    setPantallaActual(
      usuarioActual === "Invitado" ? "accesoCheckout" : "metodoPago",
    );
  }

  function continuarTrasAutenticacion() {
    setPantallaActual(carrito.length > 0 ? "metodoPago" : "catalogo");
  }

  function moverBotonConCursor(event) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!(event.target instanceof Element)) return;

    const boton = event.target.closest("button");
    if (!boton) return;

    const bounds = boton.getBoundingClientRect();
    const x = Math.max(-8, Math.min(8, (event.clientX - bounds.left - bounds.width / 2) * 0.12));
    const y = Math.max(-8, Math.min(8, (event.clientY - bounds.top - bounds.height / 2) * 0.12));
    boton.style.setProperty("--magnetic-x", `${x}px`);
    boton.style.setProperty("--magnetic-y", `${y}px`);
    boton.style.setProperty(
      "--glow-x",
      `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
    );
    boton.style.setProperty(
      "--glow-y",
      `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
    );
  }

  function restablecerBotonConCursor(event) {
    if (!(event.target instanceof Element)) return;

    const boton = event.target.closest("button");
    if (boton && !boton.contains(event.relatedTarget)) {
      boton.style.removeProperty("--magnetic-x");
      boton.style.removeProperty("--magnetic-y");
      boton.style.removeProperty("--glow-x");
      boton.style.removeProperty("--glow-y");
    }
  }

  return (
    <div onPointerMove={moverBotonConCursor} onPointerOut={restablecerBotonConCursor}>
      {pantallaActual === "login" && (
        <Login
          irAMetodoPago={continuarTrasAutenticacion}
          irACrearCuenta={() => setPantallaActual("crearCuenta")}
          volver={() => setPantallaActual(destinoAuth)}
          textoVolver={destinoAuth === "home" ? "Volver a Home" : "Volver a opciones"}
          onLogin={manejarLogin}
        />
      )}

      {pantallaActual === "crearCuenta" && (
        <CrearCuenta
          irALogin={() => setPantallaActual("login")}
          irAMetodoPago={continuarTrasAutenticacion}
          volver={() => setPantallaActual(destinoAuth)}
          textoVolver={destinoAuth === "home" ? "Volver a Home" : "Volver a opciones"}
          onRegister={manejarRegistro}
        />
      )}

      {pantallaActual === "home" && (
        <Home
          irACatalogo={() => setPantallaActual("catalogo")}
          irALogin={() => abrirLogin("home")}
          usuarioActual={usuarioActual}
        />
      )}

      {pantallaActual === "usuarios" && (
        <Usuarios volverAHome={() => setPantallaActual("home")} />
      )}

      {pantallaActual === "catalogo" && (
        <Catalogo
          volverAHome={() => setPantallaActual("home")}
          irACarrito={() => setPantallaActual("carrito")}
          aumentarCantidad={aumentarCantidad}
          disminuirCantidad={disminuirCantidad}
          carrito={carrito}
          usuarioActual={usuarioActual}
        />
      )}

      {pantallaActual === "carrito" && (
        <Carrito
          productos={carrito}
          volverATienda={() => setPantallaActual("catalogo")}
          irAMetodoPago={continuarAlCheckout}
          aumentarCantidad={aumentarCantidad}
          disminuirCantidad={disminuirCantidad}
          quitarProducto={quitarProducto}
        />
      )}

      {pantallaActual === "accesoCheckout" && (
        <AccesoCheckout
          productos={carrito}
          irALogin={() => abrirLogin("accesoCheckout")}
          irACrearCuenta={() => setPantallaActual("crearCuenta")}
          volverAlCarrito={() => setPantallaActual("carrito")}
        />
      )}

      {pantallaActual === "metodoPago" && (
        <MetodoPago
          total={carrito.reduce(
            (acumulado, producto) =>
              acumulado + producto.precio * producto.cantidad,
            0,
          )}
          volverAlCarrito={() => setPantallaActual("carrito")}
          volverATienda={() => setPantallaActual("catalogo")}
          confirmarCompra={() => setCarrito([])}
        />
      )}
    </div>
  );
}

export default App;