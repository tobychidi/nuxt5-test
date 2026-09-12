<script setup lang="ts">
import { ScrollArea } from "@ark-ui/vue";
</script>

<template>
   <div class="min-h-screen space-y-8 py-8 pt-20">
      <header class="flex flex-col items-center">
         <div class="flex gap-1 text-6xl">
            <TodoLogoIcon class="w-14" />
            <h1 class="">Todo</h1>
         </div>
      </header>
      <main class="flex flex-col items-center">
         <div class="w-full max-w-xl space-y-10">
            <TodoList />
            <TodoList title="Completed Tasks" collapsible />
            <TodoList title="Trash" collapsible collapse />
         </div>
      </main>
   </div>
</template>
