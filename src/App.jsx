import { useState } from "react";
import Login from "./pantallas/Login.jsx";
import Catalogo from "./pantallas/Catalogo.jsx";
import CrearCuenta from "./pantallas/CrearCuenta.jsx";
import Home from "./pantallas/Home.jsx";
import Carrito from "./pantallas/Carrito.jsx";
import MetodoPago from "./pantallas/MetodoPago.jsx";
import AccesoCheckout from "./pantallas/AccesoCheckout.jsx";
import Usuarios from "./pantallas/Usuarios.jsx";
import axiosClient from "./services/axiosClient";
import "./App.css";

function App() {
  const [pantallaActual, setPantallaActual] = useState("home");
  const [carrito, setCarrito] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState("Invitado");

  async function manejarLogin({ usuario, password }) {
    try {
      // Petición real conectada a tu backend de Spring Boot
      const response = await axiosClient.post('/auth/login', {
        username: usuario, // o email según tu DTO
        password: password
      });

      // Guardamos el token JWT para que el interceptor lo inyecte automáticamente
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      // Seteamos el nombre del usuario (ajusta según lo que devuelva tu backend)
      const nombreUsuario = response.data.nombre || response.data.username || usuario;
      setUsuarioActual(nombreUsuario);

      return { success: true, data: response.data };
    } catch (error) {
      const mensaje = error.response?.data?.message || "Credenciales incorrectas";
      throw new Error(mensaje);
    }
  }

  async function manejarRegistro(datosUsuario) {
  try {
    // La ruta correcta es '/users' y enviamos todos los campos del DTO
    const response = await axiosClient.post('/users', {
      firstName: datosUsuario.firstName,
      lastName: datosUsuario.lastName,
      dni: datosUsuario.dni,
      phone: datosUsuario.phone,
      email: datosUsuario.email,
      password: datosUsuario.password
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    setUsuarioActual(datosUsuario.firstName);
    return { success: true, data: response.data };
  } catch (error) {
    const mensaje = error.response?.data?.message || "No se pudo registrar la cuenta";
    throw new Error(mensaje);
  }
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

  return (
    <div>
      {pantallaActual === "login" && (
        <Login
          irAMetodoPago={() => setPantallaActual("metodoPago")}
          irACrearCuenta={() => setPantallaActual("crearCuenta")}
          volverAlCheckout={() => setPantallaActual("accesoCheckout")}
          onLogin={manejarLogin}
        />
      )}

      {pantallaActual === "crearCuenta" && (
        <CrearCuenta
          irALogin={() => setPantallaActual("login")}
          irAMetodoPago={() => setPantallaActual("metodoPago")}
          volverAlCheckout={() => setPantallaActual("accesoCheckout")}
          onRegister={manejarRegistro}
        />
      )}

      {pantallaActual === "home" && (
        <Home
          irACatalogo={() => setPantallaActual("catalogo")}
          irAUsuarios={() => setPantallaActual("usuarios")}
          irALogin={() => setPantallaActual("login")}            
          irACrearCuenta={() => setPantallaActual("crearCuenta")}
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
          irALogin={() => setPantallaActual("login")}
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