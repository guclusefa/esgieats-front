<script setup lang="ts">
import type { Order } from '@/types/Order';
import { useOrdersStore } from '@/stores/orders';
import { toast } from 'vue3-toastify';
import { useAuthStore } from '@/stores/auth';
import { getMenuItemNameById, getMenuItemPriceById, getRestaurantNameByMenuItemId, getUserById } from '@/utils/menuItems';
import { onMounted, ref } from 'vue';

const useAuth = useAuthStore();
let loggedUser: any = null;
if (useAuth.user) {
  loggedUser = useAuth.user;
}

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
    await ordersStore.updateOrderStatus(props.order.id, newStatus, loggedUser.id);
    props.order.order_status = newStatus;
    toast.success('Statut de la commande mis à jour avec succès !');
  } catch (e) {
    console.error('Échec de la mise à jour du statut', e);
  }
}

const menuItemNames = ref<Record<string, string>>({});
const restaurantName = ref<string>('Chargement...');
const deliveryPersonName = ref<string>('Chargement...');
const totalPrice = ref(0);

onMounted(async () => {
  let total = 0;

  for (const item of props.order.items) {
    const name = await getMenuItemNameById(item.menu_item_id);
    const price = await getMenuItemPriceById(item.menu_item_id);

    let label = name ?? 'Inconnu';

    if (price != null) {
      label += ` - ${price} €`;
      total += price * item.quantity;
    }

    menuItemNames.value[item.menu_item_id] = label;
  }

  totalPrice.value = total;

  if (props.order.items.length > 0) {
    const firstItemId = props.order.items[0].menu_item_id;
    const name = await getRestaurantNameByMenuItemId(firstItemId);
    restaurantName.value = name ?? 'Restaurant inconnu';
  }

  if (props.order.delivery_person_id) {
    const name = await getUserById(props.order.delivery_person_id);
    deliveryPersonName.value = name ?? 'Livreur inconnu';
  }
});

</script>

<template>
  <div
    class="p-6 rounded-2xl shadow-lg bg-white dark:bg-black-lightend hover:shadow-xl transition-all space-y-4 border border-gray-100">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h2
        class="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-lightest to-primary-darkest dark:from-primary-darkest dark:to-primary-lightest group-hover:from-primary-lightest group-hover:to-primary-darkest transition-colors">
        Commande #{{ order.id }}
      </h2>
      <span class="text-xs font-semibold px-3 py-1 rounded-full capitalize" :class="{
        'bg-yellow-100 text-yellow-800': order.order_status === 'en_attente',
        'bg-blue-100 text-blue-800': order.order_status === 'en_preparation',
        'bg-orange-100 text-orange-800': order.order_status === 'pret',
        'bg-purple-100 text-purple-800': order.order_status === 'en_livraison',
        'bg-green-100 text-green-800': order.order_status === 'livre',
        'bg-red-100 text-red-800': order.order_status === 'annule'
      }">
        {{ order.order_status.replace('_', ' ') }}
      </span>
    </div>

    <!-- Client Info -->
    <div class="text-sm text-gray-600 space-y-1">
      <p><span class="font-medium text-gray-700">Faite le :</span> {{ formatDate(order.created_at) }}</p>
    </div>

    <p class="text-sm text-gray-600">
      <span class="font-medium text-gray-700">Restaurant :</span> {{ restaurantName }}
    </p>

    <!-- Delivery Info (conditionally displayed) -->
    <div v-if="['en_livraison', 'livre', 'annule'].includes(order.order_status)"
      class="text-sm text-gray-600 space-y-1">
      <p class="text-sm text-gray-600" v-if="order.delivery_person_id">
        <span class="font-medium text-gray-700">Livreur :</span> {{ deliveryPersonName }}
      </p>
      <p v-if="order.pickup_time">
        <span class="font-medium text-gray-700">Heure de prise en charge :</span> {{ formatDate(order.pickup_time) }}
      </p>
      <p v-if="order.order_status === 'livre' && order.delivery_time">
        <span class="font-medium text-gray-700">Heure de livraison :</span> {{ formatDate(order.delivery_time) }}
      </p>
    </div>

    <!-- Divider -->
    <div class="border-t border-gray-200 dark:border-gray-700"></div>

    <!-- Items -->
    <div>
      <h3 class="text-md font-semibold text-gray-800 mb-2">Articles Commandés</h3>
      <ul class="space-y-2">
        <li v-for="item in order.items" :key="item.menu_item_id"
          class="p-2 bg-gray-50 rounded-md border text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300">
          <p><strong>Item:</strong> {{ menuItemNames[item.menu_item_id] || 'Chargement...' }}</p>
          <p><strong>Quantité:</strong> {{ item.quantity }}</p>
        </li>
      </ul>
      <!-- Total général -->
      <p class="mt-4 text-right text-sm font-semibold text-gray-800 dark:text-gray-200">
        Total de la commande : {{ totalPrice.toFixed(2) }} €
      </p>
    </div>

    <!-- Status and Close Buttons for Delivery Person -->
    <template v-if="loggedUser.role === 'livreur'">
      <!-- Status Dropdown -->
      <div v-if="order.order_status !== 'livre' && order.order_status !== 'annule'" class="space-y-2">
        <label for="status-select" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">Mettre à jour le
          statut :</label>
        <select id="status-select" v-model="order.order_status" @change="updateStatus(order.order_status)"
          class="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-primary-500 focus:border-primary-500 text-sm border">
          <option value="en_attente">En Attente</option>
          <option value="en_livraison">En Livraison</option>
          <option value="livre">Livré</option>
          <option value="annule">Annulé</option>
        </select>
      </div>

      <!-- Close Button -->
      <!-- <div v-if="order.order_status !== 'livre' && order.order_status !== 'annule'" class="pt-2">
        <button @click="closeCurrentOrder"
          class="w-full py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 text-sm font-medium"
          v-if="order.order_status !== 'en_attente' && order.order_status !== 'en_preparation'">
          Fermer la commande
        </button>
      </div> -->
    </template>
  </div>
</template>

<style scoped>
/* Additional custom styles for this component */
</style>
