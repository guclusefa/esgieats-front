<script setup lang="ts">
import type { MenuItem } from '@/types/MenuItem';
import MenuItemCard from './MenuItemCard.vue';

const props = defineProps<{
    menuItems: MenuItem[];
}>();
</script>

<template>
    <section>
        <p class="text-sm text-gray mb-4">{{ menuItems.length }} élèment(s)</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MenuItemCard v-for="menuItem in menuItems" :key="menuItem.id" :menuItem="menuItem" />
        </div>
    </section>
</template>
