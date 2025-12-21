<template>
  <div
    class="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-4 sm:p-6 md:p-8 max-w-2xl mx-auto"
  >
    <div class="flex items-start justify-between mb-4 sm:mb-6">
      <div class="flex items-start gap-3 sm:gap-4">
        <div
          class="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/30"
        >
          <span class="text-xl sm:text-2xl">🛒</span>
        </div>
        <div>
          <h3
            class="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 tracking-tight mb-1"
          >
            Keranjang Pesanan
          </h3>
          <p class="text-xs sm:text-sm text-slate-500">
            {{ cart.length }} item dipilih
          </p>
        </div>
      </div>
      <button
        v-if="cart.length > 0"
        @click="clearCart"
        class="text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg font-semibold transition-all"
      >
        🗑️ Kosongkan
      </button>
    </div>

    <!-- Empty State -->
    <div v-if="cart.length === 0" class="text-center py-16">
      <div
        class="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center"
      >
        <span class="text-5xl">🛒</span>
      </div>
      <p class="text-slate-900 font-bold text-lg mb-2">
        Keranjang masih kosong
      </p>
      <p class="text-sm text-slate-500 mb-6">Tambahkan menu favorit Anda!</p>
      <button
        @click="showMenuSelector = true"
        class="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold hover:from-amber-700 hover:to-amber-800 hover:scale-105 shadow-lg shadow-amber-600/30 hover:shadow-xl hover:shadow-amber-600/40 transition-all"
      >
        🍽️ Pilih Menu
      </button>
    </div>

    <!-- Cart Items -->
    <div v-else class="space-y-3 mb-6">
      <transition-group name="list">
        <div
          v-for="item in cart"
          :key="item.id"
          class="flex gap-2 sm:gap-4 p-3 sm:p-4 bg-gradient-to-br from-slate-50 to-slate-50/50 rounded-2xl border-2 border-slate-100 hover:border-amber-300 hover:shadow-lg transition-all group"
        >
          <!-- Image -->
          <img
            :src="item.image"
            :alt="item.name"
            class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl object-cover shadow-md group-hover:shadow-lg transition-all"
          />

          <!-- Details -->
          <div class="flex-1 min-w-0">
            <h4
              class="font-bold text-slate-900 text-sm sm:text-base mb-1 truncate"
            >
              {{ item.name }}
            </h4>
            <p
              class="text-[10px] sm:text-xs text-slate-500 mb-1 sm:mb-2 font-medium"
            >
              🏜️ {{ item.category }}
            </p>
            <p class="font-bold text-amber-700 text-sm sm:text-base md:text-lg">
              {{ formatPrice(item.price) }}
            </p>
          </div>

          <!-- Fitur 8: Quantity Control (Increment/Decrement) -->
          <div class="flex flex-col items-end justify-between">
            <button
              @click="removeItem(item.id)"
              class="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg p-2 transition-all hover:scale-110"
              aria-label="Remove item"
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

            <div
              class="flex items-center gap-0.5 sm:gap-1 bg-white border-2 border-slate-200 rounded-lg sm:rounded-xl shadow-sm"
            >
              <button
                @click="decrementQuantity(item.id)"
                class="px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-slate-600 hover:text-amber-700 hover:bg-amber-50 rounded-l-lg sm:rounded-l-xl transition-all font-bold text-sm sm:text-base md:text-lg"
                :disabled="item.quantity <= 1"
                :class="{ 'opacity-30 cursor-not-allowed': item.quantity <= 1 }"
              >
                −
              </button>
              <span
                class="w-6 sm:w-8 md:w-10 text-center font-bold text-xs sm:text-sm md:text-base"
                >{{ item.quantity }}</span
              >
              <button
                @click="incrementQuantity(item.id)"
                class="px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-slate-600 hover:text-amber-700 hover:bg-amber-50 rounded-r-lg sm:rounded-r-xl transition-all font-bold text-sm sm:text-base md:text-lg"
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
      </transition-group>
    </div>

    <!-- Add More Button -->
    <button
      v-if="cart.length > 0"
      @click="showMenuSelector = true"
      class="w-full py-2 sm:py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-700 hover:border-amber-500 hover:text-amber-700 hover:bg-amber-50/30 transition-all font-semibold text-xs sm:text-sm mb-4 sm:mb-6 hover:scale-[1.01]"
    >
      ➕ Tambah Menu Lainnya
    </button>

    <!-- Summary -->
    <div
      v-if="cart.length > 0"
      class="border-t-2 border-slate-200 pt-4 sm:pt-6 space-y-3 sm:space-y-4"
    >
      <div
        class="flex justify-between text-xs sm:text-sm p-2 sm:p-3 bg-slate-50 rounded-xl"
      >
        <span class="text-slate-600 font-medium">Subtotal</span>
        <span class="font-bold text-slate-900">{{
          formatPrice(subtotal)
        }}</span>
      </div>
      <div
        class="flex justify-between text-xs sm:text-sm p-2 sm:p-3 bg-slate-50 rounded-xl"
      >
        <span class="text-slate-600 font-medium">Pajak (10%)</span>
        <span class="font-bold text-slate-900">{{ formatPrice(tax) }}</span>
      </div>

      <!-- Fitur 9: Promo Code Input -->
      <div class="pt-1 sm:pt-2">
        <div class="flex gap-2">
          <input
            v-model="promoCode"
            type="text"
            placeholder="🎫 Masukkan Kode Promo"
            class="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all outline-none text-xs sm:text-sm font-medium bg-white hover:border-slate-300"
            @keyup.enter="applyPromo"
          />
          <button
            @click="applyPromo"
            class="px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl font-bold hover:from-slate-700 hover:to-slate-800 hover:scale-105 shadow-md transition-all text-xs sm:text-sm"
          >
            ✓ Gunakan
          </button>
        </div>
        <transition name="message">
          <p
            v-if="promoMessage"
            class="text-xs mt-2 font-medium flex items-center gap-1"
            :class="promoSuccess ? 'text-green-600' : 'text-red-600'"
          >
            <span>{{ promoSuccess ? "✓" : "⚠️" }}</span>
            {{ promoMessage }}
          </p>
        </transition>
      </div>

      <transition name="discount">
        <div
          v-if="discount > 0"
          class="flex justify-between text-xs sm:text-sm p-2 sm:p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200"
        >
          <span class="font-bold text-green-700">🎉 Diskon</span>
          <span class="font-bold text-green-700"
            >-{{ formatPrice(discount) }}</span
          >
        </div>
      </transition>

      <div
        class="flex justify-between text-base sm:text-lg md:text-xl font-bold pt-3 sm:pt-4 mt-3 sm:mt-4 p-3 sm:p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200"
      >
        <span class="text-slate-900">Total Pembayaran</span>
        <span class="text-amber-700">{{ formatPrice(total) }}</span>
      </div>

      <!-- Fitur 10: Animated Checkout Button -->
      <button
        @click="checkout"
        class="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold py-3 sm:py-4 rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-amber-600/30 hover:shadow-2xl hover:shadow-amber-600/40 text-sm sm:text-base md:text-lg"
      >
        🛍️ Checkout Sekarang
      </button>
    </div>

    <!-- Menu Selector Modal -->
    <transition name="modal">
      <div
        v-if="showMenuSelector"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="showMenuSelector = false"
      >
        <div
          class="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
        >
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg"
              >
                <span class="text-xl">🍽️</span>
              </div>
              <h4 class="text-2xl font-bold text-slate-900 tracking-tight">
                Pilih Menu
              </h4>
            </div>
            <button
              @click="showMenuSelector = false"
              class="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl p-2 transition-all"
            >
              <svg
                class="w-6 h-6"
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

          <div class="grid gap-4 md:grid-cols-2">
            <button
              v-for="menu in availableMenus"
              :key="menu.id"
              @click="addToCart(menu)"
              class="flex gap-3 p-4 border-2 border-slate-200 rounded-2xl hover:border-amber-500 hover:bg-amber-50 hover:shadow-lg transition-all text-left group hover:scale-105"
            >
              <img
                :src="menu.image"
                :alt="menu.name"
                class="w-20 h-20 rounded-xl object-cover shadow-md group-hover:shadow-lg transition-all"
              />
              <div class="flex-1 min-w-0">
                <h5 class="font-bold text-sm text-slate-900 truncate mb-1">
                  {{ menu.name }}
                </h5>
                <p class="text-xs text-slate-500 mb-2 font-medium">
                  {{ menu.category }}
                </p>
                <p class="font-bold text-amber-700 text-base">
                  {{ formatPrice(menu.price) }}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useCart } from "../composables/useCart";

