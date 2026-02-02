import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

const authService = {
    login: async (username, password) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}${API_ENDPOINTS.LOGIN}`,
                { username, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data));
            }

            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Network error' };
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    getToken: () => {
        return localStorage.getItem('token');
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

export default authService;
