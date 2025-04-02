import { fetchAPI } from "./api";

/**
 * Get all pages
 * @returns {Promise<Array>} - List of pages
 */
export const getPages = async () => {
    return await fetchAPI("pages");
};

/**
 * Get page by slug
 * @param {string} slug - Page slug
 * @returns {Promise<Object|null>} - Page data
 */
export const getPageBySlug = async (slug) => {
    return await fetchAPI(`pages?slug=${slug}`);
};
