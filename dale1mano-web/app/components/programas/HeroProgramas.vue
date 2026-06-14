<!-- app/components/programas/HeroProgramas.vue -->
<template>
  <section class="relative w-full h-[45vh] flex items-center bg-slate-900 overflow-hidden">
    <!-- Reemplaza con tu imagen image_ce015f.jpg en tu directorio public -->
    <img 
      src="/images/heros/BannerHero.png" 
      class="absolute inset-0 w-full h-full object-cover object-center opacity-40" 
      alt="Programas D1MCR"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
    
    <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
      <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">
        Programas
      </h1>
      <div class="w-20 h-1.5 bg-orange-500 mt-4 rounded-full"></div>
    </div>
  </section>
</template>