<script lang="ts" setup>
const checked = defineModel<boolean>();
</script>
<template>
   <button class="debug p-4" @click="checked = !checked">
      <div
         class="flex aspect-square w-6 cursor-pointer items-center justify-center rounded-full border border-primary-600 text-white shadow-sm"
         :class="{
            'bg-primary-600': checked,
         }">
         <Icon v-if="checked" name="ph:check-bold" />
      </div>
   </button>
</template>
