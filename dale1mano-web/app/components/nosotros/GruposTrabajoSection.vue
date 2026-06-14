<template>
  <section class="py-20 bg-white text-slate-800">
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      
      <div class="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <h2 class="text-3xl font-black text-[#072277] sm:text-4xl tracking-tight uppercase">
          Grupos de Trabajo
        </h2>
        <div class="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        <div v-for="(grupo, index) in grupos" :key="index" class="flex flex-col">
          
          <button 
            @click="toggleGrupo(index)"
            :style="{ backgroundColor: grupo.color }"
            class="w-full p-6 rounded-2xl text-white font-bold text-lg shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex justify-between items-center group relative overflow-hidden"
          >
            <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <span class="tracking-tight relative z-10">{{ grupo.nombre }}</span>
            <svg 
              class="w-6 h-6 transition-transform duration-500 relative z-10" 
              :class="grupoAbierto === index ? 'rotate-180' : ''"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div 
            class="overflow-hidden transition-all duration-500 ease-in-out"
            :class="grupoAbierto === index ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0'"
          >
            <div class="bg-slate-50 border border-slate-200/70 rounded-2xl p-6 space-y-6 shadow-inner">
              
              <div class="space-y-2">
                <h4 class="text-xs font-black uppercase tracking-widest text-slate-400">Sobre el Departamento</h4>
                <p class="text-sm text-slate-600 leading-relaxed">
                  {{ grupo.descripcion }}
                </p>
              </div>

              <div class="space-y-3">
                <h4 class="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Miembros del Equipo</h4>
                
                <div class="grid grid-cols-3 gap-3">
                  <div 
                    v-for="(miembro, idx) in grupo.miembros" 
                    :key="idx"
                    class="bg-white p-3 rounded-xl border border-slate-200/60 shadow-sm flex flex-col items-center text-center"
                  >
                    <div class="w-16 h-16 bg-slate-100 rounded-full mb-2 overflow-hidden border border-slate-200">
                      <img 
                        :src="miembro.foto || '/images/BannerHero.png'" 
                        class="w-full h-full object-cover grayscale opacity-90"
                        alt="Foto del miembro"
                      />
                    </div>
                    <h5 class="text-xs font-bold text-[#072277] line-clamp-1 leading-tight">
                      {{ miembro.nombre }}
                    </h5>
                    <p class="text-[10px] font-bold text-orange-500 uppercase tracking-wide mt-0.5">
                      {{ miembro.rol }}
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const grupoAbierto = ref(null)

const toggleGrupo = (index) => {
  grupoAbierto.value = grupoAbierto.value === index ? null : index
}

// Estructura de datos actualizada con objetos para los miembros (Nombre, Rol, Foto)
const grupos = [
  {
    nombre: 'Relaciones con Aliados',
    color: '#f06732',
    descripcion: 'Encargados de gestionar la comunicación externa y fortalecer los lazos con organizaciones gubernamentales y ONGs aliadas.',
    miembros: [
      { nombre: 'Andrea Hernández', rol: 'Coordinador', foto: '/images/grupos/Andrea.jpg' }
    ]
  },
  {
    nombre: 'Promotores Virtuales',
    color: '#60a5fa',
    descripcion: 'Líderes en el entorno digital, encargados de la difusión de campañas y captación de voluntarios a través de redes sociales.',
    miembros: [
      { nombre: 'Andrea Hernández', rol: 'Coordinador', foto: '/images/grupos/Andrea.jpg' },
      { nombre: 'Mario Urtecho', rol: 'Coordinador', foto: '/images/grupos/Andrea.jpg' },
      { nombre: 'Ashler Sanchez', rol: 'Coordinador', foto: '/images/grupos/Andrea.jpg' },
      { nombre: 'Melany Jiron', rol: 'Coordinador', foto: '/images/grupos/Andrea.jpg' },
      { nombre: 'Alberth Jermey', rol: 'Coordinador', foto: '/images/grupos/Andrea.jpg' },
      { nombre: 'Ivy Melissa', rol: 'Coordinador', foto: '/images/grupos/Andrea.jpg' }
  ]
  },
  {
    nombre: 'Gestores de Formación',
    color: '#fbbf24',
    descripcion: 'Diseñan y ejecutan los talleres de capacitación para que nuestros jóvenes voluntarios desarrollen habilidades blandas y técnicas.',
    miembros: [
      { nombre: 'Daisy Johanna', rol: 'Directora Académica', foto: '' },
      { nombre: 'Fiorela Chaves', rol: 'Tutor', foto: '' },
      { nombre: 'Jose Bernardo', rol: 'Tutor', foto: '' },
      { nombre: 'Jessica Miranda', rol: 'Logística', foto: '' }
    ]
  },
  {
    nombre: 'Planificación y Seguimiento',
    color: '#8b5cf6',
    descripcion: 'Aseguran que cada proyecto cumpla con sus cronogramas y objetivos, midiendo el impacto real en las comunidades.',
    miembros: [
      { nombre: 'Joshua Jarrat', rol: 'Supervisor', foto: '' },
      { nombre: 'Romario Mendoza', rol: 'Analista', foto: '' },
      { nombre: 'Melany Jiron', rol: 'Supervisor', foto: '' },
      { nombre: 'Haninen Leal', rol: 'Analista', foto: '' }
    ]
  },
  {
    nombre: 'Mentores de Proyectos',
    color: '#10b981',
    descripcion: 'Guían a los nuevos agentes de cambio en la ejecución de sus misiones solidarias, brindando asesoría y experiencia.',
    miembros: [
      { nombre: 'Moises Mancia', rol: 'Mentor Senior', foto: '' },
      { nombre: 'Mario Urtecho', rol: 'Asesora', foto: '' },
      { nombre: 'Alberth Jermey', rol: 'Mentor Senior', foto: '' }
    ]
  },
  {
    nombre: 'Alianzas y Patrocinios',
    color: '#ef4444',
    descripcion: 'Departamento enfocado en la sostenibilidad financiera y logística, buscando patrocinadores que crean en el talento joven.',
    miembros: [
      { nombre: 'Jimena Cruz', rol: 'Recaudación', foto: '' }
    ]
  }
]
</script>

<style scoped>
/* Ajuste de animación para soportar el nuevo alto dinámico de las tarjetas */
.max-h-0 {
  max-height: 0;
}
</style>