import api from '@/services/api';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || '{}'),
    token: localStorage.getItem('token') || ''
  }),
  actions: {
    async login(credentials: { email: string; password: string }) {
      try {
        // Request
        const response = await api.post('/users/login', credentials);
        if (response.status < 200 || response.status >= 300) {
          throw new Error('Invalid response');
        }
        // Response
        const { token } = response.data;
        this.token = token;
        localStorage.setItem('token', token); // Save token to local storage

        // Get user
        await this.getUser();
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async getUser() {
      try {
        const response = await api.get('/users/me');
        this.user = response.data;

        console.log(JSON.stringify(this.user));
        localStorage.setItem('user', JSON.stringify(this.user)); // Save user to local storage
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async register(credentials: {
      lastname: string;
      email: string;
      password: string;
      role: string;
      adress: string;
      phone: string;
      firstname: string;
    }) {
      try {
        const body = {
          lastname: credentials.lastname,
          email: credentials.email,
          password: credentials.password,
          role: credentials.role,
          adress: credentials.adress,
          phone: credentials.phone,
          firstname: credentials.firstname
        };

        // Request
        const response = await api.post('/users/register', body);
        if (response.status < 200 || response.status >= 300) {
          throw new Error('Invalid response');
        }
        // Login after registration
        const formattedCreditionals = {
          email: credentials.email,
          password: credentials.password
        };
        await this.login(formattedCreditionals);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    logout() {
      this.token = '';
      this.user = '';
      localStorage.removeItem('token'); // Remove token from local storage
      localStorage.removeItem('user'); // Remove user from local storage
    }
  }
});
