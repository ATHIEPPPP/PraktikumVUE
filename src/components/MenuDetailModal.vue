<template>
  <div
    v-if="isOpen && menu"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
  >
    <div class="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-xl">
      <!-- Header gambar -->
      <div class="h-56 overflow-hidden">
        <img
          :src="menu.image"
          :alt="menu.name"
          class="h-full w-full object-cover"
        />
      </div>

      <div class="p-5 space-y-3">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p
              class="text-[10px] uppercase tracking-wide text-amber-600 font-semibold"
            >
              {{ menu.category }}
            </p>
            <h2 class="text-lg font-bold text-slate-900">
              {{ menu.name }}
            </h2>
          </div>
          <button
            class="text-slate-400 hover:text-slate-600 text-lg leading-none"
            @click="close"
          >
            ✕
          </button>
        </div>

        <p class="text-sm text-slate-600">
          {{ menu.description }}
        </p>

        <div class="grid grid-cols-2 gap-3 text-xs text-slate-600">
          <div class="space-y-1">
            <p class="font-semibold text-slate-900">Harga</p>
            <p>{{ menu.price }}</p>
          </div>
          <div class="space-y-1">
            <p class="font-semibold text-slate-900">Waktu Masak</p>
            <p>{{ menu.cookTime }}</p>
          </div>
          <div class="space-y-1">
            <p class="font-semibold text-slate-900">Porsi</p>
            <p>{{ menu.servings }}</p>
          </div>
          <div class="space-y-1">
            <p class="font-semibold text-slate-900">Level Pedas</p>
            <p>{{ menu.spiceLevel }}</p>
          </div>
        </div>

        <div v-if="menu.ingredients?.length" class="pt-2">
          <p class="text-xs font-semibold text-slate-900 mb-1">Bahan utama:</p>
          <ul class="flex flex-wrap gap-2 text-[11px] text-slate-600">
            <li
              v-for="(ing, idx) in menu.ingredients"
              :key="idx"
              class="px-2 py-1 rounded-full bg-slate-100"
            >
              {{ ing }}
            </li>
          </ul>
        </div>

        <div class="pt-3 flex justify-end">
          <button
            class="inline-flex items-center rounded-full bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-700 transition-colors"
            @click="close"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  menu: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>
