import lecheGloria from '../assets/lacteos-gloria.png';
import mantequilla from '../assets/lacteos-mantequillas.png';
import aceite from '../assets/aceite-primor.png';
import arroz from '../assets/arroz-costeño.png';
import fideos from '../assets/fideos-tallarin-molitalia.png';
import galletas from '../assets/galleta-soda1.png';
import gaseosaCocacola from '../assets/gaseosa-cocacola.png';
import gaseosaGuarana from '../assets/gaseosa-guarana.png';
import agua from '../assets/agua-sanluis.png';
import menestras from '../assets/menestras-lentejas.png';
import atun from '../assets/atun-compas.png';
import mayonesa from '../assets/mayonesa-alacena.png';
import yogurtGriego from '../assets/yogurt-griego-laive.webp';

const usuarios = [
  {
    id: 1,
    nombre: 'María López',
    usuario: 'maria',
    password: '123456',
  },
];

const productosMock = [
  { id: 1, nombre: 'Sixpack Leche Gloria', categoria: 'Lácteos', precio: 23.7, imagen: lecheGloria },
  { id: 2, nombre: 'Mantequilla', categoria: 'Lácteos', precio: 16.06, imagen: mantequilla },
  { id: 3, nombre: 'Aceite', categoria: 'Abarrotes', precio: 15.5, imagen: aceite },
  { id: 4, nombre: 'Arroz', categoria: 'Abarrotes', precio: 23.9, imagen: arroz },
  { id: 5, nombre: 'Fideos', categoria: 'Abarrotes', precio: 4.5, imagen: fideos },
  { id: 6, nombre: 'Galletas', categoria: 'Snacks', precio: 3.5, imagen: galletas },
  { id: 7, nombre: 'Gaseosa', categoria: 'Bebidas', precio: 10, imagen: gaseosaCocacola },
  { id: 8, nombre: 'Gaseosa', categoria: 'Bebidas', precio: 8, imagen: gaseosaGuarana },
  { id: 9, nombre: 'Agua', categoria: 'Bebidas', precio: 2.5, imagen: agua },
  { id: 10, nombre: 'Menestras', categoria: 'Abarrotes', precio: 6, imagen: menestras },
  { id: 11, nombre: 'Atún', categoria: 'Conservas y salsas', precio: 7.5, imagen: atun },
  { id: 12, nombre: 'Mayonesa', categoria: 'Conservas y salsas', precio: 8.5, imagen: mayonesa },
  { id: 13, nombre: 'Yogurt Griego', categoria: 'Lácteos', precio: 19.9, imagen: yogurtGriego },
  { id: 14, nombre: 'Hamburguesa de Pollo', categoria: 'Congelados', precio: 17.5, imagen: 'https://metroio.vtexassets.com/arquivos/ids/559589-800-auto?v=638690386224130000&width=800&height=auto&aspect=true' },
  { id: 15, nombre: 'Nuggets de Pollo', categoria: 'Congelados', precio: 14.99, imagen: 'https://metroio.vtexassets.com/arquivos/ids/638816-800-auto?v=639102297866470000&width=800&height=auto&aspect=true' },
  { id: 16, nombre: 'Pack 6 Yogurt Gloria', categoria: 'Lácteos', precio: 13.5, imagen: 'https://metroio.vtexassets.com/arquivos/ids/392679/YOGURT-GLORIA-PACK-AGORRO-FRESA-6X180G-1-351633040.jpg?v=638180611425030000' },
  { id: 17, nombre: 'Ajinomen', categoria: 'Abarrotes', precio: 5, imagen: 'https://metroio.vtexassets.com/arquivos/ids/405155-800-auto?v=638181137638930000&width=800&height=auto&aspect=true' },
  { id: 18, nombre: 'De Todito', categoria: 'Snacks', precio: 8.5, imagen: 'https://metroio.vtexassets.com/arquivos/ids/532508/Piqueo-Snack-De-Todito-Original-50g-1-262297.jpg?v=638539944207000000' },
  { id: 19, nombre: 'Helado Sublime', categoria: 'Congelados', precio: 18, imagen: 'https://metroio.vtexassets.com/arquivos/ids/351011-800-auto?v=638180578977300000&width=800&height=auto&aspect=true' },
  { id: 20, nombre: 'Pack Jamón - Queso', categoria: 'Refrigerados', precio: 7.9, imagen: 'https://wongfood.vteximg.com.br/arquivos/ids/594458-1000-1000/908062-1.jpg?v=638031806989070000' },
];

const esperar = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export async function obtenerProductos() {
  await esperar();
  return {
    success: true,
    data: productosMock,
  };
}

export async function loginUsuario({ usuario, password }) {
  await esperar();
  const usuarioEncontrado = usuarios.find(
    (item) => item.usuario === usuario && item.password === password,
  );

  if (!usuarioEncontrado) {
    return {
      success: false,
      message: 'Usuario o contraseña incorrectos.',
    };
  }

  return {
    success: true,
    data: {
      token: 'mock-token-123',
      usuario: {
        id: usuarioEncontrado.id,
        nombre: usuarioEncontrado.nombre,
        usuario: usuarioEncontrado.usuario,
      },
    },
  };
}

export async function registrarUsuario({ nombre, usuario, password }) {
  await esperar();

  if (!nombre.trim() || !usuario.trim() || !password.trim()) {
    return {
      success: false,
      message: 'Completa todos los campos para continuar.',
    };
  }

  const yaExiste = usuarios.some((item) => item.usuario === usuario);

  if (yaExiste) {
    return {
      success: false,
      message: 'Ese usuario ya existe. Prueba otro nombre de usuario.',
    };
  }

  const nuevoUsuario = {
    id: Date.now(),
    nombre: nombre.trim(),
    usuario: usuario.trim(),
    password: password.trim(),
  };

  usuarios.push(nuevoUsuario);

  return {
    success: true,
    data: {
      token: `mock-token-${nuevoUsuario.id}`,
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        usuario: nuevoUsuario.usuario,
      },
    },
  };
}
