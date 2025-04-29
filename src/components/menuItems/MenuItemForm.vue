<script setup lang="ts">
import InputElement from '@/components/elements/InputElement.vue';
import InputgroupElement from '@/components/elements/InputgroupElement.vue';
import LabelElement from '@/components/elements/LabelElement.vue';
import SelectElement from '@/components/elements/SelectElement.vue';
import { useMenuItemsStore } from '@/stores/menuItems';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import ButtonElement from '../elements/ButtonElement.vue';
import type { MenuItem } from '@/types/MenuItem';
import { useAuthStore } from '@/stores/auth';

const useAuth = useAuthStore();
let loggedUser: any = null;
if (useAuth.user) {
    loggedUser = useAuth.user;
}

const router = useRouter();
const props = defineProps({
    menuItem: {
        type: Object as () => MenuItem,
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

const menuItemRef = ref<MenuItem>({
    id: '0',
    restaurant_id: props.restaurantId,
    name: '',
    description: '',
    price: 0,
    available: true,
    created_at: new Date().toISOString()
});

if (props.menuItem) {
    menuItemRef.value = JSON.parse(JSON.stringify(props.menuItem));
}

const menuItemsStore = useMenuItemsStore();

const $emit = defineEmits(['close']);

const handleSubmit = async () => {
    if (!menuItemRef.value.name || !menuItemRef.value.description || !menuItemRef.value.price) {
        toast.error('Veuillez remplir tous les champs');
        return;
    }
    try {
        if (props.edit && menuItemRef.value.id) {
            await menuItemsStore.updateMenuItem(menuItemRef.value);
        } else {
            await menuItemsStore.createMenuItem(menuItemRef.value);
        }

        toast.success(props.edit ? 'Item modifié avec succès' : 'SignalemItement ajouté avec succès');
        $emit('close');
        await menuItemsStore.fetchMenuItems(props.restaurantId);
        router.push({ name: 'signalements' });
    } catch (error) {
        toast.error(props.edit ? 'Erreur lors de la modification' : "Erreur lors de l'ajout");
    }
};
</script>

<template>
    <form class="flex flex-col gap-5" @submit.prevent="handleSubmit">
        <InputgroupElement>
            <template #label>
                <LabelElement>Nom</LabelElement>
            </template>
            <template #input>
                <InputElement v-model="menuItemRef.name" type="text" placeholder="Nom de l'item" required />
            </template>
        </InputgroupElement>
        <InputgroupElement>
            <template #label>
                <LabelElement>Description</LabelElement>
            </template>
            <template #input>
                <InputElement v-model="menuItemRef.description" type="text" placeholder="Description de l'item"
                    required />
            </template>
        </InputgroupElement>
        <InputgroupElement>
            <template #label>
                <LabelElement>Prix</LabelElement>
            </template>
            <template #input>
                <InputElement v-model="menuItemRef.price" type="number" placeholder="Prix de l'item" required />
            </template>
        </InputgroupElement>
        <InputgroupElement>
            <template #label>
                <LabelElement>Disponibilité</LabelElement>
            </template>
            <template #input>
                <SelectElement v-model="menuItemRef.available"
                    :options="[{ value: true, label: 'Disponible' }, { value: false, label: 'Indisponible' }]" />
            </template>
        </InputgroupElement>
        <footer class="flex justify-end gap-2 items-center justify-between">
            <div class="flex gap-2">
                <ButtonElement @click="$emit('close')">Annuler</ButtonElement>
                <ButtonElement primary type="submit">{{ okText }}</ButtonElement>
            </div>
        </footer>
    </form>
</template>