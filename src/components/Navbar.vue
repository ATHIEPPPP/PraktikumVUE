<template>
  <nav class="bg-amber-900 text-white p-4 shadow">
    <div class="container mx-auto flex justify-between">
      <h1 class="font-bold text-xl">Pawon</h1>
      <ul class="flex gap-6">
        <li>
          <router-link to="/" class="hover:text-yellow-300">Home</router-link>
        </li>
        <li>
          <router-link to="/contact" class="hover:text-yellow-300"
            >Contact</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>
