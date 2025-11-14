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
        <p class="text-gray-700">Alamat: Yogyakarta, Jawa Tengah</p>
      </div>

      <!-- MAP -->
      <div>
        <iframe
          class="w-full h-64 rounded shadow"
          src="https://maps.google.com/maps?q=yogyakarta&t=&z=13&ie=UTF8&iwloc=&output=embed"
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
