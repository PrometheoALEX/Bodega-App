import axiosClient from './axiosClient';

const usuarios = [
  {
    id: 1,
    nombre: 'María López',
    usuario: 'maria',
    password: '123456',
  },
];



export async function obtenerProductos() {
  try {
    const response = await axiosClient.get('/products');
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error al obtener productos del backend:", error);
    return {
      success: true,
      data: productosMock,
    };
  }
}

export async function obtenerCategorias() {
  try {
    const response = await axiosClient.get('/categories');
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error al obtener categorías del backend:", error);
    return {
      success: false,
      data: [],
    };
  }
}

export async function loginUsuario({ usuario, password }) {
  try {
    const response = await axiosClient.post('/auth/login', {
      username: usuario,
      password: password,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const usuarioEncontrado = usuarios.find(
      (item) => item.usuario === usuario && item.password === password,
    );

    if (!usuarioEncontrado) {
      return {
        success: false,
        message: error.response?.data?.message || 'Usuario o contraseña incorrectos.',
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
}


export async function registrarUsuario(formData) {
  try {
    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      dni: formData.dni.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      password: formData.password,
    };

    const response = await axiosClient.post('/users', payload);
    const responseData = response.data ?? {};
    const usuario = responseData.usuario ?? responseData.user ?? responseData;

    return {
      success: true,
      data: {
        ...responseData,
        usuario,
      },
    };
  } catch (error) {
    const respuestaError = error.response?.data;
    const backendErrors = respuestaError?.errors;
    const errorMensaje = Array.isArray(backendErrors)
      ? backendErrors.join(', ')
      : backendErrors && typeof backendErrors === 'object'
        ? Object.values(backendErrors).join(', ')
        : respuestaError?.message ||
          respuestaError?.error ||
          (error.response
            ? 'El servidor rechazó el registro. Verifica los datos ingresados.'
            : 'No se pudo conectar con el servidor. Verifica que el backend esté activo.');

    throw new Error(errorMensaje, { cause: error });
  }
}