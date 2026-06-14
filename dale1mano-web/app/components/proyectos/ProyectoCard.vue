<template>
  <div class="bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between h-[420px] w-full text-left">
    
    <div class="space-y-3 overflow-hidden flex flex-col flex-grow">
      
      <div>
        <span 
          :class="[
            'inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider',
            activo ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500 border border-slate-200'
          ]"
        >
          {{ activo ? 'Convocatoria Abierta' : 'Finalizado' }}
        </span>
      </div>

      <h3 class="text-lg font-black text-slate-900 line-clamp-1">
        {{ proyecto.titulo }}
      </h3>

      <div class="space-y-1 text-xs text-slate-500 font-medium max-h-[75px] overflow-y-auto pr-1">
        <div class="flex items-center space-x-2">
          <span>📅</span> <span>{{ proyecto.fecha }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <span>⏰</span> <span>{{ proyecto.hora }}</span>
        </div>
        <div class="flex items-start space-x-2">
          <span class="mt-0.5">📍</span> 
          <span class="text-slate-600 font-semibold line-clamp-2">
            {{ proyecto.lugar }}
          </span>
        </div>
      </div>

      <div class="pt-2 border-t border-slate-100 flex-grow overflow-y-auto pr-1">
        <p 
          :class="[
            'text-sm text-slate-600 leading-relaxed transition-all',
            mostrarMas ? '' : 'line-clamp-3'
          ]"
        >
          {{ proyecto.descripcion }}
        </p>
        
        <button 
          @click="mostrarMas = !mostrarMas" 
          class="text-xs font-bold text-blue-600 hover:text-blue-800 mt-1 focus:outline-none block"
        >
          {{ mostrarMas ? 'Leer menos ⬆️' : 'Leer más ⬇️' }}
        </button>
      </div>
    </div>

    <div class="pt-4 border-t border-slate-50">
      <button 
        v-if="activo"
        @click="$emit('abrirInscripcion', proyecto)"
        class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider shadow-sm hover:shadow transition-all text-center"
      >
        Quiero Participar 🚀
      </button>
      <div 
        v-else 
        class="w-full bg-slate-50 border border-slate-200 text-slate-400 font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider text-center cursor-not-allowed"
      >
        Inscripciones Cerradas
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  proyecto: {
    type: Object,
    required: true
  },
  activo: {
    type: Boolean,
    default: true
  }
})

defineEmits(['abrirInscripcion'])

const mostrarMas = ref(false)
</script>