<script setup lang="ts">
import OrderList from '@/components/orders/OrderList.vue';
import SectionElement from '@/components/elements/SectionElement.vue';
import SpinnerElement from '@/components/elements/SpinnerElement.vue';
import WrapperElement from '@/components/elements/WrapperElement.vue';
import { useAuthStore } from '@/stores/auth';
import { useOrdersStore } from '@/stores/orders';
import { onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';

const loading = ref(false);
const ordersStore = useOrdersStore();
const useAuth = useAuthStore();

let loggedUser: any = null;
if (useAuth.user) {
    loggedUser = useAuth.user;
}

onMounted(async () => {
    if (!ordersStore.orders.length) {
        try {
            loading.value = true;
            await ordersStore.fetchOrders(loggedUser?.id);
        } catch (error) {
            toast.error('Erreur lors du chargement des commandes.');
        } finally {
            loading.value = false;
        }
    }
});
</script>

<template>
    <WrapperElement>
        <SectionElement title="Commandes">
            <template #content>
                <SpinnerElement large v-if="loading" />
                <OrderList :orders="ordersStore.orders" v-else />
            </template>
        </SectionElement>
    </WrapperElement>
</template>