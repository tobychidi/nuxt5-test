<script setup lang="ts">
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/vue";

const { state } = provideTodoContext();

const store = new AppStore("todo-store");

function handleDragEnd(event: DragEndEvent) {
   console.log(event.operation.source);
}
</script>

<template>
   <div class="min-h-screen space-y-8 p-2 py-8 pt-20">
      <header class="flex flex-col items-center">
         <div class="flex gap-1 text-6xl">
            <TodoLogoIcon class="w-14" />
            <h1 class="">Todo</h1>
         </div>
      </header>
      <main class="flex flex-col items-center">
         <DragDropProvider @drag-end="handleDragEnd">
            <div class="w-full max-w-xl space-y-10">
               <TodoList v-model="state.todos" group="todo" />
               <TodoList
                  v-model="state.done"
                  group="done"
                  title="Completed Tasks"
                  collapsible />
               <TodoList
                  v-model="state.deleted"
                  group="trash"
                  title="Trash"
                  collapsible
                  collapse />
            </div>
         </DragDropProvider>
      </main>
   </div>
</template>
