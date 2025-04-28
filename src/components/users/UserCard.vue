<script setup lang="ts">
import type { User } from '@/types/User';

const props = defineProps<{
    user: User;
}>();
</script>

<template>
    <RouterLink :to="{ name: 'user', params: { id: props.user.id } }" class="block">
        <div class="p-4 rounded-2xl shadow-md bg-white hover:shadow-lg transition">
            <div class="mb-2">
                <h2 class="text-lg font-semibold">{{ user.firstname }} {{ user.lastname }}</h2>
                <p class="text-sm text-gray-500">{{ user.role }}</p>
            </div>
            <div class="text-sm text-gray-700 space-y-1">
                <p><strong>Email:</strong> {{ user.email }}</p>
                <p><strong>Phone:</strong> {{ user.phone }}</p>
                <p><strong>Address:</strong> {{ user.adress }}</p>
            </div>
        </div>
    </RouterLink>
</template>
