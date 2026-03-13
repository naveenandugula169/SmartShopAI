import apiClient from './config';

export const cartAPI = {
  /**
   * Get user's cart
   * @param {number} userId - User ID
   * @returns {Promise} Cart data
   */
  getCart: async (userId) => {
    try {
      const response = await apiClient.get(`/cart/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Add item to cart
   * @param {number} userId - User ID
   * @param {number} productId - Product ID to add
   * @param {number} quantity - Quantity (default: 1)
   * @returns {Promise} Updated cart
   */
  addToCart: async (userId, productId, quantity = 1) => {
    try {
      const response = await apiClient.post(`/cart/${userId}/add`, null, {
        params: {
          productId,
          quantity,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Remove item from cart
   * @param {number} userId - User ID
   * @param {number} itemId - Cart item ID to remove
   * @returns {Promise} Updated cart
   */
  removeFromCart: async (userId, itemId) => {
    try {
      const response = await apiClient.delete(`/cart/${userId}/item/${itemId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Clear entire cart
   * @param {number} userId - User ID
   * @returns {Promise} Success message
   */
  clearCart: async (userId) => {
    try {
      const response = await apiClient.delete(`/cart/${userId}/clear`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
