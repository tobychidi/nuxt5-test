<script lang="ts" setup>
import { Collapsible } from "@ark-ui/vue/collapsible";

const props = defineProps<{
   title?: string;
   collapsible?: boolean;
   collapse?: boolean;
}>();

const open = ref(!props.collapse);
</script>
<template>
   <div class="flex flex-col items-center gap-4">
      <template v-if="title">
         <h2 class="font-medium">
            <template v-if="collapsible">
               <button
                  class="flex items-center justify-between gap-2"
                  @click="open = !open">
                  {{ title }}
                  <Icon name="ph:caret-down" :class="{ 'rotate-180': open }" />
               </button>
            </template>

            <template v-else>{{ title }}</template>
         </h2>
      </template>

      <Collapsible.Root v-model:open="open" class="w-full">
         <Collapsible.Content
            class="overflow-clip p-2 py-6 data-[state=closed]:animate-[collapse-height_150ms_ease-out,fade-out_150ms_ease-out] data-[state=open]:animate-[expand-height_150ms_ease-out,fade-in_150ms_ease-out]">
            <div class="space-y-4">
               <TodoItem />
               <TodoItem />
            </div>
         </Collapsible.Content>
      </Collapsible.Root>
   </div>
</template>
