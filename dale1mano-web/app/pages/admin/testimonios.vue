<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div>
        <h2 class="text-xl font-black text-slate-900">Moderación de Testimonios (CU-06)</h2>
        <p class="text-xs text-slate-500">Revisa, aprueba o rechaza los testimonios enviados por los voluntarios.</p>
      </div>
    </div>

    <!-- PESTAÑAS (TABS) CORPORATIVAS -->
    <div class="flex border-b border-slate-200 bg-white rounded-t-xl px-2">
      <button 
        @click="activeTab = 'PENDIENTES'"
        class="px-6 py-3.5 text-xs font-black transition-all relative border-b-2 -mb-[2px] flex items-center space-x-2"
        :class="[
          activeTab === 'PENDIENTES' 
            ? 'text-[#0b31a8] border-[#0b31a8]' 
            : 'text-slate-400 border-transparent hover:text-slate-600'
        ]"
      >
        <span>Pendientes de Aprobación</span>
        <span 
          v-if="pendingTestimonials.length > 0"
          class="px-2 py-0.5 text-[10px] bg-amber-500 text-white font-black rounded-full shadow-xs animate-pulse"
        >
          {{ pendingTestimonials.length }}
        </span>
      </button>

      <button 
        @click="activeTab = 'APROBADOS'"
        class="px-6 py-3.5 text-xs font-black transition-all relative border-b-2 -mb-[2px] flex items-center space-x-2"
        :class="[
          activeTab === 'APROBADOS' 
            ? 'text-[#0b31a8] border-[#0b31a8]' 
            : 'text-slate-400 border-transparent hover:text-slate-600'
        ]"
      >
        <span>Aprobados (Visibles en la web)</span>
        <span class="text-slate-400 text-[11px] font-bold">({{ approvedTestimonials.length }})</span>
      </button>
    </div>

    <!-- LISTADO DE TESTIMONIOS (TARJETAS LIMPIAS) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
      <div 
        v-for="test in currentTestimonials" 
        :key="test.id_testimonio"
        class="bg-white border p-6 rounded-2xl flex flex-col justify-between transition-all shadow-2xs hover:shadow-xs group relative"
        :class="[
          test.aprobado ? 'border-slate-200' : 'border-amber-200 bg-amber-50/10'
        ]"
      >
        <div class="space-y-4">
          <!-- Voluntario y Proyecto -->
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="font-black text-slate-800 text-sm">{{ getUserName(test.id_usuario) }}</p>
              <p class="text-[11px] text-slate-400 font-medium">{{ getUserEmail(test.id_usuario) }}</p>
            </div>
            
            <span class="inline-flex items-center text-[10px] font-black px-2 py-0.5 rounded border shrink-0 bg-blue-50 border-blue-100 text-[#0b31a8] uppercase tracking-wide">
              {{ getProjectTitle(test.id_proyecto) }}
            </span>
          </div>

          <!-- Contenido del testimonio -->
          <p class="text-xs text-slate-600 leading-relaxed italic bg-slate-50 p-4 rounded-xl border border-slate-100">
            "{ { test.contenido } }"
          </p>

          <!-- Enlace a Video si existe (Estilo Ejecutivo) -->
          <div v-if="test.url_video" class="flex items-center space-x-2 text-[10px] font-black rounded-lg border border-slate-200 bg-slate-50 w-fit px-3 py-2 text-slate-700 hover:bg-slate-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5 text-blue-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
            <a :href="test.url_video" target="_blank" class="hover:underline">Ver Video Adjunto</a>
          </div>
        </div>

        <!-- Acciones de Moderación -->
        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span class="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            Enviado el {{ formatDate(test.fecha_publicacion) }}
          </span>

          <div class="flex items-center space-x-2">
            <!-- Rechazar / Eliminar -->
            <button 
              @click="handleReject(test.id_testimonio)"
              class="px-3 py-1.5 rounded-lg text-rose-600 bg-rose-50 border border-rose-100 hover:bg-rose-100 text-[10px] font-black transition-all cursor-pointer"
            >
              {{ test.aprobado ? 'Eliminar' : 'Rechazar' }}
            </button>

            <!-- Aprobar (solo visible en pendientes) -->
            <button 
              v-if="!test.aprobado"
              @click="handleApprove(test.id_testimonio)"
              class="px-4 py-1.5 rounded-lg text-white text-[10px] font-black transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              style="background: linear-gradient(135deg, #0b31a8 0%, #1e3a8a 100%);"
            >
              Aprobar (CU-06)
            </button>
          </div>
        </div>
      </div>

      <!-- Testimonios Vacíos -->
      <div v-if="currentTestimonials.length === 0" class="col-span-full py-16 bg-white border border-slate-200 rounded-2xl text-center text-slate-400 text-xs font-medium italic flex flex-col items-center justify-center space-y-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-slate-300">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>
        <span>No hay testimonios en esta sección en este momento.</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAdminData } from '../../composables/useAdminData'

definePageMeta({
  layout: 'admin'
})

const { testimonials, users, projects, approveTestimonio, rejectTestimonio } = useAdminData()

const activeTab = ref<'PENDIENTES' | 'APROBADOS'>('PENDIENTES')

// Filtrado de testimonios
const pendingTestimonials = computed(() => {
  return testimonials.value.filter(t => !t.aprobado)
})

const approvedTestimonials = computed(() => {
  return testimonials.value.filter(t => t.aprobado)
})

const currentTestimonials = computed(() => {
  return activeTab.value === 'PENDIENTES' ? pendingTestimonials.value : approvedTestimonials.value
})

// Mapeos rápidos de datos
function getUserName(id: number) {
  const u = users.value.find(user => user.id_usuario === id)
  return u ? u.nombre_completo : 'Voluntario Desconocido'
}

function getUserEmail(id: number) {
  const u = users.value.find(user => user.id_usuario === id)
  return u ? u.correo : ''
}

function getProjectTitle(id: number) {
  const p = projects.value.find(proj => proj.id_proyecto === id)
  return p ? p.titulo : 'Proyecto General'
}

// Acciones
async function handleApprove(id: number) {
  await approveTestimonio(id)
}

async function handleReject(id: number) {
  if (confirm('¿Estás seguro de que deseas rechazar/eliminar este testimonio?')) {
    await rejectTestimonio(id)
  }
}

// Formateador
function formatDate(isoStr: string) {
  const d = new Date(isoStr)
  return d.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>