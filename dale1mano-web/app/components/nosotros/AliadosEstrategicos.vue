<template>
  <section class="py-20 bg-[#072277] text-white overflow-hidden relative">
    <div class="absolute -right-16 -bottom-16 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
    <div class="absolute -left-16 -top-16 w-64 h-64 bg-orange-500/10 rounded-full blur-2xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center space-y-12">
      
      <div class="max-w-6xl mx-auto space-y-4">
      
        <h2 class="text-3xl font-black sm:text-4xl tracking-tight">
          Aliados que Creen en el <span class="text-orange-400">Talento Juvenil</span>
        </h2>
        <p class="text-sm md:text-base text-blue-100/80 leading-relaxed">
        Al colaborar con Dale Una Mano Costa Rica, nuestros aliados se convierten en miembros fundamentales de nuestra organización y parte de nuestra gran familia. Su apoyo contribuye al crecimiento y desarrollo de jóvenes líderes en la región, generando un impacto positivo tanto en la comunidad como en las personas que la integran. Además, este compromiso impulsa la vida de los jóvenes que forman parte de nuestra organización, brindándoles oportunidades de desarrollo y transformación personal.</p>
      </div>

  <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
  <div
    v-for="logo in logos"
    :key="logo.imagen"
    class="h-28 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group shadow-sm"
  >
    <img
      :src="logo.imagen"
      :alt="logo.nombre"
      class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
    />
  </div>
</div>

    </div>
  </section>
</template>

<script setup>


const logos = [
  { nombre: 'Recafis', imagen: '/images/aliados/RECAFIS.png' },
  { nombre: 'PANI', imagen: '/images/aliados/PANI.png' },
  { nombre: 'Fuerza Publica', imagen: '/images/aliados/FuerzaPublica.png' },
  { nombre: 'Focus', imagen: '/images/aliados/FOCUS.png' },
  { nombre: 'ARIAS', imagen: '/images/aliados/ARIAS.png' },
  { nombre: 'Embajada USA en Costa RICA 2', imagen: '/images/aliados/Embajada.png' },
  { nombre: 'Ticos Helping Ticos', imagen: '/images/aliados/THT.png' },
  { nombre: 'Amigos of Costa Rica', imagen: '/images/aliados/Amigos.png' }
]
</script>