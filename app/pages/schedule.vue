<script setup lang="ts">
useHead({
   title: "Schedule — FIFA World Cup 2026",
   meta: [
      {
         name: "description",
         content: "Every stage of the FIFA World Cup 2026, from the group stage to the final.",
      },
   ],
});

interface Stage {
   name: string;
   start: string; // ISO date, inclusive
   end: string; // ISO date, inclusive
   matches: number;
   note: string;
}

const stages: Stage[] = [
   {
      name: "Group Stage",
      start: "2026-06-11",
      end: "2026-06-27",
      matches: 72,
      note: "12 groups of four, three matches each",
   },
   {
      name: "Round of 32",
      start: "2026-06-28",
      end: "2026-07-03",
      matches: 16,
      note: "New for 2026 — the first knockout round",
   },
   {
      name: "Round of 16",
      start: "2026-07-04",
      end: "2026-07-07",
      matches: 8,
      note: "All matches played in the United States",
   },
   { name: "Quarterfinals", start: "2026-07-09", end: "2026-07-11", matches: 4, note: "" },
   { name: "Semifinals", start: "2026-07-14", end: "2026-07-15", matches: 2, note: "" },
   {
      name: "Bronze Final",
      start: "2026-07-18",
      end: "2026-07-18",
      matches: 1,
      note: "Third-place match",
   },
   {
      name: "Final",
      start: "2026-07-19",
      end: "2026-07-19",
      matches: 1,
      note: "MetLife Stadium, New Jersey",
   },
];

const today = new Date();

type StageStatus = "past" | "live" | "upcoming";

function statusOf(stage: Stage): StageStatus {
   const start = new Date(stage.start);
   const end = new Date(`${stage.end}T23:59:59`);
   if (today > end) return "past";
   if (today >= start && today <= end) return "live";
   return "upcoming";
}

function formatRange(stage: Stage): string {
   const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
   const start = new Date(stage.start).toLocaleDateString("en-US", opts);
   if (stage.start === stage.end) return start;
   const end = new Date(stage.end).toLocaleDateString("en-US", opts);
   return `${start} – ${end}`;
}

// Styling per status, looked up rather than branched in the template.
const statusStyles: Record<StageStatus, { dot: string; line: string; text: string }> = {
   past: {
      dot: "bg-[#0A1020]/20 border-[#0A1020]/20",
      line: "bg-[#0A1020]/10",
      text: "text-[#0A1020]/40",
   },
   live: { dot: "bg-[#D4AF37] border-[#D4AF37]", line: "bg-[#D4AF37]/40", text: "text-[#0A1020]" },
   upcoming: {
      dot: "bg-white border-[#0A1020]/20",
      line: "bg-[#0A1020]/10",
      text: "text-[#0A1020]/70",
   },
};
</script>

<template>
   <div class="font-['Manrope'] text-[#0A1020]">
      <!-- HEADER -->
      <section class="bg-[#0A1020] px-6 py-20 text-center">
         <NuxtLink
            to="/"
            class="text-xs uppercase tracking-[0.3em] text-[#F5F1E6]/40 hover:text-[#F5F1E6]/70"
         >
            ← World Cup 2026
         </NuxtLink>
         <h1 class="font-['Anton'] mt-6 text-5xl text-[#F5F1E6] sm:text-6xl">Match Schedule</h1>
         <p class="mt-3 text-sm uppercase tracking-[0.3em] text-[#F5F1E6]/40">
            104 Matches · 39 Days
         </p>
      </section>

      <!-- TIMELINE -->
      <section class="bg-[#F5F1E6] px-6 py-20">
         <div class="mx-auto max-w-2xl">
            <div
               v-for="(stage, i) in stages"
               :key="stage.name"
               class="relative flex gap-6 pb-12 last:pb-0"
            >
               <!-- connecting line -->
               <div
                  v-if="i < stages.length - 1"
                  class="absolute left-[7px] top-5 h-full w-px"
                  :class="statusStyles[statusOf(stage)].line"
               />

               <!-- dot -->
               <div
                  class="relative z-10 mt-1.5 h-4 w-4 flex-shrink-0 rounded-full border-2"
                  :class="[
                     statusStyles[statusOf(stage)].dot,
                     statusOf(stage) === 'live' && 'animate-pulse',
                  ]"
               />

               <!-- content -->
               <div class="flex-1">
                  <div class="flex flex-wrap items-baseline justify-between gap-2">
                     <h2
                        class="font-['Anton'] text-2xl"
                        :class="statusStyles[statusOf(stage)].text"
                     >
                        {{ stage.name }}
                     </h2>
                     <span
                        class="text-xs uppercase tracking-[0.2em]"
                        :class="statusStyles[statusOf(stage)].text"
                     >
                        {{ formatRange(stage) }}
                     </span>
                  </div>

                  <p class="mt-1 text-sm" :class="statusStyles[statusOf(stage)].text">
                     {{ stage.matches }} {{ stage.matches === 1 ? "match" : "matches" }}
                     <span v-if="stage.note"> · {{ stage.note }}</span>
                  </p>

                  <span
                     v-if="statusOf(stage) === 'live'"
                     class="mt-3 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#0A1020]"
                  >
                     <span class="h-1.5 w-1.5 rounded-full bg-[#B23A2E] animate-pulse"></span>
                     Underway now
                  </span>
               </div>
            </div>
         </div>
      </section>

      <!-- FOOTER -->
      <footer class="border-t border-[#F5F1E6]/10 bg-[#0A1020] px-6 py-10">
         <div
            class="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-[#F5F1E6]/40 sm:flex-row"
         >
            <p>FIFA World Cup 2026</p>
            <p>United States · Mexico · Canada</p>
         </div>
      </footer>
   </div>
</template>
