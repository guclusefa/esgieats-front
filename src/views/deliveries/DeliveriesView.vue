<script setup lang="ts">
import DeliveryList from '@/components/deliveries/DeliveryList.vue';
import SectionElement from '@/components/elements/SectionElement.vue';
import SpinnerElement from '@/components/elements/SpinnerElement.vue';
import WrapperElement from '@/components/elements/WrapperElement.vue';
import { useAuthStore } from '@/stores/auth';
import { useDeliveriesStore } from '@/stores/deliveries';
import { onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';

const loading = ref(false);
const deliveriesStore = useDeliveriesStore();
const useAuth = useAuthStore();

let loggedUser: any = null;
if (useAuth.user) {
    loggedUser = useAuth.user;
}

onMounted(async () => {
    if (!deliveriesStore.deliveries.length) {
        try {
            loading.value = true;
            await deliveriesStore.fetchDeliveries(loggedUser?.id);
        } catch (error) {
            toast.error('Erreur lors du chargement des livraisons.');
        } finally {
            loading.value = false;
        }
    }
});
</script>

<template>
    <WrapperElement>
        <SectionElement title="Livraisons">
            <template #content>
                <SpinnerElement large v-if="loading" />
                <DeliveryList :deliverys="deliveriesStore.deliveries" v-else />
            </template>
        </SectionElement>
    </WrapperElement>
</template>