import axios from 'axios';
import { stringify } from 'qs';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

// Helper to construct absolute URL if it's relative
const getStrapiURL = (path = "") => {
  if (!API_URL) {
    // This should not happen if the env var is set
    return path;
  }
  // If the path is already an absolute URL, return it as is.
  if (path.startsWith('http')) {
    return path;
  }
  // Otherwise, construct the absolute URL.
  return `${API_URL.replace('/api', '')}${path}`;
};


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

  // If it's a plain object that looks like a Strapi media object, just return its URL
  if (typeof data === 'object' && data !== null && 'url' in data && 'width' in data && 'height' in data) {
    return getStrapiURL(data.url);
  }

  // If it's a plain object (like attributes of a component), recursively flatten its keys
  if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
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
    return null; 
  }

  const queryString = stringify(params, {
    encode: false, // Do not encode brackets
  });
    
  const finalUrl = `${API_URL}/${endpoint}${queryString ? `?${queryString}` : ''}`;
  

  try {
    const res = await axios.get(finalUrl, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    
    const flattenedData = flattenAttributes(res.data);
    
    return flattenedData;

  } catch (error) {
    console.error(`Error fetching from Strapi endpoint: ${finalUrl}`, error);
    // Return null instead of an empty array to distinguish between "no data" and "an error occurred"
    return null; 
  }
};

export { fetchFromStrapi };
