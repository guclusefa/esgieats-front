<script setup lang="ts">
import SectionElement from '@/components/elements/SectionElement.vue';
import SpinnerElement from '@/components/elements/SpinnerElement.vue';
import WrapperElement from '@/components/elements/WrapperElement.vue';
import UserCard from '@/components/users/UserCard.vue';
import { useUsersStore } from '@/stores/users';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const router = useRouter();
const params = router.currentRoute?.value.params;

const usersStore = useUsersStore();

onMounted(async () => {
    if (typeof params.id === 'string') {
        try {
            // delete previous to avoid flickering
            usersStore.resetUser();
            await usersStore.fetchUser(params.id);
        } catch (error) {
            toast.error("Erreur lors du chargement du user.");
        }
    }
});
</script>

<template>
    <WrapperElement>
        <template v-if="usersStore.user.id">
            <SectionElement :title="`${usersStore.user.firstname} ${usersStore.user.lastname}`" :description="`Détails de l'utilisateur ${usersStore.user.firstname} ${usersStore.user.lastname}`">
                <template #content>
                    <UserCard :user="usersStore.user" />
                </template>
            </SectionElement>
        </template>
        <SpinnerElement v-else />
    </WrapperElement>
</template>