<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <Navbar />

    <main class="flex-1">
      <!-- Hero Section -->
      <section
        class="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border-b border-slate-100"
      >
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.25),transparent_60%)]"
        ></div>

        <div class="relative container mx-auto px-4 py-12 text-center">
          <span
            class="inline-flex items-center rounded-full bg-amber-100 px-4 py-1.5 text-xs font-medium text-amber-700 mb-3"
          >
            🍽️ Pesan Sekarang
          </span>
          <h1
            class="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3"
          >
            Keranjang <span class="text-amber-700">Pesanan</span> Anda
          </h1>
          <p class="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            Kelola pesanan Anda dan nikmati kelezatan masakan Nusantara di Pawon
          </p>
        </div>
      </section>

      <!-- Main Content -->
      <section class="container mx-auto px-4 py-12">
        <div class="max-w-4xl mx-auto">
          <!-- Order Cart Section -->
          <OrderCart @checkout-success="showReviewForm" />

          <!-- Promo Code Hints -->
          <div class="mt-6 sm:mt-8">
            <div
              class="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-4 sm:p-6 shadow-lg"
            >
              <div class="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div
                  class="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-600 flex items-center justify-center shadow-md"
                >
                  <span class="text-lg sm:text-xl">💡</span>
                </div>
                <div>
                  <h4
                    class="font-bold text-amber-900 text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1"
                  >
                    Kode Promo Tersedia
                  </h4>
                  <p class="text-xs sm:text-sm text-amber-700">
                    Gunakan kode di bawah untuk mendapatkan diskon spesial!
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-2 sm:gap-3">
                <div
                  class="bg-white rounded-lg sm:rounded-xl p-2 sm:p-4 border-2 border-amber-200 hover:shadow-md transition-all"
                >
                  <code
                    class="block bg-amber-100 px-2 sm:px-3 py-1 sm:py-2 rounded-lg font-mono font-bold text-amber-900 text-center mb-1 sm:mb-2 text-[10px] sm:text-sm"
                    >PAWON10</code
                  >
                  <p class="text-[10px] sm:text-xs text-slate-600 text-center">
                    Diskon 10%
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg sm:rounded-xl p-2 sm:p-4 border-2 border-amber-200 hover:shadow-md transition-all"
                >
                  <code
                    class="block bg-amber-100 px-2 sm:px-3 py-1 sm:py-2 rounded-lg font-mono font-bold text-amber-900 text-center mb-1 sm:mb-2 text-[10px] sm:text-sm"
                    >PAWON20</code
                  >
                  <p class="text-[10px] sm:text-xs text-slate-600 text-center">
                    Diskon 20%
                  </p>
                </div>
                <div
                  class="bg-white rounded-lg sm:rounded-xl p-2 sm:p-4 border-2 border-amber-200 hover:shadow-md transition-all"
                >
                  <code
                    class="block bg-amber-100 px-2 sm:px-3 py-1 sm:py-2 rounded-lg font-mono font-bold text-amber-900 text-center mb-1 sm:mb-2 text-[10px] sm:text-sm"
                    >HEMAT5</code
                  >
                  <p class="text-[10px] sm:text-xs text-slate-600 text-center">
                    -Rp 5.000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>

    <!-- Review Modal - Muncul setelah checkout -->
    <transition name="modal">
      <div
        v-if="showReview"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="closeReviewModal"
      >
        <div class="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <button
            @click="closeReviewModal"
            class="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-slate-100 transition-colors"
          >
            <svg
              class="w-5 h-5 text-slate-600"
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

          <div class="bg-white rounded-2xl p-6">
            <div class="text-center mb-6">
              <div class="text-6xl mb-4">🎉</div>
              <h3 class="text-2xl font-bold text-slate-900 mb-2">
                Pesanan Berhasil!
              </h3>
              <p class="text-slate-600">
                Terima kasih telah memesan di Pawon Nusantara
              </p>
            </div>

            <ReviewForm @review-submitted="handleReviewSubmitted" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Footer from "../components/Footer.vue";
import Navbar from "../components/Navbar.vue";
import OrderCart from "../components/OrderCart.vue";
import ReviewForm from "../components/ReviewForm.vue";

const showReview = ref(false);

const showReviewForm = () => {
  showReview.value = true;
};

const closeReviewModal = () => {
  showReview.value = false;
};

const handleReviewSubmitted = () => {
  setTimeout(() => {
    showReview.value = false;
  }, 2000);
};
</script>

<style scoped>
/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.9) translateY(20px);
}
</style>
