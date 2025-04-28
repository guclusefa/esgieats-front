import api from '@/services/api';
import type { MenuItem } from '@/types/MenuItem';
import { defineStore } from 'pinia';

const url = '/menu';

export const useMenuItemssStore = defineStore({
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
    async createMenuItem(restaurantId: string) {
      try {
        const response = await api.post(`${url}/${restaurantId}`, this.menuItem);
        this.menuItems.push(response.data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async updateMenuItem(restaurantId: string, menuId: string) {
      try {
        const response = await api.put(`${url}/${restaurantId}/${menuId}`, this.menuItem)
        const index = this.menuItems.findIndex(item => item.id === menuId);
        if (index !== -1) {
          this.menuItems[index] = response.data;
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async deleteMenuItems(id: string) {
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
