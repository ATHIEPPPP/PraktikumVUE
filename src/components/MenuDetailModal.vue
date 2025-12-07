<template>
  <transition name="modal-fade">
    <div
      v-if="isOpen && menu"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      @click.self="close"
    >
      <transition name="modal-scale">
        <div
          v-if="isOpen"
          class="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl shadow-slate-900/40 border border-slate-100 max-h-[90vh] overflow-y-auto"
        >
          <!-- Header gambar -->
          <div class="relative h-40 overflow-hidden">
            <img
              :src="menu.image"
              :alt="menu.name"
              class="h-full w-full object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
            ></div>
            <button
              class="absolute top-2 right-2 text-slate-100 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-1.5 text-xs leading-none shadow-lg"
              @click="close"
            >
              ✕
            </button>
          </div>

          <div
            class="p-4 space-y-3 bg-gradient-to-b from-white via-white to-amber-50/40"
          >
            <div class="flex items-start justify-between gap-2">
              <div>
                <p
                  class="inline-flex items-center gap-1 text-[9px] uppercase tracking-wide text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-full"
                >
                  ● {{ menu.category }}
                </p>
                <h2
                  class="mt-1.5 text-lg font-bold text-slate-900 tracking-tight"
                >
                  {{ menu.name }}
                </h2>
              </div>
            </div>

            <p class="text-xs text-slate-600">
              {{ menu.description }}
            </p>

            <div class="grid grid-cols-2 gap-2 text-xs text-slate-600">
              <div class="space-y-0.5">
                <p class="font-semibold text-slate-900 text-[11px]">Harga</p>
                <p class="text-[11px]">{{ menu.price }}</p>
              </div>
              <div class="space-y-0.5">
                <p class="font-semibold text-slate-900 text-[11px]">
                  Waktu Masak
                </p>
                <p class="text-[11px]">{{ menu.cookTime }}</p>
              </div>
              <div class="space-y-0.5">
                <p class="font-semibold text-slate-900 text-[11px]">Porsi</p>
                <p class="text-[11px]">{{ menu.servings }}</p>
              </div>
              <div class="space-y-0.5">
                <p class="font-semibold text-slate-900 text-[11px]">
                  Level Pedas
                </p>
                <p class="text-[11px]">{{ menu.spiceLevel }}</p>
              </div>
            </div>

            <div v-if="menu.ingredients?.length" class="pt-1">
              <p class="text-[11px] font-semibold text-slate-900 mb-1">
                Bahan utama:
              </p>
              <ul class="flex flex-wrap gap-1.5 text-[10px] text-slate-600">
                <li
                  v-for="(ing, idx) in menu.ingredients"
                  :key="idx"
                  class="px-2 py-0.5 rounded-full bg-slate-100"
                >
                  {{ ing }}
                </li>
              </ul>
            </div>

            <!-- Quantity Selector -->
            <div class="pt-3 border-t border-slate-200">
              <div class="flex items-center justify-between mb-3">
                <div>
                  <p class="text-xs font-semibold text-slate-900 mb-0.5">
                    Jumlah Porsi
                  </p>
                  <p class="text-[10px] text-slate-500">
                    Pilih jumlah yang ingin dipesan
                  </p>
                </div>
                <div
                  class="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5"
                >
                  <button
                    @click="decrementQuantity"
                    class="px-3 py-1.5 text-slate-600 hover:text-amber-700 hover:bg-white rounded-md transition-all font-bold text-base shadow-sm"
                    :disabled="quantity <= 1"
                    :class="{ 'opacity-30 cursor-not-allowed': quantity <= 1 }"
                  >
                    −
                  </button>
                  <span
                    class="w-10 text-center font-bold text-base text-slate-900"
                    >{{ quantity }}</span
                  >
                  <button
                    @click="incrementQuantity"
                    class="px-3 py-1.5 text-slate-600 hover:text-amber-700 hover:bg-white rounded-md transition-all font-bold text-base shadow-sm"
                    :disabled="quantity >= 99"
                    :class="{ 'opacity-30 cursor-not-allowed': quantity >= 99 }"
                  >
                    +
                  </button>
                </div>
              </div>

              <!-- Total Price -->
              <div
                class="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 mb-3"
              >
                <span class="text-xs font-semibold text-slate-700"
                  >Total Harga</span
                >
                <span class="text-lg font-bold text-amber-700">{{
                  formatTotalPrice()
                }}</span>
              </div>
            </div>

            <div class="flex gap-2">
              <button
                class="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 px-4 py-2.5 text-xs font-bold text-white hover:from-amber-700 hover:to-amber-800 transition-all shadow-md hover:shadow-lg hover:scale-105"
                @click="handleAddToCart"
                :disabled="addedToCart"
              >
                <span class="text-base">🛒</span>
                {{ addedToCart ? "Ditambahkan!" : `Tambah ${quantity} Porsi` }}
              </button>
              <button
                class="inline-flex items-center rounded-xl border-2 border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all"
                @click="close"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useCart } from "../composables/useCart";

const { addToCart } = useCart();
const router = useRouter();
const addedToCart = ref(false);
const quantity = ref(1);

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

// Reset quantity when modal opens/closes
watch(
  () => props.isOpen,
  (newVal) => {
    if (!newVal) {
      quantity.value = 1;
      addedToCart.value = false;
    }
  }
);

const close = () => {
  quantity.value = 1;
  addedToCart.value = false;
  emit("close");
};

const incrementQuantity = () => {
  if (quantity.value < 99) {
    quantity.value++;
  }
};

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const formatTotalPrice = () => {
  if (!props.menu) return "Rp 0";
  const priceNumber = parseInt(props.menu.price.replace(/\D/g, ""));
  const total = priceNumber * quantity.value;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(total);
};

// Handle ESC key to close modal
const handleEscape = (event) => {
  if (event.key === "Escape" && props.isOpen) {
    close();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleEscape);
});

const handleAddToCart = () => {
  if (props.menu) {
    // Convert price string to number
    const priceNumber = parseInt(props.menu.price.replace(/\D/g, ""));

    const cartItem = {
      id: props.menu.id,
      name: props.menu.name,
      price: priceNumber,
      image: props.menu.image,
      category: props.menu.category,
    };

    // Add item with specified quantity
    for (let i = 0; i < quantity.value; i++) {
      addToCart(cartItem);
    }

    addedToCart.value = true;

    // Auto close after 1.5 seconds
    setTimeout(() => {
      addedToCart.value = false;
      close();
    }, 1500);
  }
};
</script>

<style scoped>
/* Modal fade animation for overlay */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Modal scale animation for content */
.modal-scale-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-scale-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 1, 1);
}

.modal-scale-enter-from {
  opacity: 0;
  transform: scale(0.7) translateY(-30px);
}

.modal-scale-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
}
</style>