// Emits
const emit = defineEmits(["checkout-success"]);

// Use cart composable
const {
  cart,
  addToCart: addToCartComposable,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart: clearCartComposable,
} = useCart();

// State
const showMenuSelector = ref(false);
const promoCode = ref("");
const promoMessage = ref("");
const promoSuccess = ref(false);
const appliedDiscount = ref(0);

// Available menus
const availableMenus = [
  {
    id: 1,
    name: "Nasi Goreng Spesial",
    category: "Main Course",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    name: "Sate Ayam Bumbu Kacang",
    category: "Main Course",
    price: 30000,
    image:
      "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    name: "Gado-Gado Nusantara",
    category: "Appetizer",
    price: 20000,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 4,
    name: "Soto Ayam Kuning",
    category: "Main Course",
    price: 28000,
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 5,
    name: "Es Teh Manis",
    category: "Beverage",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 6,
    name: "Rendang Daging",
    category: "Main Course",
    price: 35000,
    image:
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=300&q=80",
  },
];

// Computed
const subtotal = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

const tax = computed(() => {
  return Math.round(subtotal.value * 0.1);
});

const discount = computed(() => {
  return appliedDiscount.value;
});

const total = computed(() => {
  return subtotal.value + tax.value - discount.value;
});

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

const addToCart = (menu) => {
  addToCartComposable(menu);
  showMenuSelector.value = false;
};

