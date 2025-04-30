<script setup lang="ts">
import type { MenuItem } from '@/types/MenuItem';
import MenuItemCard from './MenuItemCard.vue';
import { ref, computed } from 'vue';

const props = defineProps<{
  menuItems: MenuItem[];
}>();

const searchTerm = ref('');
const availabilityFilter = ref<'all' | 'available' | 'unavailable'>('all');
const sortOrder = ref<'asc' | 'desc'>('desc');

const filteredItems = computed(() => {
  const filtered = props.menuItems.filter(item => {
    const matchesSearch =
      searchTerm.value === '' ||
      item.name.toLowerCase().includes(searchTerm.value.toLowerCase());

    const matchesAvailability =
      availabilityFilter.value === 'all' ||
      (availabilityFilter.value === 'available' && item.available) ||
      (availabilityFilter.value === 'unavailable' && !item.available);

    return matchesSearch && matchesAvailability;
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
    <!-- Filters -->
    <div class="flex flex-wrap justify-between items-center gap-4 mb-4">
      <!-- Availability Filter -->
      <div class="flex gap-2">
        <button
          class="px-3 py-1 text-sm rounded-full border"
          :class="{
            'bg-primary text-white border-primary': availabilityFilter === 'all',
            'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-300': availabilityFilter !== 'all'
          }"
          @click="availabilityFilter = 'all'"
        >Tous</button>
        <button
          class="px-3 py-1 text-sm rounded-full border"
          :class="{
            'bg-primary text-white border-primary': availabilityFilter === 'available',
            'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-300': availabilityFilter !== 'available'
          }"
          @click="availabilityFilter = 'available'"
        >Disponibles</button>
        <button
          class="px-3 py-1 text-sm rounded-full border"
          :class="{
            'bg-primary text-white border-primary': availabilityFilter === 'unavailable',
            'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-300': availabilityFilter !== 'unavailable'
          }"
          @click="availabilityFilter = 'unavailable'"
        >Indisponibles</button>
      </div>

      <!-- Search -->
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Rechercher un plat"
        class="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-primary-200"
      />

      <!-- Sort by Date -->
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium">Trier par date :</label>
        <select v-model="sortOrder" class="text-sm border rounded-md px-2 py-1 border-gray-300">
          <option value="asc">Anciens d'abord</option>
          <option value="desc">Nouveaux d'abord</option>
        </select>
      </div>
    </div>

    <!-- Count -->
    <p class="text-sm text-gray mb-2">{{ filteredItems.length }} élèment(s)</p>

    <!-- List -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <MenuItemCard v-for="item in filteredItems" :key="item.id" :menuItem="item" />
    </div>
  </section>
</template>

