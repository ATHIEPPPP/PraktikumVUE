<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <Navbar />

    <main class="flex-1">
      <!-- Hero Section -->
      <section class="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border-b border-slate-100">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.25),transparent_60%)]"></div>
        
        <div class="relative container mx-auto px-4 py-16 text-center">
          <span class="inline-flex items-center rounded-full bg-amber-100 px-4 py-1.5 text-xs font-medium text-amber-700 mb-4">
            🍽️ Pesan Sekarang
          </span>
          <h1 class="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Pesan <span class="text-amber-700">Menu Favorit</span> Anda
          </h1>
          <p class="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            Pilih menu favorit Anda dan nikmati kelezatan masakan Nusantara di Pawon
          </p>
        </div>
      </section>

      <!-- Main Content -->
      <section class="container mx-auto px-4 py-12">
        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Image Carousel Section -->
          <div>
            <ImageCarousel />
          </div>

          <!-- Order Cart Section -->
          <div>
            <OrderCart @checkout-success="showReviewForm" />
          </div>
        </div>

        <!-- Promo Code Hints -->
        <div class="mt-8 max-w-2xl mx-auto">
          <div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 class="font-semibold text-amber-900 mb-2">💡 Kode Promo yang Tersedia:</h4>
            <ul class="space-y-1 text-sm text-amber-800">
              <li>• <code class="bg-amber-100 px-2 py-0.5 rounded font-mono">PAWON10</code> - Diskon 10%</li>
              <li>• <code class="bg-amber-100 px-2 py-0.5 rounded font-mono">PAWON20</code> - Diskon 20%</li>
              <li>• <code class="bg-amber-100 px-2 py-0.5 rounded font-mono">HEMAT5</code> - Diskon Rp 5.000</li>
            </ul>
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
            <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          
          <div class="bg-white rounded-2xl p-6">
            <div class="text-center mb-6">
              <div class="text-6xl mb-4">🎉</div>
              <h3 class="text-2xl font-bold text-slate-900 mb-2">Pesanan Berhasil!</h3>
              <p class="text-slate-600">Terima kasih telah memesan di Pawon Nusantara</p>
            </div>
            
            <ReviewForm @review-submitted="handleReviewSubmitted" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Footer from '../components/Footer.vue';
import ImageCarousel from '../components/ImageCarousel.vue';
import Navbar from '../components/Navbar.vue';
import OrderCart from '../components/OrderCart.vue';
import ReviewForm from '../components/ReviewForm.vue';

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
