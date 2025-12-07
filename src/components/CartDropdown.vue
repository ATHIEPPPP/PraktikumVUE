<template>
  <transition name="dropdown-fade">
    <div v-if="isOpen" class="fixed inset-0 z-40" @click="close">
      <transition name="dropdown-slide">
        <div
          v-if="isOpen"
          class="absolute top-16 right-4 w-full max-w-md bg-white rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden"
          @click.stop
        >
          <!-- Header -->
          <div class="bg-gradient-to-r from-amber-600 to-amber-700 p-5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"
                >
                  <span class="text-2xl">🛒</span>
                </div>
                <div>
                  <h3 class="text-white font-bold text-lg">Keranjang</h3>
                  <p class="text-amber-100 text-xs">
                    {{ cart.length }} item dipilih
                  </p>
                </div>
              </div>
              <button
                @click="close"
                class="text-white hover:bg-white/20 rounded-lg p-2 transition-all"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Cart Items -->
          <div class="max-h-96 overflow-y-auto p-4">
            <!-- Empty State -->
            <div v-if="cart.length === 0" class="text-center py-10">
              <div
                class="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center"
              >
                <span class="text-4xl">🛒</span>
              </div>
              <p class="text-slate-900 font-bold text-base mb-2">
                Keranjang Kosong
              </p>
              <p class="text-sm text-slate-500 mb-4">
                Belum ada item yang dipilih
              </p>
              <button
                @click="goToMenu"
                class="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold hover:from-amber-700 hover:to-amber-800 hover:scale-105 shadow-md transition-all text-sm"
              >
                Lihat Menu
              </button>
            </div>

            <!-- Items List -->
            <div v-else class="space-y-3">
              <div
                v-for="item in cart"
                :key="item.id"
                class="flex gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200 hover:border-amber-300 transition-all"
              >
                <!-- Image -->
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-20 h-20 rounded-xl object-cover shadow-sm"
                />

                <!-- Details -->
                <div class="flex-1 min-w-0">
                  <h4 class="font-bold text-slate-900 text-sm mb-1 truncate">
                    {{ item.name }}
                  </h4>
                  <p class="text-xs text-slate-500 mb-2">{{ item.category }}</p>
                  <p class="font-bold text-amber-700 text-sm">
                    {{ formatPrice(item.price) }}
                  </p>
                </div>

                <!-- Actions -->
                <div class="flex flex-col items-end justify-between">
                  <button
                    @click="removeItem(item.id)"
                    class="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg p-1 transition-all"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <!-- Quantity Control -->
                  <div
                    class="flex items-center gap-1 bg-white border border-slate-200 rounded-lg shadow-sm"
                  >
                    <button
                      @click="decrementQuantity(item.id)"
                      class="px-2 py-1 text-slate-600 hover:text-amber-700 hover:bg-amber-50 rounded-l-lg transition-all text-sm font-bold"
                      :disabled="item.quantity <= 1"
                      :class="{
                        'opacity-30 cursor-not-allowed': item.quantity <= 1,
                      }"
                    >
                      −
                    </button>
                    <span class="w-8 text-center font-bold text-sm">{{
                      item.quantity
                    }}</span>
                    <button
                      @click="incrementQuantity(item.id)"
                      class="px-2 py-1 text-slate-600 hover:text-amber-700 hover:bg-amber-50 rounded-r-lg transition-all text-sm font-bold"
                      :disabled="item.quantity >= 99"
                      :class="{
                        'opacity-30 cursor-not-allowed': item.quantity >= 99,
                      }"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div
            v-if="cart.length > 0"
            class="border-t-2 border-slate-200 p-4 space-y-3 bg-slate-50"
          >
            <!-- Subtotal -->
            <div class="flex justify-between items-center text-sm">
              <span class="text-slate-600 font-medium">Subtotal</span>
              <span class="font-bold text-slate-900">{{
                formatPrice(subtotal)
              }}</span>
            </div>

            <!-- Actions -->
            <div class="flex gap-2">
              <button
                @click="goToMenu"
                class="flex-1 py-2.5 border-2 border-amber-600 text-amber-700 rounded-xl font-bold hover:bg-amber-50 transition-all text-sm"
              >
                + Tambah Menu
              </button>
              <button
                @click="goToCheckout"
                class="flex-1 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold hover:from-amber-700 hover:to-amber-800 hover:scale-105 shadow-lg transition-all text-sm"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useCart } from "../composables/useCart";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const router = useRouter();
const { cart, removeItem, incrementQuantity, decrementQuantity } = useCart();

const subtotal = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

const close = () => {
  emit("close");
};

const goToMenu = () => {
  close();
  router.push("/menu");
};

const goToCheckout = () => {
  close();
  router.push("/pesan");
};
</script>

<style scoped>
/* Fade overlay animation */
.dropdown-fade-enter-active {
  transition: opacity 0.3s ease-out;
}

.dropdown-fade-leave-active {
  transition: opacity 0.2s ease-in;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
}

/* Dropdown slide animation */
.dropdown-slide-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.dropdown-slide-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 1, 1);
}

.dropdown-slide-enter-from {
  opacity: 0;
  transform: translateY(-30px) scale(0.9);
}

.dropdown-slide-leave-to {
  opacity: 0;
  transform: translateY(-15px) scale(0.95);
}
</style>
