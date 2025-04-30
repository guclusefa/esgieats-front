<script setup lang="ts">
import type { Order } from '@/types/Order';
import OrderCard from './OrderCard.vue';
import { ref, computed } from 'vue';

const props = defineProps<{
  orders: Order[];
}>();

const selectedStatus = ref('all');
const searchTerm = ref('');
const sortOrder = ref<'asc' | 'desc'>('desc'); // Only direction now

const statuses = [
  { label: 'Tous', value: 'all' },
  { label: 'En attente', value: 'en_attente' },
  { label: 'En livraison', value: 'en_livraison' },
  { label: 'Livré', value: 'livre' },
  { label: 'Annulé', value: 'annule' },
];

const filteredAndSortedOrders = computed(() => {
  const filtered = props.orders.filter(order => {
    const matchStatus = selectedStatus.value === 'all' || order.order_status === selectedStatus.value;
    const matchSearch = searchTerm.value === '' || order.id.toString().includes(searchTerm.value);
    return matchStatus && matchSearch;
  });

  return [...filtered].sort((a, b) => {
    const aTime = new Date(a.created_at).getTime();
    const bTime = new Date(b.created_at).getTime();
    return sortOrder.value === 'asc' ? aTime - bTime : bTime - aTime;
  });
});
</script>

<template>
  <section>
    <!-- Filters + Search + Sort -->
    <div class="flex flex-wrap justify-between items-center gap-4 mb-4">
      <!-- Status Filter Chips -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="status in statuses"
          :key="status.value"
          @click="selectedStatus = status.value"
          class="px-3 py-1 rounded-full border text-sm transition-all"
          :class="{
            'bg-primary text-white border-primary': selectedStatus === status.value,
            'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-300': selectedStatus !== status.value
          }"
        >
          {{ status.label }}
        </button>
      </div>

      <!-- Search Bar -->
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Rechercher par ID"
        class="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-primary-200"
      />

      <!-- Sort Order Selector -->
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium">Trier par date :</label>
        <select v-model="sortOrder" class="text-sm border rounded-md px-2 py-1 border-gray-300">
          <option value="asc">Anciennes d'abord</option>
          <option value="desc">Récentes d'abord</option>
        </select>
      </div>
    </div>

    <!-- Order Count -->
    <p class="text-sm text-gray mb-2">{{ filteredAndSortedOrders.length }} élèment(s)</p>

    <!-- Orders Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <OrderCard
        v-for="order in filteredAndSortedOrders"
        :key="order.id"
        :order="order"
      />
    </div>
  </section>
</template>
