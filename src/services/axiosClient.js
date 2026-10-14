import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://tienda-gady.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});


axiosClient.interceptors.request.use(
    (config) => {
        // Asegúrate de que 'token' coincida con la key que usas al guardarlo tras hacer login
        const token = localStorage.getItem('token'); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default axiosClient;
