import axios from 'axios';
import { stringify } from 'qs';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

// Helper para construir la URL completa si es relativa
export const getStrapiURL = (path = "") => {
  if (!path) return "";
  // Si ya es una URL absoluta, devolverla tal cual
  if (path.startsWith("http")) {
    return path;
  }
  if (!API_URL) {
    console.warn("getStrapiURL: NEXT_PUBLIC_STRAPI_API_URL no está configurado.");
    return path;
  }
  // Construir la URL absoluta
  return `${API_URL.replace(/\/api$/, "")}${path}`;
};


// Función auxiliar mejorada para aplanar la respuesta de la API de Strapi
const flattenAttributes = (data: any): any => {
  // Si no hay datos, devolver null
  if (data === null || data === undefined) {
    return null;
  }

  // Si es un objeto con 'data' y 'attributes', es una relación (simple o múltiple)
  if (data && typeof data === 'object' && 'data' in data) {
    // Si 'data' es null (relación no existente), devolver null
    if (data.data === null) {
      return null;
    }
    // Si es un array (relación múltiple), mapear y aplanar cada item
    if (Array.isArray(data.data)) {
      return data.data.map(item => flattenAttributes(item));
    }
    // Si es un objeto (relación simple), aplanarlo
    return flattenAttributes(data.data);
  }

  // Si es un objeto con 'id' y 'attributes', es la estructura principal de una entidad
  if (data && typeof data === 'object' && 'id' in data && 'attributes' in data) {
    const flattened = {
      id: data.id,
      ...data.attributes,
    };
    // Recursivamente aplanar cada atributo del objeto
    for (const key in flattened) {
      flattened[key] = flattenAttributes(flattened[key]);
    }
    return flattened;
  }
  
  // Si es un array, mapear y aplanar cada item
  if (Array.isArray(data)) {
    return data.map(item => flattenAttributes(item));
  }

  // Si es un objeto (como un componente o atributos ya aplanados), aplanar sus propiedades
  if (data && typeof data === 'object') {
    const flattenedObj: { [key: string]: any } = {};
    for (const key in data) {
      flattenedObj[key] = flattenAttributes(data[key]);
    }
    return flattenedObj;
  }

  // Si es un valor primitivo, devolverlo como está
  return data;
};


export const fetchFromStrapi = async (endpoint: string, params: Record<string, any> = {}) => {
  if (!API_URL || !API_TOKEN) {
    console.error("Error: Las variables de entorno de Strapi (URL o Token) no están configuradas.");
    throw new Error("Configuración de API de Strapi incompleta.");
  }

  const queryString = stringify(params, {
    encodeValuesOnly: true, // Codifica los valores pero no las claves
    arrayFormat: 'repeat', // Cambiado para que coincida con la API de Strapi (evita índices)
  });
    
  const finalUrl = `${API_URL}/${endpoint}${queryString ? `?${queryString}` : ''}`;
  
  try {
    const res = await axios.get(finalUrl, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      // Lanza un error para respuestas 4xx y 5xx
      validateStatus: (status) => status >= 200 && status < 300,
    });
    
    // Aplanar la respuesta para facilitar su uso
    const flattenedData = flattenAttributes(res.data);
    return flattenedData;

  } catch (error) {
    console.error(`Error al obtener datos del endpoint de Strapi: ${finalUrl}`, error);
    // Relanzar el error para que pueda ser manejado por el llamador
    throw error;
  }
};
