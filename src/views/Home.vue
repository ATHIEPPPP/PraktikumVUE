<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <Navbar />

    <main class="flex-1">
      <!-- HERO -->
      <section
        class="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50"
      >
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.25),transparent_60%)]"
        ></div>
        <div
          class="absolute -top-10 -left-10 w-40 h-40 bg-amber-200/40 rounded-full blur-3xl"
        ></div>
        <div
          class="absolute -bottom-10 right-0 w-60 h-60 bg-rose-200/40 rounded-full blur-3xl"
        ></div>

        <div
          class="relative container mx-auto px-4 py-16 lg:py-20 flex flex-col lg:flex-row items-center gap-10"
        >
          <!-- Text -->
          <div class="flex-1 space-y-5">
            <span
              class="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700"
            >
              🍛 Autentik • Hangat • Rumahan
            </span>
            <h1
              class="text-3xl md:text-5xl font-bold tracking-tight text-slate-900"
            >
              Rasakan Hangatnya
              <span class="text-amber-700">Pawon Nusantara</span>
            </h1>
            <p class="text-sm md:text-base text-slate-600 max-w-xl">
              Sajian masakan rumahan khas Indonesia dengan cita rasa autentik,
              bahan segar, dan suasana hangat seperti di rumah sendiri.
            </p>

            <div class="flex flex-wrap gap-3">
              <router-link
                to="/menu"
                class="inline-flex items-center rounded-full bg-gradient-to-r from-amber-600 to-amber-700 px-5 py-2.5 text-xs md:text-sm font-semibold text-white shadow-md hover:from-amber-700 hover:to-amber-800 hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Lihat Menu
              </router-link>
              <router-link
                to="/contact"
                class="inline-flex items-center rounded-full border border-amber-600 px-5 py-2.5 text-xs md:text-sm font-semibold text-amber-700 bg-white/80 hover:bg-amber-50 transition-all shadow-sm hover:shadow-md"
              >
                Reservasi / Kontak
              </router-link>
            </div>

            <div class="grid grid-cols-2 gap-4 pt-4 text-xs">
              <div
                class="rounded-2xl border border-amber-100 bg-white/80 p-3 shadow-sm"
              >
                <p class="text-[11px] text-slate-500">Rating pelanggan</p>
                <p class="text-lg font-bold text-slate-900">4.8/5</p>
              </div>
              <div
                class="rounded-2xl border border-amber-100 bg-white/80 p-3 shadow-sm"
              >
                <p class="text-[11px] text-slate-500">Pilihan menu</p>
                <p class="text-lg font-bold text-slate-900">50+</p>
              </div>
            </div>
          </div>

          <!-- Gambar -->
          <div
            class="relative flex-1 max-w-md lg:max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-amber-100 bg-white"
          >
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
              alt="Suasana warung makan"
              class="h-full w-full object-cover"
            />
            <div
              class="absolute top-6 left-6 rounded-2xl bg-white/90 backdrop-blur px-4 py-3 shadow-lg max-w-[180px] border border-amber-50"
            >
              <p class="text-xs text-slate-500">Sejak 2025</p>
              <p class="text-sm font-semibold text-slate-900">
                Masakan rumahan favorit keluarga
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- OVERVIEW / KEUNGGULAN -->
      <Overview />

      <!-- MENU FAVORIT (card mirip figma) -->
      <section class="container mx-auto px-4 py-16">
        <div
          class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8"
        >
          <div>
            <h2
              class="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight"
            >
              Menu Favorit Pelanggan
            </h2>
            <p class="text-sm text-slate-500">
              Beberapa hidangan paling sering dipesan di Pawon.
            </p>
          </div>
        </div>

        <div class="grid gap-6 md:grid-cols-3">
          <article
            v-for="menu in featuredMenus"
            :key="menu.id"
            class="group bg-white rounded-3xl shadow-md shadow-slate-200/70 border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 hover:border-amber-200 transition-all"
          >
            <div class="h-40 overflow-hidden relative">
              <img
                :src="menu.image"
                :alt="menu.name"
                class="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div
                class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
              ></div>
            </div>
            <div class="p-4 space-y-2">
              <h3
                class="font-semibold text-slate-900 text-sm md:text-base line-clamp-1"
              >
                {{ menu.name }}
              </h3>
              <p class="text-xs text-slate-500 line-clamp-2">
                {{ menu.description }}
              </p>
              <div class="flex items-center justify-between pt-2 text-xs">
                <span class="font-bold text-amber-700 text-sm">
                  {{ menu.price }}
                </span>
                <span
                  class="text-[11px] text-slate-400 flex items-center gap-1"
                >
                  ⏱ {{ menu.cookTime }}
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- TESTIMONI -->
      <section id="galeri" class="bg-white border-t border-slate-100">
        <div class="container mx-auto px-4 py-16">
          <div class="max-w-xl mb-8">
            <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Apa Kata Pelanggan
            </h2>
            <p class="text-sm text-slate-500 max-w-xl">
              Testimoni dari pelanggan yang sudah merasakan langsung masakan dan
              suasana di Pawon.
            </p>
          </div>

          <div class="grid gap-6 md:grid-cols-3">
            <div
              v-for="(testi, idx) in testimonials"
              :key="idx"
              class="rounded-3xl border border-slate-100 bg-slate-50 p-5 text-sm shadow-sm hover:shadow-md transition-shadow"
            >
              <p class="text-slate-700 mb-3">“{{ testi.text }}”</p>
              <p class="font-semibold text-slate-900">{{ testi.name }}</p>
              <p class="text-xs text-slate-500">{{ testi.role }}</p>
            </div>
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
import Overview from "../components/Overview.vue";

const featuredMenus = [
  {
    id: 1,
    name: "Nasi Goreng Spesial",
    description: "Nasi goreng dengan topping lengkap dan cita rasa rumahan.",
    price: "Rp 25.000",
    cookTime: "15 menit",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Sate Ayam Bumbu Kacang",
    description: "Sate ayam lembut dengan bumbu kacang gurih dan manis.",
    price: "Rp 30.000",
    cookTime: "20 menit",
    image:
      "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Gado-Gado Nusantara",
    description: "Sayuran segar dengan bumbu kacang khas Indonesia.",
    price: "Rp 20.000",
    cookTime: "10 menit",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
  },
];

const testimonials = [
  {
    text: "Rasanya bener-bener kayak masakan ibu di rumah. Porsinya pas dan harganya ramah di kantong.",
    name: "Dita",
    role: "Mahasiswa",
  },
  {
    text: "Tempatnya nyaman untuk makan bareng teman kantor, menunya variatif dan cepat disajikan.",
    name: "Rizky",
    role: "Karyawan",
  },
  {
    text: "Favorit saya nasi goreng spesialnya, bumbunya kuat tapi tetap ringan.",
    name: "Santi",
    role: "Pelanggan tetap",
  },
];
</script>
