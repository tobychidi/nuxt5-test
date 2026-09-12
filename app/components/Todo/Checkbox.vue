<script lang="ts" setup>
const checked = defineModel<boolean>();
</script>
<template>
   <button
      class="flex aspect-square w-6 cursor-pointer items-center justify-center rounded-full border border-primary-600 text-white shadow-sm"
      :class="{
         'bg-primary-600': checked,
      }"
      @click="checked = !checked">
      <Icon v-if="checked" name="ph:check-bold" />
   </button>
</template>
