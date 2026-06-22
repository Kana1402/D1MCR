<!-- app/components/programas/TematicasSection.vue -->
<template>
  <section class="py-20 bg-slate-50 text-slate-800">
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-2">
        <h2 class="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight uppercase">
          Temáticas
        </h2>
        <div class="w-16 h-1 bg-orange-500 mx-auto rounded-full"></div>
        <span class="block text-xs font-bold uppercase tracking-widest text-slate-400 pt-2">#JuntosHacemosMás</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Lista de pestañas a la izquierda -->
        <div class="lg:col-span-5 space-y-3">
          <button 
            v-for="(tema, index) in tematicas" 
            :key="index"
            @click="temaActivo = index"
            :class="[
              'w-full text-left p-5 rounded-xl font-bold border transition-all duration-200 flex items-center space-x-4 shadow-sm',
              temaActivo === index 
                ? 'bg-white border-[#072277] text-[#072277] translate-x-2' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            ]"
          >
            <span class="text-orange-500 text-sm font-black">{{ index + 1 }}</span>
            <span class="text-sm md:text-base tracking-tight">{{ tema.nombre }}</span>
          </button>
        </div>

        <!-- Contenedor de Detalle e Imagen a la derecha -->
        <div class="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between min-h-[400px]">
          <div class="space-y-6">
            <div>
              <span class="text-[10px] font-black uppercase tracking-widest text-orange-500">Proyectos Realizados</span>
              <h3 class="text-2xl font-black text-[#072277] mt-1">{{ tematicas[temaActivo].nombre }}</h3>
            </div>
            
            <ul class="space-y-3">
              <li 
                v-for="(proyecto, pIdx) in tematicas[temaActivo].proyectos" 
                :key="pIdx"
                class="flex items-start text-sm text-slate-600 leading-relaxed"
              >
                <span class="text-orange-500 mr-3 select-none font-bold">•</span>
                <span>{{ proyecto }}</span>
              </li>
            </ul>
          </div>

          <!-- Imagen representativa de la temática abajo/dentro del panel -->
          <div class="mt-8 rounded-xl overflow-hidden h-44 bg-slate-100 border border-slate-100">
            <img 
              :src="tematicas[temaActivo].imagen" 
              class="w-full h-full object-cover" 
              alt="Ilustración Temática"
            />
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAdminData } from '~/composables/useAdminData'

const { thematics, projects } = useAdminData()

const temaActivo = ref(0)

const tematicas = computed(() => {
  return thematics.value.filter(t => t.estado === 'ACTIVO').map(t => {
    // Buscar los proyectos asociados en el estado global
    const associatedProjects = projects.value
      .filter(p => p.id_tematica === t.id_tematica && p.estado === 'ACTIVO')
      .map(p => p.titulo)
    
    // Si no hay proyectos activos creados por el administrador, usar proyectos demo acordes al área
    let projList = associatedProjects
    if (projList.length === 0) {
      if (t.nombre.toLowerCase().includes('salud')) {
        projList = [
          'Caminata de concientización sobre el cáncer de mama.',
          'Talleres de salud mental.',
          'Reuniones con personas jóvenes de la ONG sobre temas de salud mental.',
          'Sesiones de apoyo para jóvenes con profesional en psicología.'
        ]
      } else if (t.nombre.toLowerCase().includes('educ')) {
        projList = [
          'Refuerzo escolar comunitario voluntario.',
          'Talleres de computación básica y herramientas digitales.',
          'Donación de paquetes de útiles escolares al inicio del curso lectivo.'
        ]
      } else if (t.nombre.toLowerCase().includes('amb')) {
        projList = [
          'Jornadas de limpieza de ríos y playas locales.',
          'Campañas de reciclaje comunal y clasificación de desechos sólidos.',
          'Siembra de árboles nativos en zonas degradadas de Matina.'
        ]
      } else if (t.nombre.toLowerCase().includes('just')) {
        projList = [
          'Foros sobre los derechos de la juventud rural.',
          'Talleres de equidad de género y prevención de violencia intrafamiliar.',
          'Espacios de integración cultural y artística inclusiva.'
        ]
      } else {
        projList = [
          'Elaboración de currículum vitae y simulación de entrevistas laborales.',
          'Capacitación en emprendimiento juvenil y formulación de planes de negocio.',
          'Talleres de oratoria y expresión asertiva para el ámbito profesional.'
        ]
      }
    }

    return {
      nombre: t.nombre,
      imagen: t.nombre.toLowerCase().includes('salud') ? '/images/image_cdfd78.jpg' :
              t.nombre.toLowerCase().includes('educ') ? '/images/image_cdfd3a.jpg' :
              t.nombre.toLowerCase().includes('amb') ? '/images/image_ce015f.jpg' :
              t.nombre.toLowerCase().includes('just') ? '/images/image_cdfd78.jpg' : '/images/image_cdfd3a.jpg',
      proyectos: projList
    }
  })
})
</script>