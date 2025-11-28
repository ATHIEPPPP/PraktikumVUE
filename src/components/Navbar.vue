<template>
  <nav class="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
    <div class="container mx-auto px-4 flex items-center justify-between h-16">
      <!-- Logo -->
      <router-link
        to="/"
        class="flex items-center gap-3 hover:scale-105 transition-all duration-300 group"
      >
        <div
          class="h-10 w-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg shadow-amber-500/30 group-hover:shadow-xl group-hover:shadow-amber-500/40 transition-all"
        >
          <span class="text-xl">🍽️</span>
        </div>
        <div class="text-left">
          <p class="text-sm font-bold text-slate-900 tracking-tight">Pawon</p>
          <p class="text-xs text-slate-500 -mt-0.5">
            Masakan Nusantara
          </p>
        </div>
      </router-link>

      <!-- Desktop nav -->
      <ul class="hidden md:flex items-center gap-2 text-sm font-medium">
        <li>
          <router-link
            to="/"
            class="px-4 py-2 rounded-lg text-slate-700 hover:text-amber-700 hover:bg-amber-50/50 transition-all relative group"
            active-class="text-amber-700 bg-amber-50 font-semibold"
          >
            Beranda
            <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-600 group-hover:w-3/4 transition-all duration-300"></span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/menu"
            class="px-4 py-2 rounded-lg text-slate-700 hover:text-amber-700 hover:bg-amber-50/50 transition-all relative group"
            active-class="text-amber-700 bg-amber-50 font-semibold"
          >
            Menu
            <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-600 group-hover:w-3/4 transition-all duration-300"></span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/tentang"
            class="px-4 py-2 rounded-lg text-slate-700 hover:text-amber-700 hover:bg-amber-50/50 transition-all relative group"
            active-class="text-amber-700 bg-amber-50 font-semibold"
          >
            Tentang
            <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-600 group-hover:w-3/4 transition-all duration-300"></span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/galeri"
            class="px-4 py-2 rounded-lg text-slate-700 hover:text-amber-700 hover:bg-amber-50/50 transition-all relative group"
            active-class="text-amber-700 bg-amber-50 font-semibold"
          >
            Galeri
            <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-600 group-hover:w-3/4 transition-all duration-300"></span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/pesan"
            class="px-4 py-2 rounded-lg text-slate-700 hover:text-amber-700 hover:bg-amber-50/50 transition-all relative group"
            active-class="text-amber-700 bg-amber-50 font-semibold"
          >
            Pesan
            <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-600 group-hover:w-3/4 transition-all duration-300"></span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/contact"
            class="inline-flex items-center rounded-xl border-2 border-amber-600 px-5 py-2 text-xs font-bold text-amber-700 hover:bg-amber-600 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-amber-600/30 transition-all duration-300"
          >
            Kontak
          </router-link>
        </li>
      </ul>

      <!-- Mobile button -->
      <button
        class="md:hidden inline-flex items-center justify-center rounded-xl border-2 border-slate-200 p-2.5 hover:bg-amber-50 hover:border-amber-300 transition-all duration-300 hover:scale-105"
        @click="toggleMenu"
      >
        <span v-if="!isMenuOpen" class="text-lg">☰</span>
        <span v-else class="text-lg">✕</span>
      </button>
    </div>

    <!-- Mobile menu -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMenuOpen"
        class="md:hidden border-t border-slate-200/50 bg-white/95 backdrop-blur-md"
      >
        <div class="container mx-auto px-4 py-4 space-y-2 text-sm">
          <router-link
            to="/"
            class="block px-4 py-3 rounded-lg text-slate-700 hover:text-amber-700 hover:bg-amber-50 transition-all"
            active-class="text-amber-700 bg-amber-50 font-semibold"
            @click="closeMenu"
          >
            Beranda
          </router-link>
          <router-link
            to="/menu"
            class="block px-4 py-3 rounded-lg text-slate-700 hover:text-amber-700 hover:bg-amber-50 transition-all"
            active-class="text-amber-700 bg-amber-50 font-semibold"
            @click="closeMenu"
          >
            Menu
          </router-link>
          <router-link
            to="/tentang"
            class="block px-4 py-3 rounded-lg text-slate-700 hover:text-amber-700 hover:bg-amber-50 transition-all"
            active-class="text-amber-700 bg-amber-50 font-semibold"
            @click="closeMenu"
          >
            Tentang
          </router-link>
          <router-link
            to="/galeri"
            class="block px-4 py-3 rounded-lg text-slate-700 hover:text-amber-700 hover:bg-amber-50 transition-all"
            active-class="text-amber-700 bg-amber-50 font-semibold"
            @click="closeMenu"
          >
            Galeri
          </router-link>
          <router-link
            to="/pesan"
            class="block px-4 py-3 rounded-lg text-slate-700 hover:text-amber-700 hover:bg-amber-50 transition-all"
            active-class="text-amber-700 bg-amber-50 font-semibold"
            @click="closeMenu"
          >
            Pesan
          </router-link>
          <router-link
            to="/contact"
            class="block px-4 py-3 rounded-lg text-amber-700 bg-amber-50 font-semibold hover:bg-amber-100 transition-all"
            @click="closeMenu"
          >
            Kontak
          </router-link>
        </div>
      </div>
    </transition>
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
