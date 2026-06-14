<!-- app/components/programas/EstadisticasSection.vue -->
<template>
  <section class="py-20 bg-slate-50 text-slate-800">
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-2">
        <h2 class="text-3xl font-black text-[#072277] sm:text-4xl tracking-tight uppercase">
          Datos Porcentuales
        </h2>
        <div class="w-16 h-1 bg-orange-500 mx-auto rounded-full"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div v-for="(stat, idx) in stats" :key="idx" 
             class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center flex flex-col justify-between space-y-4"
        >
          <div class="space-y-1">
            <span class="block text-5xl font-black text-amber-500 tracking-tight">
              {{ stat.cifra }}
            </span>
            <h3 class="text-xl font-bold text-slate-800 tracking-tight">
              {{ stat.label }}
            </h3>
          </div>
          <p class="text-xs text-slate-500 leading-relaxed">
            {{ stat.descripcion }}
          </p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
const stats = [
  {
    cifra: '125',
    label: 'Jóvenes',
    descripcion: 'Se han visto beneficiados desde diciembre de 2015, se han logrado 6 generaciones dentro de la ONG y se ha logrado graduar a 100 jóvenes en los "Talleres de formación de liderazgo".'
  },
  {
    cifra: '+100',
    label: 'Proyectos',
    descripcion: 'De impacto comunal ejecutados con beneficio a la población de Matina, directamente a niños, jóvenes y adultos.'
  },
  {
    cifra: '+200',
    label: 'Talleres',
    descripcion: 'Impartidos desde hace más de 5 años, con el apoyo de más de 20 jóvenes facilitadores en temas de liderazgo y habilidades blandas, entre otros.'
  }
]
</script>