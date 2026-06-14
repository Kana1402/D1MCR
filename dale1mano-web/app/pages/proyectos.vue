<template>
  <div class="bg-white min-h-screen">
    <HeroProyectos />
    <ProyectosGrid />
  </div>
</template>

<script setup>
// Importación explícita para saltarnos cualquier fallo del auto-import de Nuxt 3
import HeroProyectos from '~/components/proyectos/HeroProyectos.vue'
import ProyectosGrid from '~/components/proyectos/ProyectosGrid.vue'
</script>