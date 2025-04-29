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
  <div class="bg-gradient-to-r from-primary-lightest to-primary-darkest text-white py-20">
    <div class="container mx-auto text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-4">EsgEats</h1>
      <p class="text-lg md:text-2xl mb-8">
        Bienvenue EsgEats
      </p>
    </div>
  </div>

  <WrapperElement>
    <SpinnerElement large v-if="loading" />
    <UserList :users="usersStore.users" v-else />
  </WrapperElement>
</template>
