<script setup lang="ts">
import type { Order } from '@/types/Order';
import { useOrdersStore } from '@/stores/orders';
import { toast } from 'vue3-toastify';

const props = defineProps<{
  order: Order;
}>();

const ordersStore = useOrdersStore();

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

async function closeCurrentOrder() {
  try {
    await ordersStore.closeOrder(props.order.id);
    toast.success('Commande fermée avec succès !');
  } catch (e) {
    console.error('Échec de la fermeture de la commande', e);
  }
}

async function updateStatus(newStatus: string) {
  try {
    await ordersStore.updateOrderStatus(props.order.id, newStatus);
    props.order.order_status = newStatus; // Optimistic UI update
    toast.success('Statut de la commande mis à jour avec succès !');
  } catch (e) {
    console.error('Échec de la mise à jour du statut', e);
  }
}
</script>

<template>
  <div class="p-4 rounded-2xl shadow-md bg-white hover:shadow-lg transition space-y-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-semibold">Commande #{{ order.id }}</h2>
      <span class="text-xs px-2 py-1 rounded-full" :class="{
        'bg-yellow-100 text-yellow-800': order.order_status === 'en_attente',
        'bg-blue-100 text-blue-800': order.order_status === 'en_preparation',
        'bg-orange-100 text-orange-800': order.order_status === 'pret',
        'bg-purple-100 text-purple-800': order.order_status === 'en_livraison',
        'bg-green-100 text-green-800': order.order_status === 'livre',
        'bg-red-100 text-red-800': order.order_status === 'annule'
      }">
        {{ order.order_status }}
      </span>
    </div>

    <div class="text-sm text-gray-600">
      <p><strong>Client ID :</strong> {{ order.client_id }}</p>
      <p><strong>Créée le :</strong> {{ formatDate(order.created_at) }}</p>
    </div>

    <div class="mt-4">
      <h3 class="text-md font-semibold">Articles Commandés :</h3>
      <ul class="list-disc pl-5">
        <li v-for="item in order.items" :key="item.menu_item_id" class="py-1">
          <p><strong>Menu Item ID:</strong> {{ item.menu_item_id }}</p>
          <p><strong>Quantité:</strong> {{ item.quantity }}</p>
          <p><strong>Statut:</strong> 
            <span :class="{
              'text-blue-600': item.item_status === 'en_preparation',
              'text-green-600': item.item_status === 'pret',
              'text-yellow-600': item.item_status === 'en_attente',
            }">
              {{ item.item_status }}
            </span>
          </p>
        </li>
      </ul>
    </div>

    <!-- Status Update Dropdown (only visible if not closed) -->
    <div v-if="order.order_status !== 'livre' && order.order_status !== 'annule'" class="pt-2">
      <label for="status-select" class="block text-sm font-semibold text-gray-700">Mettre à jour le statut :</label>
      <select
        id="status-select"
        v-model="order.order_status"
        @change="updateStatus(order.order_status)"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="en_attente">En Attente</option>
        <option value="en_preparation">En Préparation</option>
        <option value="pret">Prêt</option>
        <option value="en_livraison">En Livraison</option>
        <option value="livre">Livré</option>
        <option value="annule">Annulé</option>
      </select>
    </div>

    <!-- Close Order Button -->
    <div class="flex gap-2 pt-2" v-if="order.order_status !== 'livre' && order.order_status !== 'annule'">
      <button @click="closeCurrentOrder" class="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300">
        Fermer
      </button>
    </div>
  </div>
</template>
