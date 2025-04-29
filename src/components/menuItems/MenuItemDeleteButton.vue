<script setup lang="ts">
import ButtonElement from '@/components/elements/ButtonElement.vue';
import ModalElement from '@/components/elements/ModalElement.vue';
import router from '@/router';
import { useMenuItemsStore } from '@/stores/menuItems';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import type { MenuItem } from '@/types/MenuItem';
const props = defineProps({
    menuItem: {
        type: Object as () => MenuItem,
        required: true
    }
});
const showModal = ref(false);
function toggleModal() {
    showModal.value = !showModal.value;
}

const menuItemsStore = useMenuItemsStore();

function deleteMenuItem() {
    if (!props.menuItem.id) return;

    try {
        // Delete menuItem from the store
        menuItemsStore.deleteMenuItem(props.menuItem.id);
        // Close the modal
        toggleModal();
        // Show success message
        toast.success('Le item a été supprimé avec succès');
    } catch (error) {
        toast.error('Une erreur est survenue lors de la suppression du item');
    }
}
</script>

<template>
    <ButtonElement danger @click="toggleModal">Supprimer</ButtonElement>
    <ModalElement v-if="showModal" @close="toggleModal" title="Suppression d'un produit">
        <div>
            <p>
                Êtes-vous sûr de vouloir supprimer le produit <b>{{ menuItem.id }} ?</b>
            </p>
            <footer class="flex justify-end gap-2">
                <ButtonElement @click="toggleModal">Annuler</ButtonElement>
                <ButtonElement danger type="submit" @click="deleteMenuItem">Supprimer</ButtonElement>
            </footer>
        </div>
    </ModalElement>
</template>