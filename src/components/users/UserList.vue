<script setup lang="ts">
import type { User } from '@/types/User';
import UserCard from './UserCard.vue';
import { computed, ref } from 'vue';

const props = defineProps({
  users: {
    type: Array as () => User[],
    required: true
  }
});

const searchTerm = ref('');
const selectedRole = ref('all');
const sortOrder = ref<'asc' | 'desc'>('desc');

const roles = [
  { label: 'Tous', value: 'all' },
  { label: 'Restaurants', value: 'restaurant' }
];

const filteredUsers = computed(() => {
  const filtered = props.users.filter(user => {
    const matchSearch =
      searchTerm.value === '' ||
      `${user.firstname} ${user.lastname}`.toLowerCase().includes(searchTerm.value.toLowerCase());

    const matchRole = selectedRole.value === 'all' || user.role === selectedRole.value;

    return matchSearch && matchRole;
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
      <!-- Role Filters -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="role in roles"
          :key="role.value"
          @click="selectedRole = role.value"
          class="px-3 py-1 rounded-full border text-sm transition-all"
          :class="{
            'bg-primary text-white border-primary': selectedRole === role.value,
            'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-300': selectedRole !== role.value
          }"
        >
          {{ role.label }}
        </button>
      </div>

      <!-- Search -->
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Rechercher un nom"
        class="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-primary-200"
      />

      <!-- Sort -->
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium">Trier par date :</label>
        <select v-model="sortOrder" class="text-sm border rounded-md px-2 py-1 border-gray-300">
          <option value="asc">Anciens d'abord</option>
          <option value="desc">Nouveaux d'abord</option>
        </select>
      </div>
    </div>

    <!-- Count -->
    <p class="text-sm text-gray mb-2">{{ filteredUsers.length }} élèment(s)</p>

    <!-- Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <UserCard
        v-for="user in filteredUsers"
        :key="user.id"
        :user="user"
      />
    </div>
  </section>
</template>
