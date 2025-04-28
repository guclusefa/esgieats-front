import api from '@/services/api';
import type { Delivery } from '@/types/Delivery';
import { defineStore } from 'pinia';

const url = '/delivery';

export const useDeliveriesStore = defineStore({
  id: 'deliveries',
  state: () => ({
    deliveries: [] as Delivery[],
    delivery: {} as Delivery
  }),
  actions: {
    async fetchDeliveries(userId: string) {
      try {
        const response = await api.get(`${url}/${userId}`);
        this.deliveries = response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async createDelivery(Delivery: Delivery) {
      try {
        const response = await api.post(url, Delivery);
        this.deliveries.push(response.data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async closeDelivery(id: string) {
      try {
        await api.post(`${url}/close/${id}`);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async updateDeliveryStatus(id: string, status: string) {
      try {
        await api.put(`${url}/${id}/status`, { status });
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async deleteDelivery(id: string) {
      try {
        await api.delete(`${url}/${id}`);
        this.deliveries = this.deliveries.filter((delivery) => delivery.id !== id);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    resetDeliveries() {
      this.delivery = {} as Delivery;
    }
  }
});
