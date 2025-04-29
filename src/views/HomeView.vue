<script setup lang="ts">
import SpinnerElement from '@/components/elements/SpinnerElement.vue';
import WrapperElement from '@/components/elements/WrapperElement.vue';
import UserList from '@/components/users/UserList.vue';
import { useAuthStore } from '@/stores/auth';
import { useUsersStore } from '@/stores/users';
import { onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';

const loading = ref(false);
const usersStore = useUsersStore();
const useAuth = useAuthStore();

let loggedUser: any = null;
if (useAuth.user) {
  loggedUser = useAuth.user;
}

onMounted(async () => {
  if (!usersStore.users.length) {
    try {
      loading.value = true;
      await usersStore.fetchUsers();
    } catch (error) {
      toast.error('Erreur lors du chargement des restaurants.');
    } finally {
      loading.value = false;
    }
  }
});
</script>

<template>
  <!-- Hero Section -->
  <div class="bg-gradient-to-r from-primary-lightest to-primary-darkest text-white py-20">
    <div class="container mx-auto text-center px-4">
      <h1 class="text-5xl md:text-7xl font-extrabold mb-4">🍔 EsgEats</h1>
      <p class="text-xl md:text-2xl mb-8">Vos restaurants préférés, livrés chez vous en un rien de temps.</p>
      <div class="flex justify-center gap-4">
        <RouterLink to="/users">
          <button
            class="bg-white text-primary-darkest font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition">
            Explorer les restaurants
          </button>
        </RouterLink>
        <RouterLink to="/register" v-if="!loggedUser">
          <button
            class="border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-primary-darkest transition">
            Devenir partenaire
          </button>
        </RouterLink>
      </div>
      <WrapperElement>
        <SpinnerElement large v-if="loading" />
        <UserList :users="usersStore.users" v-else />
      </WrapperElement>
    </div>
  </div>

  <!-- Features Section -->
  <section class="bg-white py-16 text-gray-800">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">Pourquoi choisir EsgEats ?</h2>
      <div class="grid md:grid-cols-3 gap-8 text-center">
        <div>
          <div class="text-5xl mb-4">🚀</div>
          <h3 class="text-xl font-semibold mb-2">Livraison rapide</h3>
          <p>Recevez vos repas chauds en moins de 30 minutes, où que vous soyez.</p>
        </div>
        <div>
          <div class="text-5xl mb-4">🍱</div>
          <h3 class="text-xl font-semibold mb-2">Large choix</h3>
          <p>Accédez à une sélection variée de restaurants et de cuisines du monde entier.</p>
        </div>
        <div>
          <div class="text-5xl mb-4">💳</div>
          <h3 class="text-xl font-semibold mb-2">Paiement sécurisé</h3>
          <p>Payer facilement en ligne avec des méthodes sécurisées et fiables.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- How it works -->
  <section class="bg-gray-100 py-16 text-gray-800">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">Comment ça marche ?</h2>
      <div class="grid md:grid-cols-3 gap-8 text-center">
        <div>
          <div class="text-5xl mb-4">📱</div>
          <h3 class="text-xl font-semibold mb-2">1. Commandez</h3>
          <p>Choisissez votre restaurant et commandez depuis votre téléphone ou votre ordinateur.</p>
        </div>
        <div>
          <div class="text-5xl mb-4">👨‍🍳</div>
          <h3 class="text-xl font-semibold mb-2">2. Préparation</h3>
          <p>Le restaurant prépare votre commande avec soin et rapidité.</p>
        </div>
        <div>
          <div class="text-5xl mb-4">🛵</div>
          <h3 class="text-xl font-semibold mb-2">3. Livraison</h3>
          <p>Un livreur la dépose chez vous ou au bureau en quelques minutes.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section class="bg-white py-16 text-gray-800">
    <div class="container mx-auto px-4 text-center max-w-3xl">
      <h2 class="text-3xl font-bold mb-6">À propos de EsgEats</h2>
      <p class="text-lg">
        EsgEats est une plateforme de livraison de repas locale créée pour connecter les
        Grenoblois à leurs restaurants préférés. Nous croyons en la simplicité, la rapidité,
        et la qualité de service. Notre mission ? Vous faire gagner du temps, tout en soutenant
        vos commerces de proximité.
      </p>
    </div>
  </section>
</template>
