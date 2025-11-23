import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = '@goexplore_auth';
const USER_KEY = '@goexplore_user';

/**
 * Mock database of registered users
 * In a real app, this would be a backend API
 */
const usersDatabase = [];

export const authService = {
  /**
   * Register a new user
   * @param {Object} userData - User data (name, email, password)
   * @returns {Promise<Object>} - User object without password
   */
  async register(userData) {
    try {
      const { firstName, lastName, email, password } = userData;

      // Check if user already exists
      const existingUsers = await AsyncStorage.getItem(USER_KEY);
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      if (users.some((u) => u.email === email)) {
        throw new Error('User with this email already exists');
      }

      // Create new user object
      const newUser = {
        id: Date.now().toString(),
        firstName,
        lastName,
        email,
        avatar: null, // Can be set later
        createdAt: new Date().toISOString(),
      };

      // Store user with password hash (in production, use bcrypt or similar)
      const userWithPassword = {
        ...newUser,
        password: password, // In production, hash this!
      };

      users.push(userWithPassword);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(users));

      // Auto-login after registration
      await this.login(email, password);

      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} - User object and auth token
   */
  async login(email, password) {
    try {
      const existingUsers = await AsyncStorage.getItem(USER_KEY);
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      const user = users.find((u) => u.email === email);

      if (!user) {
        throw new Error('User not found');
      }

      // In production, use bcrypt to compare hashed passwords
      if (user.password !== password) {
        throw new Error('Invalid password');
      }

      // Create authentication session
      const authData = {
        userId: user.id,
        email: user.email,
        token: `token_${user.id}_${Date.now()}`, // Mock JWT token
        loginTime: new Date().toISOString(),
      };

      await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(authData));

      // Store current user without password
      const { password: _, ...userWithoutPassword } = user;
      await AsyncStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

      return userWithoutPassword;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * Get current authenticated user
   * @returns {Promise<Object|null>} - Current user or null
   */
  async getCurrentUser() {
    try {
      const authData = await AsyncStorage.getItem(AUTH_KEY);
      if (!authData) {
        return null;
      }

      const currentUser = await AsyncStorage.getItem('currentUser');
      return currentUser ? JSON.parse(currentUser) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  /**
   * Check if user is authenticated
   * @returns {Promise<boolean>} - Authentication status
   */
  async isAuthenticated() {
    try {
      const authData = await AsyncStorage.getItem(AUTH_KEY);
      return !!authData;
    } catch (error) {
      console.error('Error checking auth status:', error);
      return false;
    }
  },

  /**
   * Logout user
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      await AsyncStorage.removeItem(AUTH_KEY);
      await AsyncStorage.removeItem('currentUser');
    } catch (error) {
      console.error('Error logging out:', error);
      throw new Error('Failed to logout');
    }
  },

  /**
   * Update user profile
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} - Updated user
   */
  async updateProfile(updates) {
    try {
      const currentUser = await this.getCurrentUser();
      if (!currentUser) {
        throw new Error('No user logged in');
      }

      const existingUsers = await AsyncStorage.getItem(USER_KEY);
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      const userIndex = users.findIndex((u) => u.id === currentUser.id);
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      // Update user
      const updatedUser = { ...users[userIndex], ...updates };
      users[userIndex] = updatedUser;

      await AsyncStorage.setItem(USER_KEY, JSON.stringify(users));

      // Update current user cache
      const { password: _, ...userWithoutPassword } = updatedUser;
      await AsyncStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

      return userWithoutPassword;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * Change user password
   * @param {string} oldPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise<void>}
   */
  async changePassword(oldPassword, newPassword) {
    try {
      const currentUser = await this.getCurrentUser();
      if (!currentUser) {
        throw new Error('No user logged in');
      }

      const existingUsers = await AsyncStorage.getItem(USER_KEY);
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      const user = users.find((u) => u.id === currentUser.id);
      if (!user) {
        throw new Error('User not found');
      }

      // Verify old password
      if (user.password !== oldPassword) {
        throw new Error('Current password is incorrect');
      }

      // Update password
      user.password = newPassword;
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(users));
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
