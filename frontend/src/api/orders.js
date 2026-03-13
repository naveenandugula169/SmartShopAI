import apiClient from './config';

export const ordersAPI = {
  /**
   * Get all orders for a user
   * @param {number} userId - User ID
   * @returns {Promise} List of orders
   */
  getOrdersByUserId: async (userId) => {
    try {
      const response = await apiClient.get(`/orders/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get order by ID
   * @param {number} id - Order ID
   * @returns {Promise} Order data
   */
  getOrderById: async (id) => {
    try {
      const response = await apiClient.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Create order from cart
   * @param {Object} orderData - Order creation data
   * @param {number} orderData.userId - User ID
   * @param {string} orderData.shippingAddress - Shipping address
   * @param {string} orderData.paymentMethod - Payment method (default: "CASH")
   * @returns {Promise} Created order
   */
  createOrder: async (orderData) => {
    try {
      const response = await apiClient.post('/orders/create', {
        userId: orderData.userId,
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod || 'CASH',
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Update order status
   * @param {number} id - Order ID
   * @param {string} status - New status (PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED)
   * @returns {Promise} Updated order
   */
  updateOrderStatus: async (id, status) => {
    try {
      const response = await apiClient.put(`/orders/${id}/status`, null, {
        params: { status },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
