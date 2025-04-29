<script setup lang="ts">
import type { User } from '@/types/User';

const props = defineProps<{
    user: User;
}>();
</script>

<template>
    <RouterLink :to="{ name: 'user', params: { id: props.user.id } }" class="block group">
        <div class="p-6 bg-white rounded-2xl shadow hover:shadow-xl transition-shadow duration-300">
            <div class="mb-4">
                <h2 class="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {{ user.firstname }} {{ user.lastname }}
                </h2>
                <p class="text-sm text-gray-400 capitalize">{{ user.role }}</p>
            </div>

            <div class="text-sm text-gray-700 space-y-1">
                <p>
                    <span class="font-medium text-gray-600">📞 Tél :</span> {{ user.phone }}
                </p>
                <p>
                    <span class="font-medium text-gray-600">🏠 Adresse :</span> {{ user.adress }}
                </p>
            </div>

            <div class="mt-6 text-xs text-gray-400">
                🕒 Membre depuis le {{ new Date(user.created_at).toLocaleDateString() }}
            </div>
        </div>
    </RouterLink>
</template>
