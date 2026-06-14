<!-- app/components/proyectos/HeroProyectos.vue -->
<template>
  <div>
    <!-- Banner Principal -->
    <section class="relative w-full h-[45vh] flex items-center bg-slate-900 overflow-hidden">
      <img 
        src="/images/heros/BannerHero.png" 
        class="absolute inset-0 w-full h-full object-cover object-center opacity-45" 
        alt="Voluntariado Proyectos D1MCR"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
      
      <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <h1 class="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
          Proyectos
        </h1>
        <div class="w-20 h-1.5 bg-orange-500 mt-3 rounded-full"></div>
      </div>
    </section>

    <!-- Texto Informativo de Introducción -->
    <section class="py-12 bg-slate-50 border-b border-slate-200/60">
      <div class="max-w-5xl mx-auto px-6">
        <div class="bg-white p-6 md:p-10 rounded-2xl border border-slate-200/80 shadow-sm text-center space-y-4">
          <p class="text-slate-600 text-sm md:text-base leading-relaxed">
            Les presentamos los proyectos que nuestros voluntarios han organizado para realizar próximamente. Si eres voluntario de la ONG y deseas inscribirte como voluntario para un proyecto o más, por favor no olvides hacer el <span class="text-[#072277] font-bold">Login</span> para con sus credenciales. 
            <!-- Cambiamos NuxtLink por un botón interactivo seguro -->
            <button 
              @click="modalLoginTemporal = true" 
              class="text-orange-500 font-bold hover:underline focus:outline-none inline-block align-baseline"
            >
              Haz click aquí
            </button>
          </p>
          <p class="text-slate-600 text-sm md:text-base leading-relaxed">
            Si deseas asistir a uno de los proyectos abiertos como <span class="text-slate-900 font-bold">participante</span>, por favor inscribirse con sus detalles para guardar su campo. ¡Gracias a todos por sumar!
          </p>
          <span class="block text-xs font-black tracking-widest text-[#072277] uppercase pt-2">
            #JuntosHacemosMás
          </span>
        </div>
      </div>
    </section>

    <!-- ================= MODAL LOGIN TEMPORAL ================= -->
    <Transition name="fade">
      <div v-if="modalLoginTemporal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 p-6 space-y-6 text-center">
          <div class="space-y-2">
            <span class="text-4xl">🔒</span>
            <h3 class="text-xl font-black text-[#072277] tracking-tight uppercase">Módulo de Login</h3>
            <p class="text-sm text-slate-500">
              Esta sección se encuentra actualmente en desarrollo y se conectará con la base de datos próximamente.
            </p>
          </div>

          <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left">
            <p class="text-xs text-amber-700 leading-relaxed font-medium">
              💡 <strong>Nota técnica:</strong> Si eres participante externo, no necesitas iniciar sesión. Puedes presionar directamente el botón naranja de <strong>"Quiero Participar"</strong> en la tarjeta de abajo.
            </p>
          </div>

          <button 
            @click="modalLoginTemporal = false" 
            class="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
          >
            Entendido / Cerrar
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const modalLoginTemporal = ref(false)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>