<script setup lang="ts">
import type { Order } from '@/types/Order';

const props = defineProps<{
    order: Order;
}>();
</script>

<template>
    <div class="p-4 rounded-2xl shadow-md bg-white hover:shadow-lg transition">
        <div class="mb-2">
            <h2 class="text-lg font-semibold">{{ order.id }}</h2>
        </div>
    </div>
</template>
