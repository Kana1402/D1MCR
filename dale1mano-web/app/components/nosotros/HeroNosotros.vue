<template>
  <section class="relative w-full h-[70vh] flex items-center overflow-hidden bg-slate-900">
    <div v-for="(img, index) in imagenes" :key="index" 
         class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
         :class="index === currentIndex ? 'opacity-50' : 'opacity-0'">
      <img :src="img" class="w-full h-full object-cover" alt="D1MCR Background" />
    </div>

    <div class="absolute inset-0 bg-gradient-to-r from-[#072277] via-[#072277]/60 to-transparent"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
      <div class="max-w-2xl space-y-6">
        <span class="inline-block px-4 py-1.5 rounded-full bg-orange-500 text-white text-xs font-bold uppercase tracking-widest">
          Conócenos
        </span>
        <h1 class="text-4xl md:text-6xl font-black text-white leading-tight">
          Pasión por el <br>
          <span class="text-orange-500">Cambio Social</span>
        </h1>
        <p class="text-lg md:text-xl text-slate-200 leading-relaxed">
          Transformamos el liderazgo juvenil en impacto comunitario real. Somos una familia de agentes de cambio en el corazón de Limón.
        </p>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
      <div v-for="(_, i) in imagenes" :key="i" 
           class="h-1.5 transition-all duration-300 rounded-full"
           :class="i === currentIndex ? 'w-8 bg-orange-500' : 'w-2 bg-white/30'">
      </div>
    </div>
  </section>
</template>

<script setup>
const imagenes = [
  '/images/heros/BannerHero.png', // Tu imagen actual
  '/images/heros/NosotrosHero1.jpg', // Agrega más aquí cuando las tengas
  '/images/heros/NosotrosHero2.jpg'
]

const currentIndex = ref(0)

onMounted(() => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % imagenes.length
  }, 5000)
})
</script>