<script setup lang="ts">
// Fonts: Anton for the scoreboard-style display type, Manrope for body copy.
useHead({
   title: "FIFA World Cup 2026",
   meta: [
      {
         name: "description",
         content: "United States · Mexico · Canada — June 11 to July 19, 2026.",
      },
   ],
   link: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
         rel: "stylesheet",
         href: "https://fonts.googleapis.com/css2?family=Anton&family=Manrope:wght@400;500;700&display=swap",
      },
   ],
});

interface Host {
   country: string;
   cities: number;
   note: string;
}

interface Stat {
   value: string;
   label: string;
}

const hosts: Host[] = [
   { country: "United States", cities: 11, note: "Final hosted at MetLife Stadium, New Jersey" },
   { country: "Mexico", cities: 3, note: "First nation to host a third World Cup" },
   { country: "Canada", cities: 2, note: "First World Cup matches on Canadian soil" },
];

const stats: Stat[] = [
   { value: "48", label: "Nations" },
   { value: "104", label: "Matches" },
   { value: "16", label: "Host Cities" },
];

onMounted(() => {
   myFinalTest();
   testTwo();
});
</script>

<template>
   <div class="font-['Manrope'] text-[#0A1020]">
      <!-- HERO -->
      <section class="relative min-h-screen overflow-hidden bg-[#0A1020] flex items-center">
         <!-- center-circle arc, the pitch peeking up from below -->
         <svg
            class="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[140%] max-w-[1100px] opacity-[0.18]"
            viewBox="0 0 800 400"
            fill="none"
         >
            <circle cx="400" cy="0" r="180" stroke="#D4AF37" stroke-width="2" />
            <line x1="0" y1="0" x2="800" y2="0" stroke="#D4AF37" stroke-width="2" />
            <circle cx="400" cy="0" r="4" fill="#D4AF37" />
         </svg>

         <div class="relative mx-auto max-w-5xl px-6 py-32 text-center">
            <span
               class="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[#D4AF37]"
            >
               <span class="h-2 w-2 rounded-full bg-[#B23A2E] animate-pulse"></span>
               Tournament live · Group Stage
            </span>

            <h1
               class="font-['Anton'] mt-8 text-[18vw] leading-[0.85] text-[#F5F1E6] sm:text-[12vw] md:text-[150px]"
            >
               WORLD<br />CUP <span class="text-[#D4AF37]">2026</span>
            </h1>

            <p class="mt-8 text-lg tracking-wide text-[#F5F1E6]/70 sm:text-xl">
               United States · Mexico · Canada
            </p>
            <p class="mt-2 text-sm uppercase tracking-[0.3em] text-[#F5F1E6]/40">
               June 11 — July 19
            </p>

            <div class="mt-12 flex justify-center gap-4">
               <NuxtLink
                  href="/schedule"
                  class="rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-semibold uppercase tracking-wide text-[#0A1020] transition hover:bg-[#F5F1E6]"
               >
                  See the Schedule
               </NuxtLink>
               <a
                  href="#hosts"
                  class="rounded-full border border-[#F5F1E6]/30 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-[#F5F1E6] transition hover:border-[#F5F1E6]"
               >
                  Host Nations
               </a>
            </div>
         </div>
      </section>

      <!-- HOST NATIONS -->
      <section id="hosts" class="bg-[#F5F1E6] px-6 py-24">
         <div class="mx-auto max-w-5xl">
            <h2 class="font-['Anton'] text-4xl text-[#0A1020] sm:text-5xl">
               Three Nations. One Cup.
            </h2>
            <p class="mt-3 max-w-xl text-[#0A1020]/60">
               For the first time, the World Cup is shared across three host countries.
            </p>

            <div class="mt-12 grid gap-6 sm:grid-cols-3">
               <div
                  v-for="host in hosts"
                  :key="host.country"
                  class="rounded-2xl border border-[#0A1020]/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
               >
                  <div class="h-1 w-10 rounded-full bg-[#D4AF37]"></div>
                  <h3 class="font-['Anton'] mt-4 text-2xl text-[#0A1020]">{{ host.country }}</h3>
                  <p class="mt-1 text-sm text-[#0A1020]/50">{{ host.cities }} host cities</p>
                  <p class="mt-4 text-sm leading-relaxed text-[#0A1020]/70">{{ host.note }}</p>
               </div>
            </div>
         </div>
      </section>

      <!-- THE NUMBERS -->
      <section id="schedule" class="bg-[#0F3D2E] px-6 py-24">
         <div class="mx-auto max-w-5xl text-center">
            <h2 class="font-['Anton'] text-3xl text-[#F5F1E6] sm:text-4xl">The Biggest Cup Yet</h2>
            <div class="mt-12 grid grid-cols-3 gap-6">
               <div v-for="stat in stats" :key="stat.label">
                  <p class="font-['Anton'] text-6xl text-[#D4AF37] sm:text-7xl">{{ stat.value }}</p>
                  <p class="mt-2 text-xs uppercase tracking-[0.3em] text-[#F5F1E6]/60">
                     {{ stat.label }}
                  </p>
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
