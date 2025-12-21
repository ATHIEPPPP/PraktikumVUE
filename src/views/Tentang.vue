<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <Navbar />

    <main class="flex-1">
      <section class="bg-white border-b border-slate-100">
        <div class="container mx-auto px-4 py-12">
          <span
            class="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold text-amber-700 mb-3"
          >
            🏡 Tentang Kami
          </span>
          <h1
            class="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight"
          >
            Tentang Pawon
          </h1>
          <p class="text-sm text-slate-500 max-w-2xl">
            Pawon adalah warung makan yang menggabungkan cita rasa rumahan
            dengan suasana hangat dan pelayanan bersahabat.
          </p>
        </div>
      </section>

      <section
        class="container mx-auto px-4 py-10 sm:py-16 grid gap-8 sm:gap-10 md:grid-cols-2"
      >
        <div class="space-y-4 sm:space-y-5">
          <h2 class="text-lg sm:text-xl font-semibold text-slate-900">
            Cerita di Balik Dapur
          </h2>
          <p class="text-sm text-slate-600">
            Berawal dari hobi memasak keluarga, Pawon hadir sebagai tempat
            berkumpul untuk menikmati masakan rumahan khas nusantara.
          </p>
          <p class="text-sm text-slate-600">
            Kami percaya bahwa makanan bukan hanya soal kenyang, tetapi juga
            soal kenyamanan, memori, dan kebersamaan.
          </p>

          <div class="grid gap-4 md:grid-cols-2 pt-2 text-sm">
            <div
              class="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <p class="font-semibold text-slate-900">Didirikan</p>
              <p class="text-slate-600">2025</p>
            </div>
            <div
              class="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <p class="font-semibold text-slate-900">Lokasi</p>
              <p class="text-slate-600">Samarinda, Kalimantan Timur</p>
            </div>
            <div
              class="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <p class="font-semibold text-slate-900">Spesialisasi</p>
              <p class="text-slate-600">Masakan Nusantara & Rumahan</p>
            </div>
            <div
              class="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <p class="font-semibold text-slate-900">Jam Buka</p>
              <p class="text-slate-600">10.00 – 22.00 WITA</p>
            </div>
          </div>
        </div>

        <div
          class="rounded-3xl overflow-hidden shadow-xl border border-amber-100 bg-white"
        >
          <img
            src="https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&w=1200&q=80"
            alt="Suasana dapur"
            class="h-full w-full object-cover"
          />
        </div>
      </section>

      <section class="bg-white border-t border-slate-100">
        <div class="container mx-auto px-4 py-16">
          <h2 class="text-xl font-semibold text-slate-900 mb-4">
            Nilai yang Kami Pegang
          </h2>

          <div class="grid gap-6 md:grid-cols-3 text-sm">
            <div
              class="p-5 rounded-3xl border border-slate-100 bg-gradient-to-br from-amber-50 via-white to-slate-50 shadow-sm"
            >
              <p class="text-xs font-semibold text-amber-700 mb-1">
                01 • Kejujuran
              </p>
              <p class="font-semibold text-slate-900 mb-1">Bahan & Rasa</p>
              <p class="text-slate-600">
                Kami terbuka soal bahan yang digunakan dan menjaga kualitas rasa
                setiap hari.
              </p>
            </div>
            <div
              class="p-5 rounded-3xl border border-slate-100 bg-gradient-to-br from-amber-50 via-white to-slate-50 shadow-sm"
            >
              <p class="text-xs font-semibold text-amber-700 mb-1">
                02 • Konsistensi
              </p>
              <p class="font-semibold text-slate-900 mb-1">Rasa yang Sama</p>
              <p class="text-slate-600">
                Pelanggan bisa berharap rasa yang stabil dari waktu ke waktu.
              </p>
            </div>
            <div
              class="p-5 rounded-3xl border border-slate-100 bg-gradient-to-br from-amber-50 via-white to-slate-50 shadow-sm"
            >
              <p class="text-xs font-semibold text-amber-700 mb-1">
                03 • Kebersihan
              </p>
              <p class="font-semibold text-slate-900 mb-1">Dapur Terjaga</p>
              <p class="text-slate-600">
                Kebersihan dapur dan area makan jadi prioritas utama kami.
              </p>
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
</script>
