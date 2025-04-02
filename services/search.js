import { fetchAPI } from "./api";

export const searchContent = async (query) => {
    if (!query || query.length < 3) return [];

    try {
        // Търсене в блог публикации
        const blogPosts = await fetchAPI(`posts?search=${query}`);

        // Търсене в CPT "members"
        const members = await fetchAPI(`members?search=${query}`);

        // Търсене в CPT "members"
        const services = await fetchAPI(`services?search=${query}`);

        // Форматиране на резултатите
        const results = [
            ...blogPosts.map(post => ({
                id: post.id,
                title: post.title.rendered,
                slug: post.slug,
                excerpt: post.excerpt.rendered,
                type: "blog",
            })),
            ...members.map(member => ({
                id: member.id,
                title: member.title.rendered,
                slug: member.slug,
                type: "team",
            })),
            ...services.map(service => ({
                id: service.id,
                title: service.title.rendered,
                slug: service.slug,
                type: "services",
            })),
        ];

        return results;
    } catch (error) {
        console.error("Search API Error:", error);
        return [];
    }
};
