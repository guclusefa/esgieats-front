<script setup lang="ts">
import InputElement from '@/components/elements/InputElement.vue';
import InputgroupElement from '@/components/elements/InputgroupElement.vue';
import LabelElement from '@/components/elements/LabelElement.vue';
import SelectElement from '@/components/elements/SelectElement.vue';
import { useOrdersStore } from '@/stores/orders';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import ButtonElement from '../elements/ButtonElement.vue';
import type { Order } from '@/types/Order';
import { useAuthStore } from '@/stores/auth';

const useAuth = useAuthStore();
let loggedUser: any = null;
if (useAuth.user) {
  loggedUser = useAuth.user;
}

const router = useRouter();
const props = defineProps({
    order: {
        type: Object as () => Order,
        required: false
    },
    okText: {
        type: String,
        default: 'Valider'
    },
    edit: {
        type: Boolean,
        default: false
    }
});

const orderRef = ref<Object>({
    id: '',
    client_id: loggedUser.id,
    order_status: 'en_attente'
});

if (props.order) {
    orderRef.value = JSON.parse(JSON.stringify(props.order));
}

const $emit = defineEmits(['close']);
const ordersStore = useOrdersStore();

const handleSubmit = async () => {
    /*     if (!orderRef.value.title) {
            toast.error('Veuillez remplir tous les champs');
            return;
        }
     */
    try {
        await ordersStore.createOrder(orderRef.value);
        toast.success(props.edit ? 'Order modifié avec succès' : 'Order ajouté avec succès');
        $emit('close');
        /* await ordersStore.fetchOrders(); */
        router.push({ name: 'orders' });
    } catch (error) {
        toast.error(props.edit ? 'Erreur lors de la modification' : "Erreur lors de l'ajout");
    }
};
</script>

<template>
    <form class="flex flex-col gap-5" @submit.prevent="handleSubmit">
        <footer class="flex justify-end gap-2">
            <ButtonElement @click="$emit('close')">Annuler</ButtonElement>
            <ButtonElement primary type="submit">{{ okText }}</ButtonElement>
        </footer>
    </form>
</template>