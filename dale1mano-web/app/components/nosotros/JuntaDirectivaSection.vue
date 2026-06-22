<template>
  <section class="py-20 bg-slate-50">
    <div class="max-w-7xl mx-auto px-6 md:px-12 text-center">
      <h2 class="text-3xl font-black text-slate-900 mb-12 uppercase tracking-tight">
        Junta <span class="text-orange-500">Directiva</span>
      </h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="miembro in equipo" :key="miembro.puesto" class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div class="w-full aspect-square bg-slate-100 rounded-xl mb-4 overflow-hidden">
            <img :src="miembro.imagen" class="w-full h-full opacity-100" />
          </div>
          <h4 class="font-bold text-[#072277]">{{ miembro.nombre }}</h4>
          <p class="text-xs font-bold text-orange-500 uppercase mt-1">{{ miembro.puesto }}</p>
          <p class="text-sm text-slate-600 mt-2">{{ miembro.descripcion }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useAdminData } from '~/composables/useAdminData'

const { boardMembers } = useAdminData()

const equipo = computed(() => {
  return boardMembers.value.map(m => ({
    nombre: m.nombre_completo,
    puesto: m.cargo,
    imagen: m.url_fotografia || '/images/junta/Orlando.jpg',
    descripcion: m.nombre_completo === 'Orlando Carvajal Valdés' ? 'Líder visionario con amplia experiencia en gestión de proyectos sociales.' :
                 m.nombre_completo === 'Erick Marín Muller' ? 'Experto en gestión financiera y planificación presupuestaria.' :
                 m.nombre_completo === 'Keila Pérez Mendoza' ? 'Especialista en organización y coordinación administrativa.' :
                 m.nombre_completo === 'María Fernanda Batista' ? 'Profesional dedicado al apoyo y seguimiento de proyectos sociales.' :
                 m.nombre_completo === 'Kihaveth Navarro Hernandez' ? 'Miembro clave en la dirección estratégica de la organización.' :
                 m.nombre_completo === 'Susan Blanchard Blanchard' ? 'Fiscalía y control administrativo interno.' : 
                 'Coordinador oficial y miembro de la junta directiva de Dale1Mano.'
  }))
})
</script>