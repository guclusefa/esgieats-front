<script setup lang="ts">
import type { Delivery } from '@/types/Delivery';

const props = defineProps<{
    delivery: Delivery;
}>();
</script>

<template>
    <div class="p-4 rounded-2xl shadow-md bg-white hover:shadow-lg transition">
        <div class="mb-2">
            <h2 class="text-lg font-semibold">{{ delivery.id }}</h2>
        </div>
    </div>
</template>
