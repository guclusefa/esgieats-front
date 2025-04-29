<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>

<template>
  <section class="p-6 bg-white dark:bg-black-lightend shadow-md dark:shadow-lg rounded-lg space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-lightest to-primary-darkest dark:from-primary-darkest dark:to-primary-lightest">
        {{ props.title }}
      </h1>
      <slot name="actions" />
    </div>

    <!-- Slot for content, ensuring spacing between elements -->
    <div class="mt-4">
      <slot name="content" />
    </div>
  </section>
</template>

<style scoped>
/* Additional custom styles can be added here */
</style>
