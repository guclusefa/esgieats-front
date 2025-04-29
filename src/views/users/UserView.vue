<script setup lang="ts">
import SectionElement from '@/components/elements/SectionElement.vue';
import SpinnerElement from '@/components/elements/SpinnerElement.vue';
import WrapperElement from '@/components/elements/WrapperElement.vue';
import UserCard from '@/components/users/UserCard.vue';
import { useUsersStore } from '@/stores/users';
import { useMenuItemsStore } from '@/stores/menuItems';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import MenuItemList from '@/components/menuItems/MenuItemList.vue';
import { useAuthStore } from '@/stores/auth';
import OrderAddButton from '@/components/orders/OrderAddButton.vue';

const useAuth = useAuthStore();
let loggedUser: any = null;
if (useAuth.user) {
    loggedUser = useAuth.user;
}

const router = useRouter();
const params = router.currentRoute?.value.params;

const usersStore = useUsersStore();
const menuItemsStore = useMenuItemsStore();

let isUserMe = ref(false);

onMounted(async () => {
    if (typeof params.id === 'string') {
        usersStore.resetUser();
        menuItemsStore.resetMenuItems();

        try {
            await usersStore.fetchUser(params.id);
        } catch (error) {
            toast.error("Erreur lors du chargement de l'utilisateur.");
        }

        try {
            await menuItemsStore.fetchMenuItems(params.id);
        } catch (error) {
            toast.error("Erreur lors du chargement du menu.");
        }

        if (usersStore.user.id === loggedUser.id) {
            isUserMe.value = true;
        } else {
            isUserMe.value = false;
        }
    }
});

</script>

<template>
    <WrapperElement>
        <template v-if="usersStore.user.id">
            <UserCard :user="usersStore.user" />
            <SectionElement title="Menu" class="mt-5">
                <template #actions
                    v-if="loggedUser && (loggedUser.role === 'client' || loggedUser.role === 'admin') && !isUserMe">
                    <OrderAddButton :restaurantId="usersStore.user.id" />
                </template>
                <template #content>
                    <MenuItemList :menuItems="menuItemsStore.menuItems" />
                </template>
            </SectionElement>
        </template>
        <SpinnerElement v-else />
    </WrapperElement>
</template>