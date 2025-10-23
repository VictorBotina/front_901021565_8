import axios from 'axios';
import { stringify } from 'qs';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

// Helper function to flatten the Strapi API response
const parseStrapiResponse = (strapiResponse: any): any[] => {
  if (!strapiResponse || !strapiResponse.data) {
    // If there's no data, return an empty array
    if (Array.isArray(strapiResponse)) return strapiResponse;
    return [];
  }

  // If the data is not an array, wrap it in an array to handle both single and multiple items
  const data = Array.isArray(strapiResponse.data) ? strapiResponse.data : [strapiResponse.data];

  return data.map((item: any) => {
    // If item is null or doesn't have attributes, return it as is or null
    if (!item || !item.attributes) {
      return { id: item.id };
    }

    const attributes = item.attributes;
    // Start with the item's id and its attributes
    const result: { [key: string]: any } = { id: item.id, ...attributes };

    // Iterate over the attributes to find relational fields
    for (const key in attributes) {
      if (Object.prototype.hasOwnProperty.call(attributes, key)) {
        const value = attributes[key];
        
        // If an attribute is an object with a 'data' property, it's a relation
        if (typeof value === 'object' && value !== null && 'data' in value) {
            // Recursively parse the nested data
            const nestedData = parseStrapiResponse(value);
            
            // If the nested data is a single item, unwrap it from the array
            result[key] = Array.isArray(nestedData) && nestedData.length === 1 && value.data && !Array.isArray(value.data)
              ? nestedData[0] 
              : nestedData;
        }
      }
    }
    return result;
  });
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
    const parsedData = parseStrapiResponse(res.data);
    
    // The fetch function now returns the clean data directly
    return parsedData;

  } catch (error) {
    console.error(`Error fetching from Strapi endpoint: /${endpoint}`, error);
    return []; // Return an empty array on error
  }
};

export { fetchFromStrapi };