const clearCart = () => {
  if (confirm("Yakin ingin mengosongkan keranjang?")) {
    clearCartComposable();
    promoCode.value = "";
    promoMessage.value = "";
    appliedDiscount.value = 0;
  }
};

const applyPromo = () => {
  const code = promoCode.value.toUpperCase().trim();

  if (!code) {
    promoMessage.value = "Masukkan kode promo";
    promoSuccess.value = false;
    return;
  }

  // Valid promo codes
  const promoCodes = {
    PAWON10: 10, // 10% discount
    PAWON20: 20, // 20% discount
    HEMAT5: 5000, // Rp 5,000 discount
  };

  if (promoCodes.hasOwnProperty(code)) {
    const promoValue = promoCodes[code];

    if (promoValue <= 100) {
      // Percentage discount
      appliedDiscount.value = Math.round(subtotal.value * (promoValue / 100));
      promoMessage.value = `Selamat! Diskon ${promoValue}% berhasil diterapkan`;
    } else {
      // Fixed amount discount
      appliedDiscount.value = promoValue;
      promoMessage.value = `Selamat! Diskon ${formatPrice(
        promoValue
      )} berhasil diterapkan`;
    }

    promoSuccess.value = true;
  } else {
    promoMessage.value = "Kode promo tidak valid";
    promoSuccess.value = false;
    appliedDiscount.value = 0;
  }
};

const checkout = () => {
  // Emit event untuk menampilkan review form
  emit("checkout-success", {
    total: total.value,
    items: cart.value.length,
  });

  // Reset cart
  clearCartComposable();
  promoCode.value = "";
  promoMessage.value = "";
  appliedDiscount.value = 0;
};
</script>

<style scoped>
/* List transition */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px) scale(0.95);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.95);
}

.list-move {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Modal transition */
.modal-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.9) translateY(20px);
}

/* Message transition */
.message-enter-active,
.message-leave-active {
  transition: all 0.3s ease;
}

.message-enter-from,
.message-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Discount transition */
.discount-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.discount-leave-active {
  transition: all 0.3s ease;
}

.discount-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(-20px);
}

.discount-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
