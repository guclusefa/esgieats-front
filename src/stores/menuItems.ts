import api from '@/services/api';
import type { MenuItem } from '@/types/MenuItem';
import { defineStore } from 'pinia';

const url = '/menu';

export const useMenuItemsStore = defineStore({
  id: 'menuItems',
  state: () => ({
    menuItems: [] as MenuItem[],
    menuItem: {} as MenuItem
  }),
  actions: {
    async fetchMenuItems(restaurantId: string) {
      try {
        const response = await api.get(`${url}/${restaurantId}`);
        this.menuItems = response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async fetchMenuItem(restaurantId: string, itemId: string) {
      try {
        const response = await api.get(`${url}/${restaurantId}/${itemId}`);
        this.menuItem = response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async createMenuItem(menuItem: MenuItem) {
      try {
        await api.post(`${url}/${menuItem.restaurant_id}`, menuItem);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async updateMenuItem(menuItem: MenuItem) {
      const id = menuItem.id;
      const updatedMenuItem = { ...menuItem };
      try {
        await api.put(`${url}/${menuItem.restaurant_id}/${id}`, updatedMenuItem);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async deleteMenuItem(id: string) {
      try {
        await api.delete(`${url}/${id}`);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    resetMenuItems() {
      this.menuItem = {} as MenuItem;
    }
  }
});
