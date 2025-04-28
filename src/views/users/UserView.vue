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
        try {
            usersStore.resetUser();
            menuItemsStore.resetMenuItems();
            await usersStore.fetchUser(params.id);
            await menuItemsStore.fetchMenuItems(params.id);
        } catch (error) {
            toast.error("Erreur lors du chargement du user ou du menu.");
        }
    }
});
</script>

<template>
    <WrapperElement>
        <template v-if="usersStore.user.id">
            <SectionElement :title="`${usersStore.user.firstname}`">
                <template #content>
                    <UserCard :user="usersStore.user" />
                </template>
            </SectionElement>

            <SectionElement title="Menu">
                <template #content>
                    <MenuItemList :menuItems="menuItemsStore.menuItems" />
                </template>
            </SectionElement>
        </template>
        <SpinnerElement v-else />
    </WrapperElement>
</template>