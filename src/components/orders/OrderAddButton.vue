<script setup lang="ts">
import ButtonElement from '@/components/elements/ButtonElement.vue';
import ModalElement from '@/components/elements/ModalElement.vue';
import { ref } from 'vue';
import OrderForm from './OrderForm.vue';
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
  <ButtonElement primary @click="toggleModal">Passer une commande</ButtonElement>
  <ModalElement v-if="showModal" title="Passer une commande" @close="toggleModal">
    <OrderForm @close="toggleModal" :okText="'Ajouter'" :restaurantId="props.restaurantId" />
  </ModalElement>
</template>