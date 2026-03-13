import apiClient from './config';

export const authAPI = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.username - Username
   * @param {string} userData.email - Email address
   * @param {string} userData.password - Password
   * @returns {Promise} API response
   */
  register: async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', {
        username: userData.username || userData.name,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        password: userData.password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Login user
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.username - Username or email
   * @param {string} credentials.password - Password
   * @returns {Promise} API response with token
   */
  login: async (credentials) => {
    try {
      const identifier = credentials.username || credentials.email || credentials.phoneNumber;
      const response = await apiClient.post('/auth/login', {
        username: identifier,
        email: credentials.email,
        phoneNumber: credentials.phoneNumber,
        password: credentials.password,
      });
      
      // Store token and basic user info in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);

        const username = identifier;
        if (username) {
          localStorage.setItem('user', JSON.stringify({ username }));
        }
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Verify OTP code for email
   * @param {Object} data - { email, code }
   */
  verifyOtp: async (data) => {
    try {
      const response = await apiClient.post('/auth/verify', {
        email: data.email,
        code: data.code,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Logout user (clear token)
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Get current token
   * @returns {string|null} JWT token
   */
  getToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} True if token exists
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};
