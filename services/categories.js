import { fetchAPI } from "./api";

/**
 * Get all categories
 * @returns {Promise<Array>} - List of categories
 */
export const getCategories = async () => {
    return await fetchAPI("categories");
};
