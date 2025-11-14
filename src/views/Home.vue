<template>
  <div>
    <Navbar />

    <!-- HERO -->
    <section
      class="bg-cover bg-center h-[60vh] flex items-center justify-center"
      style="
        background-image: url('https://media.istockphoto.com/id/1829241109/id/foto/menikmati-makan-siang-bersama.jpg?s=612x612&w=0&k=20&c=5ECJHqAwwqba75m_yGbftARStm_xGfPWVIqw3TBt3g8=');
      "
    >
      <h1 class="text-5xl font-bold text-white drop-shadow-lg">
        Pawon
      </h1>
    </section>

    <!-- OVERVIEW -->
    <section class="container mx-auto py-16 px-6">
      <h2 class="text-3xl font-bold mb-6 text-amber-900">Overview</h2>
      <p class="text-lg text-gray-700 leading-relaxed">
        Pawon adalah dapur tradisional masyarakat Jawa yang digunakan sejak
        zaman dahulu. Biasanya terdiri dari tungku tanah liat, gentong air, dan
        berbagai peralatan masak tradisional. Website ini dibuat sebagai media
        informasi mengenai sejarah dan budaya Pawon.
      </p>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import Footer from "../components/Footer.vue";
import Navbar from "../components/Navbar.vue";
</script>
