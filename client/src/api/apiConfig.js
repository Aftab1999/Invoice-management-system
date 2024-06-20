// Define the base URL using environment variables
export const BASE_URL = import.meta.env.REACT_APP_API;

// Helper function to get the full API URL
export const getApiUrl = (endpoint) => `${BASE_URL}${endpoint}`;

// Definition of all product category-related API endpoints
export const productCategoryEndpoints = {
    CREATE_CATEGORY: getApiUrl('/productcategories/'),
    GET_ALL_CATEGORIES: getApiUrl('/productcategories/'),
    GET_CATEGORY: (id) => getApiUrl(`/productcategories/${id}`),
    UPDATE_CATEGORY: (id) => getApiUrl(`/productcategories/${id}`),
    DELETE_CATEGORY: (id) => getApiUrl(`/productcategories/${id}`)
};
