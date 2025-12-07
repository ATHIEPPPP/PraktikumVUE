<template>
  <nav
    class="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 shadow-sm"
  >
    <div class="container mx-auto px-4 flex items-center justify-between h-16">
      <!-- Logo -->
      <router-link
        to="/"
        class="flex items-center gap-3 hover:scale-105 transition-all duration-300 group"
        @click="scrollToTop"
      >
        <div
          class="relative h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-br from-orange-800 via-amber-700 to-yellow-600 shadow-lg shadow-orange-700/50 group-hover:shadow-xl group-hover:shadow-orange-700/60 transition-all overflow-hidden border-3 border-orange-900/30"
        >
          <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,_rgba(255,255,255,0.3),_transparent_50%)]"
          ></div>
          <!-- Traditional wooden spoon (sendok kayu) icon -->
          <svg
            class="w-8 h-8 text-amber-50 relative z-10 drop-shadow-lg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <!-- Spoon bowl -->
            <ellipse
              cx="12"
              cy="8"
              rx="4"
              ry="3.5"
              fill="currentColor"
              opacity="0.9"
            />
            <!-- Spoon handle -->
            <path d="M12 11 L12 21" stroke-width="2.5" />
            <path d="M12 21 L12 22" stroke-width="3" opacity="0.7" />
            <!-- Wood grain effect -->
            <path d="M10 13 L11 15" stroke-width="0.5" opacity="0.4" />
            <path d="M13 14 L14 16" stroke-width="0.5" opacity="0.4" />
            <path d="M11 17 L12 19" stroke-width="0.5" opacity="0.4" />
          </svg>
        </div>
        <div class="text-left">
          <p
            class="text-base font-bold text-slate-900 tracking-tight leading-tight"
          >
            Pawon <span class="text-amber-600">Nusantara</span>
          </p>
          <p class="text-xs text-slate-500 font-medium">
            Cita Rasa Tradisional
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
            @click="scrollToTop"
          >
            Beranda
            <span
              class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-600 group-hover:w-3/4 transition-all duration-300"
            ></span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/menu"
            class="px-4 py-2 rounded-lg text-slate-700 hover:text-amber-700 hover:bg-amber-50/50 transition-all relative group"
            active-class="text-amber-700 bg-amber-50 font-semibold"
          >
            Menu
            <span
              class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-600 group-hover:w-3/4 transition-all duration-300"
            ></span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/tentang"
            class="px-4 py-2 rounded-lg text-slate-700 hover:text-amber-700 hover:bg-amber-50/50 transition-all relative group"
            active-class="text-amber-700 bg-amber-50 font-semibold"
          >
            Tentang
            <span
              class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-600 group-hover:w-3/4 transition-all duration-300"
            ></span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/galeri"
            class="px-4 py-2 rounded-lg text-slate-700 hover:text-amber-700 hover:bg-amber-50/50 transition-all relative group"
            active-class="text-amber-700 bg-amber-50 font-semibold"
          >
            Galeri
            <span
              class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-600 group-hover:w-3/4 transition-all duration-300"
            ></span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/pesan"
            class="px-4 py-2 rounded-lg text-slate-700 hover:text-amber-700 hover:bg-amber-50/50 transition-all relative group"
            active-class="text-amber-700 bg-amber-50 font-semibold"
          >
            Pesan
            <span
              class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-600 group-hover:w-3/4 transition-all duration-300"
            ></span>
          </router-link>
        </li>
        <li>
          <button
            @click="isCartOpen = !isCartOpen"
            class="relative px-3 py-2 rounded-lg text-slate-700 hover:text-amber-700 hover:bg-amber-50/50 transition-all"
          >
            <span class="text-2xl">🛒</span>
            <span
              v-if="cartCount > 0"
              class="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse"
            >
              {{ cartCount > 99 ? "99+" : cartCount }}
            </span>
          </button>
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

      <!-- Mobile cart & menu button -->
      <div class="md:hidden flex items-center gap-2">
        <button
          @click="isCartOpen = !isCartOpen"
          class="relative inline-flex items-center justify-center rounded-xl border-2 border-slate-200 p-2.5 hover:bg-amber-50 hover:border-amber-300 transition-all duration-300"
        >
          <span class="text-xl">🛒</span>
          <span
            v-if="cartCount > 0"
            class="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse"
          >
            {{ cartCount > 99 ? "99+" : cartCount }}
          </span>
        </button>
        <button
          class="inline-flex items-center justify-center rounded-xl border-2 border-slate-200 p-2.5 hover:bg-amber-50 hover:border-amber-300 transition-all duration-300 hover:scale-105"
          @click="toggleMenu"
        >
          <span v-if="!isMenuOpen" class="text-lg">☰</span>
          <span v-else class="text-lg">✕</span>
        </button>
      </div>
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
            @click="handleHomeClick"
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

    <!-- Cart Dropdown -->
    <CartDropdown :isOpen="isCartOpen" @close="isCartOpen = false" />
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useCart } from "../composables/useCart";
import CartDropdown from "./CartDropdown.vue";

const { cartCount } = useCart();
const isCartOpen = ref(false);

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    isCartOpen.value = false;
  }
};
const closeMenu = () => {
  isMenuOpen.value = false;
};
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
const handleHomeClick = () => {
  closeMenu();
  scrollToTop();
};
</script>
