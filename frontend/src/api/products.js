import apiClient from './config';

export const productsAPI = {
  /**
   * Get all products
   * @returns {Promise} List of products
   */
  getAllProducts: async () => {
    try {
      const response = await apiClient.get('/products');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get product by ID
   * @param {number} id - Product ID
   * @returns {Promise} Product data
   */
  getProductById: async (id) => {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get products by category
   * @param {string} category - Product category
   * @returns {Promise} List of products in category
   */
  getProductsByCategory: async (category) => {
    try {
      const response = await apiClient.get(`/products/category/${category}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Search products by keyword
   * @param {string} keyword - Search keyword
   * @returns {Promise} List of matching products
   */
  searchProducts: async (keyword) => {
    try {
      const response = await apiClient.get('/products/search', {
        params: { keyword },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Create a new product (Admin only)
   * @param {Object} product - Product data
   * @returns {Promise} Created product
   */
  createProduct: async (product) => {
    try {
      const response = await apiClient.post('/products', product);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Update a product (Admin only)
   * @param {number} id - Product ID
   * @param {Object} product - Updated product data
   * @returns {Promise} Updated product
   */
  updateProduct: async (id, product) => {
    try {
      const response = await apiClient.put(`/products/${id}`, product);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Delete a product (Admin only)
   * @param {number} id - Product ID
   * @returns {Promise} Success message
   */
  deleteProduct: async (id) => {
    try {
      const response = await apiClient.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
