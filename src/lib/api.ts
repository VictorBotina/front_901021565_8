import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

const fetchFromStrapi = async (endpoint: string) => {
  // Asegurarse de que las variables de entorno están disponibles
  if (!API_URL || !API_TOKEN) {
    console.error("Strapi URL or Token is not configured in environment variables.");
    // Devolver un array vacío para evitar que la aplicación crashee en producción
    return [];
  }

  try {
    const res = await axios.get(`${API_URL}/api/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    // La respuesta de Strapi v4 envuelve los datos en un objeto "data"
    return res.data.data;
  } catch (error) {
    console.error(`Error fetching from Strapi endpoint: /${endpoint}`, error);
    // Devolver un array vacío en caso de error para que el build no falle
    return [];
  }
};

export { fetchFromStrapi };
