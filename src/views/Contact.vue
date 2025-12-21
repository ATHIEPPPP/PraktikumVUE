<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <Navbar />

    <main class="flex-1">
      <!-- HERO -->
      <section
        class="bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 text-white py-16 text-center"
      >
        <div class="container mx-auto px-4">
          <span
            class="inline-flex items-center rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-wide"
          >
            📞 Hubungi Pawon
          </span>
          <h1 class="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            Contact Pawon
          </h1>
          <p
            class="mt-3 text-sm md:text-base text-amber-50/80 max-w-2xl mx-auto"
          >
            Hubungi kami untuk informasi budaya, sejarah, atau pemesanan khusus
            Pawon.
          </p>
        </div>
      </section>

      <!-- INFO -->
      <section
        class="container mx-auto py-10 sm:py-16 px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10"
      >
        <div
          class="space-y-4 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/70 p-4 sm:p-6"
        >
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900">
            Informasi Kontak
          </h2>
          <p class="text-sm text-slate-500">
            Tim kami siap membantu Anda. Jangan ragu untuk menghubungi kami
            melalui kontak berikut.
          </p>
          <div class="space-y-3 text-sm text-slate-600">
            <div>
              <p class="font-semibold text-slate-900">Email</p>
              <p>pawon@tradisi.id</p>
            </div>
            <div>
              <p class="font-semibold text-slate-900">Telepon</p>
              <p>+62 812 3456 7890</p>
            </div>
            <div>
              <p class="font-semibold text-slate-900">Alamat</p>
              <p>Balikpapan, Kalimantan Timur</p>
            </div>
          </div>
        </div>

        <!-- MAP -->
        <div
          class="rounded-3xl overflow-hidden border border-amber-100 shadow-xl"
        >
          <iframe
            class="w-full h-64 md:h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15926.418047040838!2d116.86698287949585!3d-1.1468000407539984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df14b0b05e67b77%3A0xb1032aba8fa2bcf0!2sPawon%20Bu%20Fatim!5e0!3m2!1sen!2sid!4v1731565972000!5m2!1sen!2sid"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          >
          </iframe>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Footer from "../components/Footer.vue";
import Navbar from "../components/Navbar.vue";
</script>
