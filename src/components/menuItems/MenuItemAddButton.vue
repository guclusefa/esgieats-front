<script setup lang="ts">
import ButtonElement from '@/components/elements/ButtonElement.vue';
import ModalElement from '@/components/elements/ModalElement.vue';
import { ref } from 'vue';
import MenuItemForm from './MenuItemForm.vue';
const showModal = ref(false);
function toggleModal() {
  showModal.value = !showModal.value;
}

const props = defineProps({
  restaurantId: {
    type: String,
    required: true
  }
});
</script>

<template>
  <ButtonElement primary @click="toggleModal">Ajouter un item</ButtonElement>
  <ModalElement v-if="showModal" title="Ajouter un item" @close="toggleModal">
    <MenuItemForm @close="toggleModal" :okText="'Ajouter'" :restaurantId="props.restaurantId" />
  </ModalElement>
</template>