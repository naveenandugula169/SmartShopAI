import apiClient from './config';

export const aiAPI = {
  /**
   * Get AI recommendations for a user
   * @param {number} userId - User ID
   * @returns {Promise} List of recommended products
   */
  getRecommendations: async (userId) => {
    try {
      const response = await apiClient.get(`/ai/recommendations/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get similar products to a given product
   * @param {number} productId - Product ID
   * @returns {Promise} List of similar products
   */
  getSimilarProducts: async (productId) => {
    try {
      const response = await apiClient.get(`/ai/similar/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Send chat message to AI
   * @param {Object} chatData - Chat data
   * @param {string} chatData.message - User message
   * @param {number} chatData.userId - User ID (optional, defaults to 1)
   * @returns {Promise} AI response
   */
  chat: async (chatData) => {
    try {
      const response = await apiClient.post('/ai/chat', {
        message: chatData.message,
        userId: chatData.userId || 1,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
