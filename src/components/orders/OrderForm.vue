<script setup lang="ts">
import InputElement from '@/components/elements/InputElement.vue';
import InputgroupElement from '@/components/elements/InputgroupElement.vue';
import LabelElement from '@/components/elements/LabelElement.vue';
import SelectElement from '@/components/elements/SelectElement.vue';
import { useOrdersStore } from '@/stores/orders';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import ButtonElement from '../elements/ButtonElement.vue';
import type { Order } from '@/types/Order';
import { useAuthStore } from '@/stores/auth';
import { useMenuItemsStore } from '@/stores/menuItems';

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
    },
    restaurantId: {
        type: String,
        required: true
    }
});

const orderRef = ref<Object>({
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
        // create a new order from the orderRef object
        let order = {
            ...orderRef.value,
            client_id: loggedUser.id,
            order_status: 'en_attente',
            menu_items: selectedItems.value
        };

        await ordersStore.createOrder(order);
        toast.success(props.edit ? 'Order modifié avec succès' : 'Order ajouté avec succès');
        $emit('close');
        /* await ordersStore.fetchOrders(); */
        router.push({ name: 'orders' });
    } catch (error) {
        toast.error(props.edit ? 'Erreur lors de la modification' : "Erreur lors de l'ajout");
    }
};

const menuItemsStore = useMenuItemsStore();
onMounted(async () => {
    if (!menuItemsStore.menuItems.length) {
        try {
            await menuItemsStore.fetchMenuItems(props.restaurantId);
        } catch (error) {
            toast.error('Erreur lors du chargement des menu du restaurant ' + props.restaurantId);
        }
    }
});

const selectedItems = ref<string[]>(['']); // array of menu item IDs, allow duplicates

const addItem = () => {
    selectedItems.value.push('');
};

const removeItem = (index: number) => {
    if (selectedItems.value.length > 1) {
        selectedItems.value.splice(index, 1);
    }
};

const totalPrice = computed(() => {
    return selectedItems.value.reduce((total, itemId) => {
        const item = menuItemsStore.menuItems.find(mi => mi.id === itemId);
        return item ? total + (item.price || 0) : total;
    }, 0);
});
</script>

<template>
    <form class="flex flex-col gap-5" @submit.prevent="handleSubmit">
        <div class="flex flex-col gap-4">
            <div v-for="(item, index) in selectedItems" :key="index" class="flex items-center gap-2">
                <SelectElement v-model="selectedItems[index]"
                    :options="menuItemsStore.menuItems.map(item => ({ label: item.name, value: item.id }))"
                    placeholder="Choisir un menu" />
                <button type="button" @click="removeItem(index)" class="text-red-500 hover:underline">
                    Supprimer
                </button>
            </div>
            <button type="button" @click="addItem" class="text-blue-500 hover:underline self-start">
                + Ajouter un menu
            </button>
        </div>

        <footer class="flex justify-end gap-2 items-center justify-between">
            <div class="font-semibold">
                Total: {{ totalPrice.toFixed(2) }} €
            </div>
            <div class="flex gap-2">
                <ButtonElement @click="$emit('close')">Annuler</ButtonElement>
                <ButtonElement primary type="submit">{{ okText }}</ButtonElement>
            </div>
        </footer>
    </form>
</template>