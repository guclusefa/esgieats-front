<script setup lang="ts">
import type { Delivery } from '@/types/Delivery';
import { useDeliveriesStore } from '@/stores/deliveries';
import { toast } from 'vue3-toastify';

const props = defineProps<{
  delivery: Delivery;
}>();

const deliveriesStore = useDeliveriesStore();

async function closeCurrentDelivery() {
  try {
    await deliveriesStore.closeDelivery(props.delivery.id);
    toast.success('Livraison fermée avec succès !');
  } catch (e) {
    console.error('Échec de la fermeture de la livraison', e);
  }
}

async function updateStatus(newStatus: string) {
  try {
    await deliveriesStore.updateDeliveryStatus(props.delivery.id, newStatus);
    props.delivery.delivery_status = newStatus; // Optimistic UI update
    toast.success('Statut de la livraison mis à jour avec succès !');
  } catch (e) {
    console.error('Échec de la mise à jour du statut', e);
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}
</script>

<template>
  <div class="p-4 rounded-2xl shadow-md bg-white hover:shadow-lg transition space-y-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-semibold">Livraison #{{ delivery.id }}</h2>
      <span class="text-xs px-2 py-1 rounded-full" :class="{
        'bg-yellow-100 text-yellow-800': delivery.delivery_status === 'en_attente',
        'bg-blue-100 text-blue-800': delivery.delivery_status === 'en_cours',
        'bg-green-100 text-green-800': delivery.delivery_status === 'livree',
        'bg-red-100 text-red-800': delivery.delivery_status === 'echouee'
      }">
        {{ delivery.delivery_status }}
      </span>
    </div>

    <div class="text-sm text-gray-600">
      <p><strong>Client ID :</strong> {{ delivery.delivery_person_id }}</p>
      <p><strong>Créée le :</strong> {{ formatDate(delivery.created_at) }}</p>
    </div>

    <!-- Status Update Dropdown (only visible if not closed) -->
    <div v-if="delivery.delivery_status !== 'livree' && delivery.delivery_status !== 'echouee'" class="pt-2">
      <label for="delivery_status-select" class="block text-sm font-semibold text-gray-700">Mettre à jour le statut :</label>
      <select
        id="delivery_status-select"
        v-model="delivery.delivery_status"
        @change="updateStatus(delivery.delivery_status)"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="en_attente">En Attente</option>
        <option value="en_cours">En Cours</option>
        <option value="livree">Livrée</option>
        <option value="echouee">Échouée</option>
      </select>
    </div>

    <!-- Close Delivery Button -->
    <div class="flex gap-2 pt-2" v-if="delivery.delivery_status !== 'livree' && delivery.delivery_status !== 'echouee'">
      <button @click="closeCurrentDelivery" class="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300">
        Fermer
      </button>
    </div>
  </div>
</template>
