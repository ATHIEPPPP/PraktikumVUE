import { createRouter, createWebHistory } from "vue-router";
import Contact from "../views/Contact.vue";
import Galeri from "../views/Galeri.vue";
import Home from "../views/Home.vue";
import Menu from "../views/Menu.vue";
import Pesan from "../views/Pesan.vue";
import Tentang from "../views/Tentang.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/menu", name: "Menu", component: Menu },
  { path: "/tentang", name: "Tentang", component: Tentang },
  { path: "/galeri", name: "Galeri", component: Galeri },
  { path: "/contact", name: "Contact", component: Contact },
  { path: "/pesan", name: "Pesan", component: Pesan },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
