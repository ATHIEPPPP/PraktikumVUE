<template>
  <div>
    <Navbar />

    <!-- HERO -->
    <section class="bg-amber-800 text-white py-20 text-center">
      <h1 class="text-5xl font-bold">Contact Pawon</h1>
      <p class="mt-2">Hubungi kami untuk informasi budaya dan sejarah Pawon</p>
    </section>

    <!-- INFO -->
    <section
      class="container mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-12"
    >
      <div>
        <h2 class="text-3xl font-bold text-amber-900 mb-4">Informasi Kontak</h2>
        <p class="text-gray-700 mb-2">Email: pawon@tradisi.id</p>
        <p class="text-gray-700 mb-2">Telepon: +62 812 3456 7890</p>
        <p class="text-gray-700">Alamat: Balikpapan, Kalimantan Timur</p>
      </div>

      <!-- MAP -->
      <div>
        <iframe
          class="w-full h-64 rounded shadow"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15926.418047040838!2d116.86698287949585!3d-1.1468000407539984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df14b0b05e67b77%3A0xb1032aba8fa2bcf0!2sPawon%20Bu%20Fatim!5e0!3m2!1sen!2sid!4v1731565972000!5m2!1sen!2sid"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        >
        </iframe>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import Footer from "../components/Footer.vue";
import Navbar from "../components/Navbar.vue";
</script>
