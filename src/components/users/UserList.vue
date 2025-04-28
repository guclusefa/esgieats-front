<script setup lang="ts">
import type { User } from '@/types/User';
import UserCard from './UserCard.vue';

const props = defineProps({
  users: {
    type: Array as () => User[],
    required: true
  }
});
</script>

<template>
  <section>
    <p class="text-sm text-gray mb-4">{{ users.length }} élèment(s)</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <UserCard v-for="user in users" :key="user.id" :user="user" />
    </div>
  </section>
</template>