<template>
  <div class="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 max-w-4xl mx-auto">
    <div class="flex items-start gap-4 mb-6">
      <div class="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/30">
        <span class="text-2xl">🖼️</span>
      </div>
      <div>
        <h3 class="text-2xl font-bold text-slate-900 tracking-tight mb-1">Galeri Foto</h3>
        <p class="text-sm text-slate-500">Lihat suasana dan hidangan kami</p>
      </div>
    </div>

    <!-- Fitur 4: Image Carousel dengan Navigation -->
    <div class="relative group">
      <!-- Main Image Display -->
      <div class="relative overflow-hidden rounded-2xl aspect-video bg-slate-100 shadow-2xl shadow-slate-300/50">
        <transition name="slide" mode="out-in">
          <img
            :key="currentIndex"
            :src="images[currentIndex].url"
            :alt="images[currentIndex].caption"
            class="w-full h-full object-cover"
          />
        </transition>

        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>
        
        <!-- Caption -->
        <div class="absolute bottom-0 left-0 right-0 p-6 text-white backdrop-blur-sm bg-black/20">
          <h4 class="font-bold text-xl mb-1 drop-shadow-lg">{{ images[currentIndex].caption }}</h4>
          <p class="text-sm text-slate-100 drop-shadow">{{ images[currentIndex].description }}</p>
        </div>

        <!-- Navigation Buttons -->
        <button
          @click="prevImage"
          class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm hover:bg-white text-slate-900 rounded-xl p-3.5 shadow-2xl transition-all opacity-0 group-hover:opacity-100 hover:scale-110 hover:-translate-x-1 active:scale-95 border border-white/50"
          aria-label="Previous image"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <button
          @click="nextImage"
          class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm hover:bg-white text-slate-900 rounded-xl p-3.5 shadow-2xl transition-all opacity-0 group-hover:opacity-100 hover:scale-110 hover:translate-x-1 active:scale-95 border border-white/50"
          aria-label="Next image"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <!-- Image Counter -->
        <div class="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg border border-white/20">
          {{ currentIndex + 1 }} / {{ images.length }}
        </div>
      </div>

      <!-- Fitur 5: Thumbnail Navigation dengan Click -->
      <div class="flex gap-3 mt-6 overflow-x-auto pb-2">
        <button
          v-for="(image, index) in images"
          :key="index"
          @click="goToImage(index)"
          class="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-3 transition-all hover:scale-110 hover:shadow-xl relative group/thumb"
          :class="
            currentIndex === index
              ? 'border-amber-600 shadow-xl shadow-amber-500/30 ring-2 ring-amber-200'
              : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-amber-400'
          "
        >
          <img
            :src="image.url"
            :alt="image.caption"
            class="w-full h-full object-cover"
          />
        </button>
      </div>

      <!-- Fitur 6: Auto-play Toggle -->
      <div class="flex items-center justify-between mt-6 pt-6 border-t-2 border-slate-100">
        <div class="flex items-center gap-3">
          <button
            @click="toggleAutoPlay"
            class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-md"
            :class="
              isAutoPlaying
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-amber-500/30 hover:shadow-lg hover:shadow-amber-500/40'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            "
          >
            <span v-if="isAutoPlaying" class="text-base">⏸</span>
            <span v-else class="text-base">▶</span>
            {{ isAutoPlaying ? 'Pause' : 'Auto Play' }}
          </button>
          
          <!-- Fitur 7: Speed Control -->
          <select
            v-model="autoPlaySpeed"
            @change="resetAutoPlay"
            class="px-4 py-2.5 rounded-xl border-2 border-slate-200 text-sm font-medium outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 cursor-pointer bg-white hover:border-slate-300 transition-all"
          >
            <option :value="2000">Cepat (2s)</option>
            <option :value="3000">Normal (3s)</option>
            <option :value="5000">Lambat (5s)</option>
          </select>
        </div>

        <!-- Progress Indicator -->
        <div v-if="isAutoPlaying" class="flex gap-1.5">
          <div
            v-for="(_, index) in images"
            :key="index"
            class="h-1.5 rounded-full transition-all"
            :class="
              index === currentIndex
                ? 'w-8 bg-amber-600'
                : 'w-1.5 bg-slate-300'
            "
          ></div>
        </div>
      </div>
    </div>

    <!-- Keyboard Hint -->
    <div class="flex items-center justify-center gap-2 mt-6 p-3 bg-slate-50 rounded-xl border border-slate-200">
      <span class="text-slate-400">💡</span>
      <p class="text-xs font-medium text-slate-600">
        Gunakan tombol <kbd class="px-2 py-1 bg-white border border-slate-300 rounded shadow-sm font-mono text-xs">←</kbd> <kbd class="px-2 py-1 bg-white border border-slate-300 rounded shadow-sm font-mono text-xs">→</kbd> untuk navigasi
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

// State
const currentIndex = ref(0);
const isAutoPlaying = ref(false);
const autoPlaySpeed = ref(3000);
let autoPlayInterval = null;

// Images data
const images = ref([
  {
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    caption: 'Suasana Pawon Nusantara',
    description: 'Interior yang hangat dan nyaman'
  },
  {
    url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
    caption: 'Nasi Goreng Spesial',
    description: 'Menu favorit pelanggan'
  },
  {
    url: 'https://images.unsplash.com/photo-1604908176997-1251884b08a2?auto=format&fit=crop&w=1200&q=80',
    caption: 'Sate Ayam Bumbu Kacang',
    description: 'Dibakar dengan sempurna'
  },
  {
    url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80',
    caption: 'Fresh Ingredients',
    description: 'Bahan-bahan segar setiap hari'
  },
  {
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
    caption: 'Makan Bersama',
    description: 'Moment kebersamaan yang indah'
  },
]);

// Methods
const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
};

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
};

const goToImage = (index) => {
  currentIndex.value = index;
  if (isAutoPlaying.value) {
    resetAutoPlay();
  }
};

const toggleAutoPlay = () => {
  isAutoPlaying.value = !isAutoPlaying.value;
  if (isAutoPlaying.value) {
    startAutoPlay();
  } else {
    stopAutoPlay();
  }
};

const startAutoPlay = () => {
  stopAutoPlay();
  autoPlayInterval = setInterval(() => {
    nextImage();
  }, autoPlaySpeed.value);
};

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
};

const resetAutoPlay = () => {
  if (isAutoPlaying.value) {
    startAutoPlay();
  }
};

// Keyboard navigation
const handleKeyboard = (e) => {
  if (e.key === 'ArrowLeft') {
    prevImage();
  } else if (e.key === 'ArrowRight') {
    nextImage();
  }
};

// Lifecycle
onMounted(() => {
  window.addEventListener('keydown', handleKeyboard);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyboard);
  stopAutoPlay();
});
</script>

<style scoped>
/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Scrollbar styling */
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
