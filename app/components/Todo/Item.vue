<script lang="ts" setup>
import { useSortable } from "@dnd-kit/vue/sortable";
import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers";

const props = defineProps<{
   index: number;
   group: TodoGroup;
}>();

const emit = defineEmits<{
   newTodo: [];
   softDelete: [];
}>();

const todo = defineModel<TodoItem>({ required: true });

const { markDone, markUndone, restore } = useTodoContext();

const draggable = useTemplateRef("draggable");
const dragHandle = useTemplateRef("dragHandle");

useSortable({
   id: computed(() => todo.value.id),
   index: computed(() => props.index),
   group: computed(() => props.group),
   element: draggable,
   handle: dragHandle,
   type: "item",
   accept: "item",
   modifiers: [RestrictToVerticalAxis],
});

const swipeTarget = useTemplateRef("swipeTarget");

const THRESHOLD = 80;
const MAX_DISTANCE = 110;

const offset = ref(0);

let baseOffset = 0;

const { isSwiping, distanceX, direction } = usePointerSwipe(swipeTarget, {
   disableTextSelect: true,
   threshold: 20,
   onSwipeStart() {
      baseOffset = offset.value;
   },
   onSwipe(e: PointerEvent) {
      const absDistanceX = Math.abs(distanceX.value);
      const raw =
         direction.value === "left"
            ? baseOffset - absDistanceX
            : baseOffset + absDistanceX;

      offset.value = Math.max(-MAX_DISTANCE, Math.min(MAX_DISTANCE, raw));
   },
   onSwipeEnd() {
      if (offset.value < 0) {
         offset.value = Math.abs(offset.value) > THRESHOLD ? -MAX_DISTANCE : 0;
      } else if (offset.value > 0) {
         offset.value = offset.value > THRESHOLD ? MAX_DISTANCE : 0;
      }
   },
});
</script>

<template>
   <div
      ref="draggable"
      class="relative isolate w-full overflow-clip rounded-xl bg-white shadow-lg ring ring-neutral-200">
      <button
         class="absolute top-0 left-0 btn rounded-none bg-emerald-500 p-4 shadow-none hover:bg-emerald-600"
         :style="{ width: MAX_DISTANCE + 10 + 'px' }"
         @click="markDone(todo)">
         Done <Icon name="ph-check-circle-bold" class="text-xl" />
      </button>

      <button
         class="absolute top-0 right-0 btn justify-end rounded-none bg-rose-500 p-4 shadow-none hover:bg-rose-600"
         :style="{ width: MAX_DISTANCE + 10 + 'px' }"
         @click="emit('softDelete')">
         Trash <Icon name="ph-trash-bold" class="text-xl" />
      </button>

      <!-- <button
         class="absolute top-0 right-0 btn justify-end rounded-none bg-sky-400-500 p-4 shadow-none hover:bg-sky-400-600"
         :style="{ width: MAX_DISTANCE + 10 + 'px' }"
         @click="restore">
         Restore <Icon name="ph:arrow-counter-clockwise-bold" class="text-xl" />
      </button> -->

      <div
         class="flex w-full flex-1 items-center justify-between gap-4 bg-white shadow-lg transition-all duration-200"
         :class="{ 'duration-0': isSwiping }"
         :style="{ transform: `translateX(${offset}px)` }">
         <div ref="dragHandle" class="p-4 select-none">handle</div>
         <div ref="swipeTarget" class="h-full w-full debug p-4">
            <TodoInput
               v-model="todo.description"
               @keyup.enter="emit('newTodo')" />
         </div>
         <TodoCheckbox
            :model-value="todo.done"
            @update:model-value="
               (checked) => {
                  if (checked) return markDone(todo);
                  markUndone(todo);
               }
            " />
      </div>
   </div>
</template>
