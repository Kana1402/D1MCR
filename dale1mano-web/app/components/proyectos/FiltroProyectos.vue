<!-- app/components/proyectos/FiltroProyectos.vue -->
<template>
  <div class="flex justify-center items-center space-x-3">
    <button 
      @click="$emit('cambiarFiltro', 'activos')"
      :class="[
        'px-6 py-2 rounded-full font-bold text-sm tracking-wide transition-all duration-300',
        filtroActual === 'activos' 
          ? 'bg-[#072277] text-white shadow-md scale-105' 
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      ]"
    >
      Activos
    </button>
    
    <button 
      @click="$emit('cambiarFiltro', 'pasados')"
      :class="[
        'px-6 py-2 rounded-full font-bold text-sm tracking-wide transition-all duration-300',
        filtroActual === 'pasados' 
          ? 'bg-[#072277] text-white shadow-md scale-105' 
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      ]"
    >
      Pasados
    </button>
  </div>
</template>

<script setup>
defineProps({
  filtroActual: {
    type: String,
    required: true
  }
})
defineEmits(['cambiarFiltro'])
</script>