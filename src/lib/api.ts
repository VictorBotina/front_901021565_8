import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

if (!API_URL || !API_TOKEN) {
  throw new Error("Las variables de entorno de Strapi no están configuradas.");
}

export const fetchFromStrapi = async (endpoint: string) => {
  try {
    const res = await axios.get(`${API_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("Error al obtener datos de Strapi:", error);
    return [];
  }
};
