<script setup lang="ts">
import SectionElement from '@/components/elements/SectionElement.vue';
import SpinnerElement from '@/components/elements/SpinnerElement.vue';
import WrapperElement from '@/components/elements/WrapperElement.vue';
import UserCard from '@/components/users/UserCard.vue';
import { useUsersStore } from '@/stores/users';
import { useMenuItemsStore } from '@/stores/menuItems';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import MenuItemList from '@/components/menuItems/MenuItemList.vue';

const router = useRouter();
const params = router.currentRoute?.value.params;

const usersStore = useUsersStore();
const menuItemsStore = useMenuItemsStore();

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
    }
});

</script>

<template>
    <WrapperElement>
        <template v-if="usersStore.user.id">
            <UserCard :user="usersStore.user" />

            <SectionElement title="Menu" class="mt-5">
                <template #content>
                    <MenuItemList :menuItems="menuItemsStore.menuItems" />
                </template>
            </SectionElement>
        </template>
        <SpinnerElement v-else />
    </WrapperElement>
</template>