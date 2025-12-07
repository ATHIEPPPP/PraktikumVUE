<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <Navbar />

    <main class="flex-1">
      <!-- Hero Section -->
      <section
        class="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50"
      >
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.25),transparent_60%)]"
        ></div>

        <div class="relative container mx-auto px-4 py-16 md:py-20 text-center">
          <span
            class="inline-flex items-center rounded-full bg-amber-100 px-4 py-1.5 text-xs font-medium text-amber-700 mb-4"
          >
            📸 Galeri Foto Pawon
          </span>
          <h1
            class="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4"
          >
            Suasana <span class="text-amber-700">Tradisional</span> Kami
          </h1>
          <p class="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            Rasakan kehangatan suasana warung tradisional Nusantara, dengan
            dekorasi kayu dan sentuhan rumahan yang membuat Anda merasa seperti
            di rumah sendiri
          </p>
        </div>
      </section>

      <!-- Gallery Categories -->
      <section class="container mx-auto px-4 py-12">
        <div class="flex flex-wrap justify-center gap-3 mb-10">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectedCategory = cat"
            class="px-6 py-2.5 rounded-full text-sm font-semibold border-2 transition-all"
            :class="
              selectedCategory === cat
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white border-amber-600 shadow-lg'
                : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300 hover:bg-amber-50'
            "
          >
            {{ cat }}
          </button>
        </div>

        <!-- Gallery Grid -->
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(img, idx) in filteredImages"
            :key="idx"
            class="group relative overflow-hidden rounded-3xl border-2 border-slate-100 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            @click="openLightbox(img, idx)"
          >
            <div class="aspect-[4/3] overflow-hidden">
              <img
                :src="img.src"
                :alt="img.alt"
                class="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
            >
              <div class="p-6 w-full">
                <span
                  class="inline-block px-3 py-1 bg-amber-600 text-white text-xs font-bold rounded-full mb-2"
                >
                  {{ img.category }}
                </span>
                <h3 class="text-white font-bold text-lg mb-1">
                  {{ img.title }}
                </h3>
                <p class="text-amber-100 text-sm">{{ img.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Lightbox Modal -->
      <transition name="modal">
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          @click.self="closeLightbox"
        >
          <button
            @click="closeLightbox"
            class="absolute top-6 right-6 text-white hover:text-amber-400 transition-colors z-10"
          >
            <svg
              class="w-10 h-10"
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

          <!-- Previous Button -->
          <button
            v-if="currentImageIndex > 0"
            @click="previousImage"
            class="absolute left-6 text-white hover:text-amber-400 transition-colors z-10"
          >
            <svg
              class="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <!-- Image -->
          <div class="max-w-6xl w-full">
            <img
              :src="currentImage.src"
              :alt="currentImage.alt"
              class="w-full h-auto rounded-2xl shadow-2xl"
            />
            <div class="text-center mt-6">
              <span
                class="inline-block px-4 py-1.5 bg-amber-600 text-white text-sm font-bold rounded-full mb-3"
              >
                {{ currentImage.category }}
              </span>
              <h3 class="text-white font-bold text-2xl mb-2">
                {{ currentImage.title }}
              </h3>
              <p class="text-amber-100">{{ currentImage.description }}</p>
            </div>
          </div>

          <!-- Next Button -->
          <button
            v-if="currentImageIndex < filteredImages.length - 1"
            @click="nextImage"
            class="absolute right-6 text-white hover:text-amber-400 transition-colors z-10"
          >
            <svg
              class="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </transition>

      <Footer />
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import Footer from "../components/Footer.vue";
import Navbar from "../components/Navbar.vue";

const selectedCategory = ref("Semua");
const lightboxOpen = ref(false);
const currentImageIndex = ref(0);
const currentImage = ref({});

const categories = [
  "Semua",
  "Suasana Warung",
  "Dekorasi Tradisional",
  "Menu Kami",
  "Kebersamaan",
];

const images = [
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    alt: "Suasana warung makan tradisional",
    title: "Warung Kami",
    description: "Suasana hangat dan nyaman dengan dekorasi kayu tradisional",
    category: "Suasana Warung",
  },
  {
    src: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1200&q=80",
    alt: "Interior warung dengan meja kayu",
    title: "Interior Tradisional",
    description: "Meja dan kursi kayu yang kokoh dengan sentuhan Nusantara",
    category: "Dekorasi Tradisional",
  },
  {
    src: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80",
    alt: "Nasi goreng spesial",
    title: "Nasi Goreng Spesial",
    description: "Hidangan signature kami yang selalu jadi favorit",
    category: "Menu Kami",
  },
  {
    src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
    alt: "Soto ayam kuning",
    title: "Soto Ayam Tradisional",
    description: "Kuah kuning yang gurih dengan bumbu rempah pilihan",
    category: "Menu Kami",
  },
  {
    src: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?auto=format&fit=crop&w=1200&q=80",
    alt: "Sate ayam",
    title: "Sate Ayam Bumbu Kacang",
    description: "Sate ayam dengan bumbu kacang khas yang legit",
    category: "Menu Kami",
  },
  {
    src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
    alt: "Hiasan dinding tradisional",
    title: "Dekorasi Etnik",
    description: "Hiasan dinding dengan nuansa etnik Indonesia",
    category: "Dekorasi Tradisional",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    alt: "Keluarga makan bersama",
    title: "Makan Bersama Keluarga",
    description: "Momen kebersamaan yang hangat di Pawon",
    category: "Kebersamaan",
  },
  {
    src: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=80",
    alt: "Rendang daging",
    title: "Rendang Daging Padang",
    description: "Rendang empuk dengan bumbu rempah yang kaya",
    category: "Menu Kami",
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    alt: "Hidangan lengkap",
    title: "Hidangan Komplit",
    description: "Berbagai pilihan menu dalam satu meja",
    category: "Menu Kami",
  },
  {
    src: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1200&q=80",
    alt: "Sudut warung",
    title: "Sudut Favorit",
    description: "Spot nyaman untuk menikmati hidangan",
    category: "Suasana Warung",
  },
  {
    src: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1200&q=80",
    alt: "Es teh manis",
    title: "Minuman Segar",
    description: "Es teh manis yang sempurna menemani makan",
    category: "Menu Kami",
  },
  {
    src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80",
    alt: "Teman ngobrol",
    title: "Ngobrol Santai",
    description: "Tempat yang pas untuk ngobrol dengan teman",
    category: "Kebersamaan",
  },
];

const filteredImages = computed(() => {
  if (selectedCategory.value === "Semua") return images;
  return images.filter((img) => img.category === selectedCategory.value);
});

const openLightbox = (img, idx) => {
  currentImage.value = img;
  currentImageIndex.value = idx;
  lightboxOpen.value = true;
};

const closeLightbox = () => {
  lightboxOpen.value = false;
};

const nextImage = () => {
  if (currentImageIndex.value < filteredImages.value.length - 1) {
    currentImageIndex.value++;
    currentImage.value = filteredImages.value[currentImageIndex.value];
  }
};

const previousImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
    currentImage.value = filteredImages.value[currentImageIndex.value];
  }
};

// Keyboard navigation
const handleKeydown = (e) => {
  if (!lightboxOpen.value) return;

  if (e.key === "Escape") {
    closeLightbox();
  } else if (e.key === "ArrowRight") {
    nextImage();
  } else if (e.key === "ArrowLeft") {
    previousImage();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
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

.modal-enter-from img,
.modal-leave-to img {
  transform: scale(0.9);
}
</style>
