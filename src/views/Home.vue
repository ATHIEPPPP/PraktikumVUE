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
      <h1 class="text-5xl font-bold text-white drop-shadow-lg">Pawon</h1>
    </section>

    <!-- OVERVIEW -->
    <Overview />

    <Footer />
  </div>
</template>

<script setup>
import Footer from "../components/Footer.vue";
import Navbar from "../components/Navbar.vue";
import Overview from "../components/Overview.vue";
</script>
