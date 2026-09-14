<script lang="ts" setup>
import { Field } from "@ark-ui/vue";

const value = defineModel<string>();
</script>
<template>
   <Field.Root class="w-full">
      <Field.Input v-model="value" class="w-full outline-none" />
   </Field.Root>
</template>
