<script lang="ts" setup>
const target = useTemplateRef("el");

const THRESHOLD = 80;
const MAX_DISTANCE = 110;

const offset = ref(0);

let baseOffset = 0;

const { isSwiping, distanceX, direction } = usePointerSwipe(target, {
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
      class="relative isolate w-full overflow-clip rounded-xl bg-white shadow-lg ring ring-neutral-200">
      <button
         class="absolute top-0 left-0 btn rounded-none bg-emerald-500 p-4 shadow-none hover:bg-emerald-600"
         :style="{ width: MAX_DISTANCE + 10 + 'px' }">
         Done <Icon name="ph-check-circle-bold" class="text-xl" />
      </button>

      <button
         class="absolute top-0 right-0 btn justify-end rounded-none bg-rose-500 p-4 shadow-none hover:bg-rose-600"
         :style="{ width: MAX_DISTANCE + 10 + 'px' }">
         Delete <Icon name="ph-trash-bold" class="text-xl" />
      </button>

      <div
         ref="el"
         class="flex w-full flex-1 items-center justify-between bg-white p-4 shadow-lg transition-all duration-200"
         :class="{ 'duration-0': isSwiping }"
         :style="{ transform: `translateX(${offset}px)` }">
         Something to do
         <TodoCheckbox />
      </div>
   </div>
</template>
