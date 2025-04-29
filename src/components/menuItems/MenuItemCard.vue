<script setup lang="ts">
import type { MenuItem } from '@/types/MenuItem';
import MenuItemEditButton from './MenuItemEditButton.vue';
import MenuItemDeleteButton from './MenuItemDeleteButton.vue';
import { useAuthStore } from '@/stores/auth';

const props = defineProps<{
    menuItem: MenuItem;
}>();

const useAuth = useAuthStore();
let loggedUser: any = null;
if (useAuth.user) {
  loggedUser = useAuth.user;
}
</script>

<template>
    <div class="p-6 rounded-2xl shadow-lg bg-white dark:bg-black-lightend hover:shadow-xl transition-all space-y-4 border border-gray-100 dark:border-gray-700">
        <div class="mb-4">
            <h2 class="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-lightest to-primary-darkest dark:from-primary-darkest dark:to-primary-lightest group-hover:from-primary-lightest group-hover:to-primary-darkest transition-colors">
                {{ menuItem.name }}
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ menuItem.description }}</p>
        </div>
        
        <div class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <p><strong class="text-primary-dark">Prix:</strong> {{ menuItem.price }} €</p>
            <p><strong class="text-primary-dark">Disponible:</strong> {{ menuItem.available ? 'Oui' : 'Non' }}</p>
            <p class="text-xs text-gray-400 dark:text-gray-500"><strong class="text-primary-dark">Ajouté le:</strong> {{ new Date(menuItem.created_at).toLocaleDateString() }}</p>
        </div>
        
        <!-- Footer with action buttons for edit/delete -->
        <footer class="flex items-center gap-2 mt-4" v-if="menuItem.restaurant_id && menuItem.restaurant_id === loggedUser.id || loggedUser.role === 'admin'">
            <MenuItemEditButton :menuItem="menuItem" :restaurantId="menuItem.restaurant_id" />
            <MenuItemDeleteButton :menuItem="menuItem" />
        </footer>
    </div>
</template>

<style scoped>
/* Styling for primary color, adjust your theme if needed */
.text-primary-dark {
    color: #1a202c; /* Dark primary color, adjust for your theme */
}

.bg-primary-lightest {
    background-color: #e6f4ff; /* Lightest primary color */
}

.bg-primary-darkest {
    background-color: #1a365d; /* Darkest primary color */
}

.bg-gradient-to-r {
    background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

.dark .bg-black-lightend {
    background-color: #1a202c; /* Dark mode background */
}

/* Additional dark mode adjustments */
.dark .text-primary-dark {
    color: #edf2f7; /* Light primary color in dark mode */
}
</style>
