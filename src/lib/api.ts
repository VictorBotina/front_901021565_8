import axios from 'axios';
import { stringify } from 'qs';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

// Helper function to flatten the Strapi API response
const parseStrapiResponse = (strapiResponse: any) => {
  if (!strapiResponse || !strapiResponse.data) {
    return [];
  }

  const data = Array.isArray(strapiResponse.data) ? strapiResponse.data : [strapiResponse.data];

  return data.map((item: any) => {
    const attributes = item.attributes;
    const result: { [key: string]: any } = { id: item.id };

    for (const key in attributes) {
      if (Object.prototype.hasOwnProperty.call(attributes, key)) {
        const value = attributes[key];
        // Check for nested data object (common for relations)
        if (typeof value === 'object' && value !== null && 'data' in value) {
          // Recursively parse nested data
          result[key] = parseStrapiResponse(value);
          // If it's a single item, just return the object, not an array of one
          if (Array.isArray(result[key]) && result[key].length === 1) {
            result[key] = result[key][0]
          }
        } else {
          result[key] = value;
        }
      }
    }
    return result;
  });
};


const fetchFromStrapi = async (endpoint: string, params: Record<string, any> = {}) => {
  if (!API_URL || !API_TOKEN) {
    console.error("Strapi URL or Token is not configured in environment variables.");
    return { data: [] };
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
    const parsedData = parseStrapiResponse(res.data);
    
    // The fetch function now returns the clean data directly
    return parsedData;

  } catch (error) {
    console.error(`Error fetching from Strapi endpoint: /${endpoint}`, error);
    return []; // Return an empty array on error
  }
};

export { fetchFromStrapi };
