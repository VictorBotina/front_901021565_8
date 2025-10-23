import axios from 'axios';
import { stringify } from 'qs';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

const fetchFromStrapi = async (endpoint: string, params: Record<string, any> = {}) => {
  if (!API_URL || !API_TOKEN) {
    console.error("Strapi URL or Token is not configured in environment variables.");
    return { data: [] };
  }

  const queryString = stringify(params, {
    encodeValuesOnly: true, // important to URL-encode complex query parameters
  });

  try {
    const res = await axios.get(`${API_URL}/${endpoint}${queryString ? `?${queryString}` : ''}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(`Error fetching from Strapi endpoint: /${endpoint}`, error);
    return { data: [] };
  }
};

export { fetchFromStrapi };
