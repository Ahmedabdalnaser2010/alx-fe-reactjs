import axios from 'axios';

const BASE_URL = 'https://api.github.com';

export const fetchUserData = async (query) => {
    try {
        // For single user search (if query doesn't contain advanced parameters)
        if (!query.includes('location:') && !query.includes('repos:')) {
            const response = await axios.get(`${BASE_URL}/users/${query}`);
            return response.data;
        }

        // For advanced search
        const response = await axios.get(`${BASE_URL}/search/users`, {
            params: {
                q: query,
                per_page: 30
            }
        });

        // Fetch additional details for each user
        const usersWithDetails = await Promise.all(
            response.data.items.map(async (user) => {
                const userDetails = await axios.get(`${BASE_URL}/users/${user.login}`);
                return {
                    ...user,
                    ...userDetails.data
                };
            })
        );

        return {
            ...response.data,
            items: usersWithDetails
        };
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        throw error;
    }
};