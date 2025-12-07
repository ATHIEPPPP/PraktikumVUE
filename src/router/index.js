import { createRouter, createWebHistory } from "vue-router";
import Contact from "../views/Contact.vue";
import Galeri from "../views/Galeri.vue";
import Home from "../views/Home.vue";
import Menu from "../views/Menu.vue";
import Pesan from "../views/Pesan.vue";
import Tentang from "../views/Tentang.vue";

const routes = [
  { path: "/", name: "Home", component: Home, meta: { index: 0 } },
  { path: "/menu", name: "Menu", component: Menu, meta: { index: 1 } },
  { path: "/tentang", name: "Tentang", component: Tentang, meta: { index: 2 } },
  { path: "/galeri", name: "Galeri", component: Galeri, meta: { index: 3 } },
  { path: "/contact", name: "Contact", component: Contact, meta: { index: 4 } },
  { path: "/pesan", name: "Pesan", component: Pesan, meta: { index: 5 } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
