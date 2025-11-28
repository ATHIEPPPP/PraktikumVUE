<template>
  <div class="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 max-w-2xl mx-auto">
    <div class="flex items-start gap-4 mb-6">
      <div class="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/30">
        <span class="text-2xl">⭐</span>
      </div>
      <div>
        <h3 class="text-2xl font-bold text-slate-900 tracking-tight mb-1">Tulis Review Anda</h3>
        <p class="text-sm text-slate-500">Bagikan pengalaman Anda makan di Pawon Nusantara</p>
      </div>
    </div>

    <!-- Fitur 1: Star Rating System (Interactive) -->
    <div class="mb-8">
      <label class="block text-sm font-bold text-slate-900 mb-3">Rating</label>
      <div class="flex gap-3 items-center p-4 bg-slate-50 rounded-2xl border-2 border-slate-100">
        <button
          v-for="star in 5"
          :key="star"
          @click="setRating(star)"
          @mouseenter="hoverRating = star"
          @mouseleave="hoverRating = 0"
          class="text-4xl transition-all hover:scale-125 focus:outline-none active:scale-110 drop-shadow-sm"
          :class="star <= (hoverRating || rating) ? 'text-amber-500 animate-pulse-once' : 'text-slate-300'"
        >
          {{ star <= (hoverRating || rating) ? '★' : '☆' }}
        </button>
        <div class="ml-auto text-right">
          <p class="text-lg font-bold text-amber-700">
            {{ ratingText }}
          </p>
          <p class="text-xs text-slate-400">{{ rating }}/5</p>
        </div>
      </div>
    </div>

    <!-- Fitur 2: Form dengan Validasi Real-time -->
    <form @submit.prevent="submitReview" class="space-y-4">
      <div>
        <label class="block text-sm font-bold text-slate-900 mb-2">Nama</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Masukkan nama Anda"
          class="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all outline-none text-sm bg-white hover:border-slate-300"
          :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-100': errors.name }"
        />
        <transition name="error">
          <p v-if="errors.name" class="text-xs text-red-500 mt-2 flex items-center gap-1">
            <span>⚠️</span> {{ errors.name }}
          </p>
        </transition>
      </div>

      <div>
        <label class="block text-sm font-bold text-slate-900 mb-2">Email</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="email@example.com"
          class="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all outline-none text-sm bg-white hover:border-slate-300"
          :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-100': errors.email }"
        />
        <transition name="error">
          <p v-if="errors.email" class="text-xs text-red-500 mt-2 flex items-center gap-1">
            <span>⚠️</span> {{ errors.email }}
          </p>
        </transition>
      </div>

      <div>
        <label class="block text-sm font-bold text-slate-900 mb-2">Review Anda</label>
        <textarea
          v-model="form.review"
          rows="5"
          placeholder="Ceritakan pengalaman Anda..."
          class="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all outline-none text-sm resize-none bg-white hover:border-slate-300"
          :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-100': errors.review }"
        ></textarea>
        <div class="flex items-center justify-between mt-2">
          <transition name="error">
            <p v-if="errors.review" class="text-xs text-red-500 flex items-center gap-1">
              <span>⚠️</span> {{ errors.review }}
            </p>
          </transition>
          <p class="text-xs font-medium ml-auto" :class="form.review.length > 450 ? 'text-red-500' : 'text-slate-400'">
            {{ form.review.length }}/500
          </p>
        </div>
      </div>

      <!-- Fitur 3: Toggle Checkbox (Rekomendasi) -->
      <div class="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border-2 border-amber-100 hover:bg-amber-100 transition-all">
        <input
          v-model="form.recommend"
          type="checkbox"
          id="recommend"
          class="w-5 h-5 rounded-lg border-2 border-amber-300 text-amber-600 focus:ring-4 focus:ring-amber-200 cursor-pointer transition-all"
        />
        <label for="recommend" class="text-sm text-slate-900 font-medium cursor-pointer flex-1">
          ✨ Saya merekomendasikan tempat ini kepada orang lain
        </label>
      </div>

      <!-- Submit Button dengan Loading State -->
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold py-4 rounded-xl hover:from-amber-700 hover:to-amber-800 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-600/30 hover:shadow-xl hover:shadow-amber-600/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
      >
        <span v-if="isSubmitting" class="animate-spin">⏳</span>
        <span v-else>📝</span>
        {{ isSubmitting ? 'Mengirim...' : 'Kirim Review' }}
      </button>
    </form>

    <!-- Success Message dengan Animasi -->
    <transition name="success">
      <div
        v-if="showSuccess"
        class="mt-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl shadow-lg"
      >
        <div class="flex items-center gap-3">
          <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center text-white text-xl">
            ✓
          </div>
          <div>
            <p class="font-bold text-green-900 text-sm mb-0.5">Berhasil!</p>
            <p class="text-xs text-green-700">Review Anda berhasil dikirim. Terima kasih atas feedback Anda!</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

// Emits
const emit = defineEmits(['review-submitted']);

// State
const rating = ref(0);
const hoverRating = ref(0);
const isSubmitting = ref(false);
const showSuccess = ref(false);

const form = ref({
  name: '',
  email: '',
  review: '',
  recommend: false,
});

const errors = ref({
  name: '',
  email: '',
  review: '',
});

// Computed
const ratingText = computed(() => {
  const currentRating = hoverRating.value || rating.value;
  const texts = ['Belum dinilai', 'Sangat Buruk', 'Buruk', 'Cukup', 'Baik', 'Sangat Baik'];
  return texts[currentRating];
});

// Methods
const setRating = (star) => {
  rating.value = star;
  errors.value.rating = '';
};

const validateForm = () => {
  let isValid = true;
  errors.value = { name: '', email: '', review: '' };

  if (!form.value.name.trim()) {
    errors.value.name = 'Nama harus diisi';
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.value.email.trim()) {
    errors.value.email = 'Email harus diisi';
    isValid = false;
  } else if (!emailRegex.test(form.value.email)) {
    errors.value.email = 'Format email tidak valid';
    isValid = false;
  }

  if (!form.value.review.trim()) {
    errors.value.review = 'Review harus diisi';
    isValid = false;
  } else if (form.value.review.length < 10) {
    errors.value.review = 'Review minimal 10 karakter';
    isValid = false;
  }

  if (rating.value === 0) {
    isValid = false;
  }

  return isValid;
};

const submitReview = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  
  // Simulasi API call
  setTimeout(() => {
    console.log('Review submitted:', {
      ...form.value,
      rating: rating.value,
    });
    
    // Reset form
    form.value = { name: '', email: '', review: '', recommend: false };
    rating.value = 0;
    isSubmitting.value = false;
    showSuccess.value = true;
    
    // Emit event bahwa review berhasil dikirim
    emit('review-submitted');
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);
  }, 1500);
};

// Watch for character limit
watch(() => form.value.review, (newValue) => {
  if (newValue.length > 500) {
    form.value.review = newValue.slice(0, 500);
  }
});
</script>

<style scoped>
/* Error transition */
.error-enter-active,
.error-leave-active {
  transition: all 0.3s ease;
}

.error-enter-from,
.error-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

/* Success transition */
.success-enter-active {
  transition: all 0.4s ease-out;
}

.success-leave-active {
  transition: all 0.3s ease-in;
}

.success-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

.success-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Pulse animation for stars */
@keyframes pulse-once {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.animate-pulse-once {
  animation: pulse-once 0.3s ease-in-out;
}
</style>
