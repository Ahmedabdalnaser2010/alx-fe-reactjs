import axios from 'axios';

const BASE_URL = 'https://api.github.com';

export const fetchUserData = async (query, location = '', minRepos = '') => {
    try {
        // If it's a simple username search (no advanced parameters)
        if (!location && !minRepos) {
            const response = await axios.get(`${BASE_URL}/users/${query}`);
            return [response.data]; // Return as array for consistent typing
        }

        // Build the advanced search query
        let searchQuery = `${query}`;
        if (location) searchQuery += ` location:${location}`;
        if (minRepos) searchQuery += ` repos:>${minRepos}`;

        // Make the advanced search request
        const response = await axios.get(`${BASE_URL}/search/users`, {
            params: {
                q: searchQuery,
                per_page: 30
            }
        });

        // If no results found
        if (response.data.items.length === 0) {
            return [];
        }

        // Fetch detailed information for each user
        const usersWithDetails = await Promise.all(
            response.data.items.map(async (user) => {
                try {
                    const userDetails = await axios.get(`${BASE_URL}/users/${user.login}`);
                    return {
                        ...user,
                        ...userDetails.data
                    };
                } catch (error) {
                    console.error(`Error fetching details for user ${user.login}:`, error);
                    return user; // Return basic info if details fail
                }
            })
        );

        return usersWithDetails;
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        throw error;
    }
};