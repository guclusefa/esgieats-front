<script setup lang="ts">
import SectionElement from '@/components/elements/SectionElement.vue';
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
            await usersStore.fetchusers();
        } catch (error) {
            toast.error('Erreur lors du chargement des restaurants.');
        } finally {
            loading.value = false;
        }
    }
});
</script>

<template>
    <WrapperElement>
        <SectionElement title="Restaurants">
            <template #content>
                <SpinnerElement large v-if="loading" />
                <UserList :users="usersStore.users" v-else />
            </template>
        </SectionElement>
    </WrapperElement>
</template>