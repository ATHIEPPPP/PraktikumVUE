<template>
  <article
    class="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
    @click="$emit('select')"
  >
    <div class="h-40 overflow-hidden">
      <img
        :src="menu.image"
        :alt="menu.name"
        class="h-full w-full object-cover group-hover:scale-105 transition-transform"
      />
    </div>
    <div class="p-4 space-y-2">
      <p
        class="text-[10px] uppercase tracking-wide text-amber-600 font-semibold"
      >
        {{ menu.category }}
      </p>
      <h3 class="font-semibold text-slate-900 text-sm md:text-base">
        {{ menu.name }}
      </h3>
      <p class="text-xs text-slate-500 line-clamp-2">
        {{ menu.description }}
      </p>
      <div class="flex items-center justify-between pt-2 text-xs">
        <span class="font-semibold text-amber-700">
          {{ menu.price }}
        </span>
        <span class="text-slate-400">{{ menu.cookTime }}</span>
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
