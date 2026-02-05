import axiosInstance from './axiosInstance';

const productService = {
    // Get all frames
    getAllFrames: async () => {
        try {
            const response = await axiosInstance.get('/api/frames');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch frames' };
        }
    },

    // Get all lenses
    getAllLenses: async () => {
        try {
            const response = await axiosInstance.get('/api/lenses');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch lenses' };
        }
    },

    // Update frame
    updateFrame: async (id, frameData) => {
        try {
            const response = await axiosInstance.put(`/api/frames/${id}`, frameData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to update frame' };
        }
    },

    // Delete frame
    deleteFrame: async (id) => {
        try {
            await axiosInstance.delete(`/api/frames/${id}`);
            return { success: true };
        } catch (error) {
            throw error.response?.data || { message: 'Failed to delete frame' };
        }
    },

    // Update lens
    updateLens: async (id, lensData) => {
        try {
            const response = await axiosInstance.put(`/api/lenses/${id}`, lensData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to update lens' };
        }
    },

    // Delete lens
    deleteLens: async (id) => {
        try {
            await axiosInstance.delete(`/api/lenses/${id}`);
            return { success: true };
        } catch (error) {
            throw error.response?.data || { message: 'Failed to delete lens' };
        }
    }
};

export default productService;
