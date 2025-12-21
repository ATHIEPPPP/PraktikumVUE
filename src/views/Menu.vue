<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <Navbar />

    <main class="flex-1">
      <!-- HERO DENGAN GRADASI  -->
      <section
        class="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50"
      >
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.25),_transparent_60%)]"
        ></div>

        <div
          class="relative container mx-auto px-4 py-16 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-10"
        >
          <div class="space-y-4 max-w-xl">
            <span
              class="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-amber-700 shadow-sm"
            >
              📋 Daftar Menu Pawon
            </span>

            <h1
              class="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight"
            >
              Menu Pawon
            </h1>

            <p class="text-sm md:text-base text-slate-700">
              Pilih berbagai hidangan utama, lauk pauk, sayuran, dan minuman
              segar khas Pawon. Semua disajikan dengan rasa rumahan dan bahan
              yang selalu dijaga kesegarannya.
            </p>
          </div>

          <div
            class="grid grid-cols-2 gap-4 text-[11px] md:text-xs text-slate-700 max-w-xs md:max-w-sm"
          >
            <div
              class="rounded-2xl border border-amber-200 bg-white/90 px-3 py-2 shadow-sm"
            >
              <p class="font-semibold text-amber-700">50+</p>
              <p>Varian menu</p>
            </div>
            <div
              class="rounded-2xl border border-amber-200 bg-white/90 px-3 py-2 shadow-sm"
            >
              <p class="font-semibold text-amber-700">4.8/5</p>
              <p>Rating pelanggan</p>
            </div>
            <div
              class="rounded-2xl border border-amber-200 bg-white/90 px-3 py-2 shadow-sm"
            >
              <p class="font-semibold text-amber-700">10.00–22.00</p>
              <p>Jam buka</p>
            </div>
            <div
              class="rounded-2xl border border-amber-200 bg-white/90 px-3 py-2 shadow-sm"
            >
              <p class="font-semibold text-amber-700">Dine-in & Takeaway</p>
              <p>Layanan</p>
            </div>
          </div>
        </div>
      </section>

      <!-- PANEL PUTIH UNTUK FILTER + GRID MENU -->
      <section class="container mx-auto px-4 -mt-12 pb-16 relative z-10">
        <div
          class="rounded-3xl bg-white shadow-xl shadow-slate-200/70 px-4 md:px-6 py-8 md:py-10 border border-slate-100"
        >
          <!-- Filter kategori -->
          <div class="flex flex-wrap gap-2 mb-8">
            <button
              v-for="cat in categories"
              :key="cat"
              class="px-4 py-2 rounded-full text-xs font-semibold border transition-all"
              :class="
                currentCategory === cat
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white border-amber-600 shadow'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              "
              @click="currentCategory = cat"
            >
              {{ cat }}
            </button>
          </div>

          <!-- Grid menu -->
          <div
            class="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
          >
            <MenuCard
              v-for="menu in filteredMenus"
              :key="menu.id"
              :menu="menu"
              @select="openDetail(menu)"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>

    <MenuDetailModal
      :isOpen="isModalOpen"
      :menu="selectedMenu"
      @close="closeDetail"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import Footer from "../components/Footer.vue";
import MenuCard from "../components/MenuCard.vue";
import MenuDetailModal from "../components/MenuDetailModal.vue";
import Navbar from "../components/Navbar.vue";

const menus = [
  {
    id: 1,
    name: "Nasi Goreng Spesial",
    description: "Nasi goreng dengan topping telur, ayam suwir, dan kerupuk.",
    price: "Rp 25.000",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80",
    category: "Makanan Utama",
    cookTime: "15 menit",
    servings: "1 orang",
    spiceLevel: "Sedang",
    ingredients: ["Nasi", "Telur", "Ayam", "Kecap", "Bawang"],
  },
  {
    id: 2,
    name: "Ayam Geprek Sambal Ijo",
    description: "Ayam krispi dengan sambal ijo pedas yang nagih.",
    price: "Rp 28.000",
    image:
      "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=900&q=80",
    category: "Lauk Pauk",
    cookTime: "20 menit",
    servings: "1 orang",
    spiceLevel: "Pedas",
    ingredients: ["Ayam", "Cabai Hijau", "Tomat", "Bawang"],
  },
  {
    id: 3,
    name: "Sayur Asem Jawa",
    description: "Sayur segar dengan kuah asam gurih khas Jawa.",
    price: "Rp 15.000",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80",
    category: "Sayuran",
    cookTime: "25 menit",
    servings: "2 orang",
    spiceLevel: "Ringan",
    ingredients: ["Melinjo", "Jagung", "Kacang Panjang", "Asam Jawa"],
  },
  {
    id: 4,
    name: "Rendang Daging",
    description: "Daging sapi empuk dengan bumbu rendang khas Padang.",
    price: "Rp 45.000",
    image:
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=80",
    category: "Makanan Utama",
    cookTime: "120 menit",
    servings: "2-3 orang",
    spiceLevel: "Sedang",
    ingredients: ["Daging Sapi", "Santan", "Cabai", "Rempah"],
  },
  {
    id: 5,
    name: "Es Teh Manis",
    description: "Teh manis dingin, pas untuk menemani makan siang.",
    price: "Rp 6.000",
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80",
    category: "Minuman",
    cookTime: "5 menit",
    servings: "1 gelas",
    spiceLevel: "-",
    ingredients: ["Teh", "Gula", "Es Batu"],
  },
  {
    id: 6,
    name: "Jus Jeruk Segar",
    description: "Perasan jeruk asli tanpa pengawet.",
    price: "Rp 10.000",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=80",
    category: "Minuman",
    cookTime: "5 menit",
    servings: "1 gelas",
    spiceLevel: "-",
    ingredients: ["Jeruk", "Gula", "Es Batu"],
  },
];

const categories = [
  "Semua",
  "Makanan Utama",
  "Lauk Pauk",
  "Sayuran",
  "Minuman",
];

const currentCategory = ref("Semua");
const isModalOpen = ref(false);
const selectedMenu = ref(null);

const filteredMenus = computed(() => {
  if (currentCategory.value === "Semua") return menus;
  return menus.filter((m) => m.category === currentCategory.value);
});

const openDetail = (menu) => {
  selectedMenu.value = menu;
  isModalOpen.value = true;
};

const closeDetail = () => {
  isModalOpen.value = false;
  selectedMenu.value = null;
};
</script>
