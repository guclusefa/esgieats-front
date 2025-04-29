<script setup lang="ts">
import type { Order } from '@/types/Order';
import OrderCard from './OrderCard.vue';

const props = defineProps<{
    orders: Order[];
}>();
</script>

<template>
    <section>
        <p class="text-sm text-gray mb-4">{{ orders.length }} élèment(s)</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <OrderCard v-for="order in orders" :key="order.id" :order="order" />
        </div>
    </section>
</template>
