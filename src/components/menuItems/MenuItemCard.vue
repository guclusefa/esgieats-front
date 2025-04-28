<script setup lang="ts">
import type { MenuItem } from '@/types/MenuItem';

const props = defineProps<{
    menuItem: MenuItem;
}>();
</script>

<template>
    <div class="p-4 rounded-2xl shadow-md bg-white hover:shadow-lg transition">
        <div class="mb-2">
            <h2 class="text-lg font-semibold">{{ menuItem.name }}</h2>
            <p class="text-sm text-gray-500">{{ menuItem.description }}</p>
        </div>
        <div class="text-sm text-gray-700 space-y-1">
            <p><strong>Prix:</strong> {{ menuItem.price }} €</p>
            <p><strong>Disponible:</strong> {{ menuItem.available ? 'Oui' : 'Non' }}</p>
            <p class="text-xs text-gray-400"><strong>Ajouté le:</strong> {{ new
                Date(menuItem.created_at).toLocaleDateString() }}</p>
        </div>
    </div>
</template>
