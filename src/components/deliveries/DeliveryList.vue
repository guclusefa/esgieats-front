<script setup lang="ts">
import type { Delivery } from '@/types/Delivery';
import DeliveryCard from './DeliveryCard.vue';

const props = defineProps<{
    deliverys: Delivery[];
}>();
</script>

<template>
    <section>
        <p class="text-sm text-gray mb-4">{{ deliverys.length }} élèment(s)</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <DeliveryCard v-for="delivery in deliverys" :key="delivery.id" :delivery="delivery" />
        </div>
    </section>
</template>
