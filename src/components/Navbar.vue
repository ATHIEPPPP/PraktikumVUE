<template>
  <nav class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
    <div class="container mx-auto px-4 flex items-center justify-between h-16">
      <!-- Logo -->
      <router-link
        to="/"
        class="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <div
          class="h-9 w-9 rounded-full flex items-center justify-center bg-amber-600 shadow-sm"
        >
          <span class="text-xl text-white">🍽️</span>
        </div>
        <div class="text-left">
          <p class="text-sm font-semibold text-amber-800">Pawon</p>
          <p class="text-xs text-gray-500 -mt-1">
            Warung Masakan Nusantara
          </p>
        </div>
      </router-link>

      <!-- Desktop nav -->
      <ul class="hidden md:flex items-center gap-6 text-sm font-medium">
        <li>
          <router-link
            to="/"
            class="text-gray-700 hover:text-amber-700 transition-colors"
          >
            Beranda
          </router-link>
        </li>
        <li>
          <router-link
            to="/menu"
            class="text-gray-700 hover:text-amber-700 transition-colors"
          >
            Menu
          </router-link>
        </li>
        <li>
          <router-link
            to="/tentang"
            class="text-gray-700 hover:text-amber-700 transition-colors"
          >
            Tentang
          </router-link>
        </li>
        <li>
          <router-link
            to="/galeri"
            class="text-gray-700 hover:text-amber-700 transition-colors"
          >
            Galeri
          </router-link>
        </li>
        <li>
          <router-link
            to="/contact"
            class="inline-flex items-center rounded-full border border-amber-600 px-4 py-2 text-xs font-semibold text-amber-700 hover:bg-amber-600 hover:text-white transition-colors"
          >
            Kontak
          </router-link>
        </li>
      </ul>

      <!-- Mobile button -->
      <button
        class="md:hidden inline-flex items-center justify-center rounded-md border border-gray-200 p-2"
        @click="toggleMenu"
      >
        <span v-if="!isMenuOpen">☰</span>
        <span v-else>✕</span>
      </button>
    </div>

    <!-- Mobile menu -->
    <div
      v-if="isMenuOpen"
      class="md:hidden border-t border-gray-200 bg-white"
    >
      <div class="container mx-auto px-4 py-3 space-y-3 text-sm">
        <router-link
          to="/"
          class="block text-gray-700 hover:text-amber-700"
          @click="closeMenu"
        >
          Beranda
        </router-link>
        <router-link
          to="/menu"
          class="block text-gray-700 hover:text-amber-700"
          @click="closeMenu"
        >
          Menu
        </router-link>
        <router-link
          to="/tentang"
          class="block text-gray-700 hover:text-amber-700"
          @click="closeMenu"
        >
          Tentang
        </router-link>
        <router-link
          to="/galeri"
          class="block text-gray-700 hover:text-amber-700"
          @click="closeMenu"
        >
          Galeri
        </router-link>
        <router-link
          to="/contact"
          class="block text-amber-700 font-semibold"
          @click="closeMenu"
        >
          Kontak
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>
