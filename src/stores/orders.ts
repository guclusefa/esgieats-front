import api from '@/services/api';
import type { Order } from '@/types/Order';
import { defineStore } from 'pinia';

const url = '/orders';

export const useOrdersStore = defineStore({
  id: 'orders',
  state: () => ({
    orders: [] as Order[],
    order: {} as Order
  }),
  actions: {
    async fetchOrders(userId: string) {
      try {
        const response = await api.get(`${url}/${userId}`);
        this.orders = response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async fetchOrder(id: string) {
      try {
        const response = await api.get(`${url}/${id}`);
        this.order = response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async createOrder(order: any) {
      try {
        console.log('Creating order:', order);
        const response = await api.post(url, order);
        this.orders.push(response.data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async closeOrder(id: string) {
      try {
        await api.post(`${url}/close/${id}`);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async updateOrderStatus(id: string, status: string) {
      try {
        await api.put(`${url}/${id}/status`, { status });
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async deleteOrder(id: string) {
      try {
        await api.delete(`${url}/${id}`);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    resetOrder() {
      this.order = {} as Order;
    }
  }
});
