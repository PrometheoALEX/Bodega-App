import axiosClient from './axiosClient';

function extraerLista(data, claves) {
  if (Array.isArray(data)) return data;
  if (!data || typeof data !== 'object') return null;

  for (const clave of claves) {
    if (Array.isArray(data[clave])) return data[clave];
  }

  if (Array.isArray(data.content)) return data.content;
  if (Array.isArray(data.data)) return data.data;

  if (data._embedded && typeof data._embedded === 'object') {
    const listaAnidada = Object.values(data._embedded).find(Array.isArray);
    if (listaAnidada) return listaAnidada;
  }

  return null;
}

export async function obtenerProductos() {
  try {
    const response = await axiosClient.get('/products');
    const productos = extraerLista(response.data, ['products', 'productos']);

    if (!productos) {
      return {
        success: false,
        data: [],
        message: 'El servidor no devolvió una lista válida de productos.',
      };
    }

    return {
      success: true,
      data: productos,
    };
  } catch (error) {
    console.error("Error al obtener productos del backend:", error);
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || 'No se pudieron cargar los productos del servidor.',
    };
  }
}

export async function obtenerCategorias() {
  try {
    const response = await axiosClient.get('/categories');
    const categorias = extraerLista(response.data, ['categories', 'categorias']);

    if (!categorias) {
      return {
        success: false,
        data: [],
        message: 'El servidor no devolvió una lista válida de categorías.',
      };
    }

    return {
      success: true,
      data: categorias,
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

    const userData = response.data?.user || response.data?.usuario || response.data;

    return {
      success: true,
      data: {
        token: response.data.token || 'mock-token-123',
        usuario: {
          id: userData.id,
          nombre: userData.firstName || userData.nombre || 'Usuario',
          apellido: userData.lastName || userData.apellido || '',
          usuario: userData.email || userData.username || usuario,
        },
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Usuario o contraseña incorrectos.',
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