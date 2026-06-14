<!-- app/components/programas/EjesTrabajoSection.vue -->
<template>
  <section class="py-20 bg-white text-slate-800">
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      
      <div class="text-center max-w-3xl mx-auto mb-12 space-y-2">
        <h2 class="text-3xl font-black text-[#072277] sm:text-4xl tracking-tight uppercase">
          Ejes de Trabajo
        </h2>
        <div class="w-16 h-1 bg-orange-500 mx-auto rounded-full"></div>
      </div>

      <!-- Cuadrícula de Botones Principales -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <button 
          v-for="(eje, index) in ejes" 
          :key="index"
          @click="ejeActivo = index"
          :style="{ backgroundColor: ejeActivo === index ? eje.color : '#f8fafc' }"
          :class="[
            'p-8 rounded-2xl border text-center transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center space-y-4 shadow-sm group min-h-[180px]',
            ejeActivo === index ? 'text-white border-transparent shadow-md' : 'text-slate-700 border-slate-200 hover:border-slate-300'
          ]"
        >
          <span class="text-3xl group-hover:scale-110 transition-transform duration-300">
            {{ eje.icono }}
          </span>
          <h3 class="font-bold text-sm md:text-base leading-snug tracking-tight">
            {{ eje.titulo }}
          </h3>
        </button>
      </div>

      <!-- Contenedor Desplegable con Información + Imagen -->
      <div class="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 md:p-10 shadow-inner min-h-[280px] transition-all duration-500">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <!-- Texto informativo -->
          <div class="lg:col-span-7 space-y-4">
            <span class="text-xs font-black uppercase tracking-wider text-orange-500">
              Enfoque Estratégico
            </span>
            <h4 class="text-2xl font-bold text-[#072277]">
              {{ ejes[ejeActivo].titulo }}
            </h4>
            <p class="text-slate-600 leading-relaxed text-sm md:text-base">
              {{ ejes[ejeActivo].descripcion }}
            </p>
          </div>

          <!-- Imagen correspondiente al Eje -->
          <div class="lg:col-span-5">
            <div class="rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-white p-2">
              <img 
                :src="ejes[ejeActivo].imagen" 
                :alt="ejes[ejeActivo].titulo"
                class="w-full h-48 md:h-56 object-cover rounded-xl bg-slate-100"
              />
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const ejeActivo = ref(0)

const ejes = [
  {
    titulo: 'Talleres de formación de liderazgo D1MCR',
    icono: '🧗‍♂️',
    color: '#fbbf24', // Dorado/Amarillo original (image_ce013b.png)
    descripcion: 'Desde los inicios de la organización empleamos talleres de formación donde capacitamos jóvenes en diferentes áreas tales como: habilidades blandas, habilidades para la vida Y liderazgo. Durante estos años hemos capacitado a más de 180 egresados de nuestros talleres de liderazgo y procesos de formación, contando con 12 generaciones. El programa de formación más reciente consiste de 12 sesiones, donde las personas jóvenes adquieren habilidades para ser líderes en sus comunidades.',
    imagen: '/images/image_cdfd78.jpg'
  },
  {
    titulo: 'Espacio seguro Convivencia y formación continua.',
    icono: '🧠',
    color: '#072277', // Azul Corporativo original
    descripcion: 'La organización cuenta con un centro de formación, disponible como espacio seguro de recreación y convivencia sana para los egresados y voluntarios de la ONG. Es acá donde impartimos nuestros procesos de formación, talleres y actividades de la ONG.',
    imagen: '/images/image_cdfd3a.jpg'
  },
  {
    titulo: 'Aprendizaje servicio y solidaridad (voluntariado y acción social)',
    icono: '🧑‍',
    color: '#f06732', // Naranja original
    descripcion: ' El Voluntariado es parte fundamental de lo que hacemos en la ONG. Tanto los participantes de nuestros procesos de formación, egresados de la organización, y voluntarios externos unimos esfuerzos para atender necesidades de nuestras comunidades. Embellecemos espacios de recreación, realizamos proyectos de acción social, actividades recreativas y encuentros culturales en escuelas y  comunidades, e impartimos talleres de habilidades blandas y para la vida.',
    imagen: '/images/image_ce015f.jpg'
  }
]
</script>