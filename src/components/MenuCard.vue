<template>
  <article
    class="group bg-white rounded-3xl shadow-md shadow-slate-200/70 border border-slate-100 overflow-hidden cursor-pointer transition-all hover:shadow-2xl hover:-translate-y-1 hover:border-amber-200"
    @click="$emit('select')"
  >
    <div class="h-40 overflow-hidden relative">
      <img
        :src="menu.image"
        :alt="menu.name"
        class="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div
        class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
      ></div>
    </div>
    <div class="p-4 space-y-2">
      <p
        class="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-700"
      >
        ● {{ menu.category }}
      </p>
      <h3 class="font-semibold text-slate-900 text-sm md:text-base line-clamp-1">
        {{ menu.name }}
      </h3>
      <p class="text-xs text-slate-500 line-clamp-2">
        {{ menu.description }}
      </p>
      <div class="flex items-center justify-between pt-2 text-xs">
        <span class="font-bold text-amber-700 text-sm">
          {{ menu.price }}
        </span>
        <span class="text-[11px] text-slate-400 flex items-center gap-1">
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
