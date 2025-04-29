<script setup lang="ts">
import ButtonElement from '@/components/elements/ButtonElement.vue';
import ModalElement from '@/components/elements/ModalElement.vue';
import { ref } from 'vue';
import MenuItemForm from './MenuItemForm.vue';
import type { MenuItem } from '@/types/MenuItem';
const showModal = ref(false);

// menuItem prop
defineProps({
    menuItem: {
        type: Object as () => MenuItem,
        required: true
    },
    restaurantId: {
        type: String,
        required: true
    }
});

function toggleModal() {
    showModal.value = !showModal.value;
}
</script>

<template>
    <ButtonElement primary @click="toggleModal">Modifier</ButtonElement>
    <ModalElement v-if="showModal" @close="toggleModal" title="Modification d'un item">
        <MenuItemForm @close="toggleModal" :menuItem="menuItem" :okText="'Modifier'" edit
            :restaurantId="restaurantId" />
    </ModalElement>
</template>