<template>
  <div
    v-if="isOpen && menu"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
  >
    <div
      class="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl shadow-slate-900/40 border border-slate-100"
    >
      <!-- Header gambar -->
      <div class="relative h-56 overflow-hidden">
        <img
          :src="menu.image"
          :alt="menu.name"
          class="h-full w-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <button
          class="absolute top-3 right-3 text-slate-100 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-1.5 text-sm leading-none shadow-lg"
          @click="close"
        >
          ✕
        </button>
      </div>

      <div class="p-6 space-y-4 bg-gradient-to-b from-white via-white to-amber-50/40">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p
              class="inline-flex items-center gap-1 text-[10px] uppercase tracking-wide text-amber-700 font-semibold bg-amber-50 px-2 py-1 rounded-full"
            >
              ● {{ menu.category }}
            </p>
            <h2 class="mt-2 text-xl font-bold text-slate-900 tracking-tight">
              {{ menu.name }}
            </h2>
          </div>
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

        <div class="pt-4 flex justify-end">
          <button
            class="inline-flex items-center rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 px-5 py-2.5 text-xs font-bold text-white hover:from-amber-700 hover:to-amber-800 transition-all shadow-md hover:shadow-lg"
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
