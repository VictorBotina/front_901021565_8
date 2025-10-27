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
      if (key === 'url' && typeof flattened[key] === 'string') {
        flattened[key] = getStrapiURL(flattened[key]);
      } else {
        flattened[key] = flattenAttributes(flattened[key]);
      }
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
       if (key === 'url' && typeof data[key] === 'string') {
        flattenedObj[key] = getStrapiURL(data[key]);
      } else {
        flattenedObj[key] = flattenAttributes(data[key]);
      }
    }
    return flattenedObj;
  }

  return data;
};


const fetchFromStrapi = async (endpoint: string, params: Record<string, any> = {}) => {
  if (!API_URL || !API_TOKEN) {
    console.error("Strapi URL or Token is not configured in environment variables.");
    // For collection types, return empty array. For single types, this will be handled by the logic below.
    return []; 
  }

  // Ensure relations are always populated
  const defaultPopulate = { populate: '*' };
  const mergedParams = { ...defaultPopulate, ...params };

  const queryString = stringify(mergedParams, {
    encodeValuesOnly: true,
  });

  try {
    const res = await axios.get(`${API_URL}/${endpoint}${queryString ? `?${queryString}` : ''}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    
    const isSingleType = res.data.data && !Array.isArray(res.data.data);
    const flattenedData = flattenAttributes(res.data);
    
    if (isSingleType) {
        return flattenedData ?? null; // Return single object or null
    }

    // Ensure the final output is always an array for collection types
    return Array.isArray(flattenedData) ? flattenedData : (flattenedData ? [flattenedData] : []);

  } catch (error) {
    console.error(`Error fetching from Strapi endpoint: /${endpoint}`, error);
    // For collection types return empty array, for single types this should result in null on the other end.
    return []; 
  }
};

export { fetchFromStrapi };
