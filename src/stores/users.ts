import api from '@/services/api';
import type { User } from '@/types/User';
import { defineStore } from 'pinia';

const url = '/users';

export const useUsersStore = defineStore({
  id: 'users',
  state: () => ({
    users: [] as User[],
    user: {} as User
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await api.get(url);
        this.users = response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async fetchUser(id: string) {
      try {
        const response = await api.get(`${url}/${id}`);
        this.user = response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async deleteUser(id: string) {
      try {
        await api.delete(`${url}/${id}`);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    resetUser() {
      this.user = {} as User;
    }
  }
});
