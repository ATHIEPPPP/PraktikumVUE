<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <Navbar />

    <main class="flex-1">
      <section class="bg-amber-700 text-white py-12">
        <div class="container mx-auto px-4">
          <h1 class="text-3xl md:text-4xl font-bold mb-2">Galeri Pawon</h1>
          <p class="text-sm text-amber-100 max-w-xl">
            Dokumentasi suasana warung, hidangan, dan momen kebersamaan.
          </p>
        </div>
      </section>

      <section class="container mx-auto px-4 py-10">
        <div class="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          <div
            v-for="(img, idx) in images"
            :key="idx"
            class="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
          >
            <img
              :src="img.src"
              :alt="img.alt"
              class="h-44 w-full object-cover hover:scale-110 transition-transform"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  </div>
</template>

<script setup>
import Footer from "../components/Footer.vue";
import Navbar from "../components/Navbar.vue";

const images = [
  {
    src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80",
    alt: "Suasana meja makan",
  },
  {
    src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80",
    alt: "Hidangan lengkap",
  },
  {
    src: "https://images.unsplash.com/photo-1559620192-032c4bc4674e?auto=format&fit=crop&w=900&q=80",
    alt: "Menu nusantara",
  },
  {
    src: "https://images.unsplash.com/photo-1544022613-8e45f7c87a58?auto=format&fit=crop&w=900&q=80",
    alt: "Suasana warung",
  },
  {
    src: "https://images.unsplash.com/photo-1544022613-8e45f7c87a58?auto=format&fit=crop&w=900&q=80",
    alt: "Meja bar",
  },
  {
    src: "https://images.unsplash.com/photo-1484659619207-9165d119dafe?auto=format&fit=crop&w=900&q=80",
    alt: "Dapur terbuka",
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
    alt: "Penyajian makanan",
  },
  {
    src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80",
    alt: "Makan bersama",
  },
];
</script>
