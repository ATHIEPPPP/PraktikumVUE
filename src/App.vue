<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const transitionName = ref("slide-right");

router.beforeEach((to, from) => {
  const toIndex = to.meta.index ?? 0;
  const fromIndex = from.meta.index ?? 0;

  transitionName.value = toIndex > fromIndex ? "slide-left" : "slide-right";
});
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
/* Slide Right - navigating backward (e.g., Menu → Home) */
.slide-right-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-right-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Slide Left - navigating forward (e.g., Home → Menu) */
.slide-left-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-left-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
