<template>
  <article
    class="group bg-white rounded-2xl sm:rounded-3xl shadow-md shadow-slate-200/70 border border-slate-100 overflow-hidden cursor-pointer transition-all hover:shadow-2xl hover:-translate-y-1 hover:border-amber-200"
    @click="$emit('select')"
  >
    <div class="h-28 sm:h-36 md:h-40 overflow-hidden relative">
      <img
        :src="menu.image"
        :alt="menu.name"
        class="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div
        class="absolute inset-x-0 bottom-0 h-12 sm:h-16 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
      ></div>
    </div>
    <div class="p-2.5 sm:p-3 md:p-4 space-y-1 sm:space-y-2">
      <p
        class="inline-flex items-center gap-1 rounded-full bg-amber-50 px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-semibold uppercase tracking-wide text-amber-700"
      >
        ● {{ menu.category }}
      </p>
      <h3
        class="font-semibold text-slate-900 text-xs sm:text-sm md:text-base line-clamp-1"
      >
        {{ menu.name }}
      </h3>
      <p
        class="text-[10px] sm:text-xs text-slate-500 line-clamp-2 hidden sm:block"
      >
        {{ menu.description }}
      </p>
      <div
        class="flex items-center justify-between pt-1 sm:pt-2 text-[10px] sm:text-xs"
      >
        <span class="font-bold text-amber-700 text-xs sm:text-sm">
          {{ menu.price }}
        </span>
        <span
          class="text-[9px] sm:text-[11px] text-slate-400 flex items-center gap-0.5 sm:gap-1"
        >
          ⏱ {{ menu.cookTime }}
        </span>
      </div>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  menu: {
    type: Object,
    required: true,
  },
});
defineEmits(["select"]);
</script>
