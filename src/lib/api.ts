import axios from 'axios';
import { stringify } from 'qs';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

// Helper function to flatten the Strapi API response
const flattenAttributes = (data: any): any => {
  if (!data) return null;

  // If it's a single item, flatten its attributes
  if (data.id && data.attributes) {
    const flattened = { id: data.id, ...data.attributes };
    for (const key in flattened) {
      flattened[key] = flattenAttributes(flattened[key]);
    }
    return flattened;
  }

  // If it's an array, map over it and flatten each item
  if (Array.isArray(data)) {
    return data.map(item => flattenAttributes(item));
  }
  
  // If it's a data object with attributes, recursively flatten
  if (data.data) {
    return flattenAttributes(data.data);
  }

  // If it's a plain object (like attributes of a media file), recursively flatten its keys
  if (typeof data === 'object' && !Array.isArray(data)) {
    const flattenedObj: { [key: string]: any } = {};
    for (const key in data) {
      flattenedObj[key] = flattenAttributes(data[key]);
    }
    return flattenedObj;
  }

  return data;
};


const fetchFromStrapi = async (endpoint: string, params: Record<string, any> = {}) => {
  if (!API_URL || !API_TOKEN) {
    console.error("Strapi URL or Token is not configured in environment variables.");
    return []; // Return empty array if not configured
  }

  const queryString = stringify(params, {
    encodeValuesOnly: true,
  });

  try {
    const res = await axios.get(`${API_URL}/${endpoint}${queryString ? `?${queryString}` : ''}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    
    // Parse the response before returning
    const flattenedData = flattenAttributes(res.data);
    
    // Ensure the final output is always an array for collections
    return Array.isArray(flattenedData) ? flattenedData : (flattenedData ? [flattenedData] : []);

  } catch (error) {
    console.error(`Error fetching from Strapi endpoint: /${endpoint}`, error);
    return []; // Return an empty array on error
  }
};

export { fetchFromStrapi };
