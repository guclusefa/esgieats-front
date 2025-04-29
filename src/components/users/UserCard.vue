<script setup lang="ts">
import type { User } from '@/types/User';

const props = defineProps<{
  user: User;
}>();
</script>

<template>
  <RouterLink :to="{ name: 'user', params: { id: props.user.id } }" class="block group">
    <div class="p-6 bg-white dark:bg-black-lightend rounded-2xl shadow hover:shadow-xl transition-shadow duration-300">
      <div class="mb-4">
        <h2 class="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-lightest to-primary-darkest dark:from-primary-darkest dark:to-primary-lightest group-hover:from-primary-lightest group-hover:to-primary-darkest transition-colors">
          {{ user.firstname }} {{ user.lastname }}
        </h2>
        <p class="text-sm text-gray-400 dark:text-gray-300 capitalize">{{ user.role }}</p>
      </div>

      <div class="text-sm text-gray-700 space-y-2 dark:text-gray-300">
        <p>
          <span class="font-medium text-gray-600 dark:text-gray-400">📞 Tél :</span> {{ user.phone }}
        </p>
        <p>
          <span class="font-medium text-gray-600 dark:text-gray-400">🏠 Adresse :</span> {{ user.adress }}
        </p>
      </div>

      <div class="mt-6 text-xs text-gray-400 dark:text-gray-500">
        🕒 Membre depuis le {{ new Date(user.created_at).toLocaleDateString() }}
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
/* Additional custom styles */
</style>
