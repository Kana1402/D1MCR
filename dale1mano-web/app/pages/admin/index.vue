<template>
  <div class="space-y-8 animate-fade-in">

    <!-- Header de bienvenida -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
      <div>
        <!-- Cambiado a text-slate-900 para máxima legibilidad sobre fondo claro -->
        <h2 class="text-2xl font-black text-slate-900 tracking-tight">¡Hola de nuevo, Administrador!</h2>
        <p class="text-sm text-slate-500">Resumen de actividad y estadísticas de <span class="font-extrabold text-[#0b31a8]">Dale1Mano<span class="text-[#e0531c]">CR</span></span>.</p>
      </div>
      <NuxtLink
        to="/admin/proyectos"
        class="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-white text-xs font-bold transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] self-start"
        style="background: linear-gradient(135deg, #e0531c 0%, #f06732 100%); box-shadow: 0 4px 14px rgba(224,83,28,0.25);"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <span>Nuevo Proyecto</span>
      </NuxtLink>
    </div>

    <!-- ESTADÍSTICAS -->
    <!-- Transformadas en tarjetas blancas limpias con bordes suaves tipo la Landing de la imagen -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      <!-- Voluntarios -->
      <div class="bg-white border border-slate-200/80 p-6 rounded-2xl flex items-center justify-between group hover:border-slate-300 hover:shadow-sm transition-all">
        <div class="space-y-1.5">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Voluntarios</span>
          <h3 class="text-3xl font-black text-slate-900">{{ stats.totalUsers }}</h3>
          <span class="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100 bg-blue-50/50 text-[#0b31a8]">
            {{ stats.officialMembers }} Oficiales
          </span>
        </div>
        <div class="p-3 rounded-xl border bg-blue-50/30 border-blue-100 text-[#0b31a8] group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
        </div>
      </div>

      <!-- Proyectos Activos -->
      <div class="bg-white border border-slate-200/80 p-6 rounded-2xl flex items-center justify-between group hover:border-slate-300 hover:shadow-sm transition-all">
        <div class="space-y-1.5">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Proyectos Activos</span>
          <h3 class="text-3xl font-black text-slate-900">{{ stats.activeProjects }}</h3>
          <span class="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 border border-slate-200">
            {{ stats.passedProjects }} Finalizados
          </span>
        </div>
        <!-- Usando el verde característico del tag de la Landing -->
        <div class="p-3 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
        </div>
      </div>

      <!-- Testimonios Pendientes -->
      <div class="bg-white border border-slate-200/80 p-6 rounded-2xl flex items-center justify-between group hover:border-slate-300 hover:shadow-sm transition-all">
        <div class="space-y-1.5">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Testimonios Por Aprobar</span>
          <h3 class="text-3xl font-black text-slate-900">{{ stats.pendingTestimonials }}</h3>
          <span
            v-if="stats.pendingTestimonials > 0"
            class="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse bg-orange-50 border border-orange-100 text-[#e0531c]"
          >
            Requiere Moderación
          </span>
          <span
            v-else
            class="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-50 text-slate-400 border border-slate-200"
          >
            Al día
          </span>
        </div>
        <!-- Contenedor del icono con el naranja vibrante del banner -->
        <div class="p-3 rounded-xl border bg-orange-50/50 border-orange-100 text-[#e0531c] group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        </div>
      </div>

      <!-- Asistencia Promedio -->
      <div class="bg-white border border-slate-200/80 p-6 rounded-2xl flex items-center justify-between group hover:border-slate-300 hover:shadow-sm transition-all">
        <div class="space-y-1.5">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Asistencia Promedio</span>
          <h3 class="text-3xl font-black text-slate-900">{{ stats.attendancePercentage }}%</h3>
          <span class="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-600 border border-teal-100">
            {{ stats.totalEnrollments }} Inscritos
          </span>
        </div>
        <div class="p-3 bg-teal-50 border border-teal-100 text-teal-600 rounded-xl group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

    </div>

    <!-- CUADRO PRINCIPAL -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

      <!-- TOP VOLUNTARIOS -->
      <div class="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-black text-slate-900">Top 5 Voluntarios</h3>
            <p class="text-xs text-slate-400">Ordenados por asistencias confirmadas.</p>
          </div>
          <NuxtLink
            to="/admin/usuarios"
            class="text-xs font-bold transition-colors text-[#0b31a8] hover:text-blue-800"
          >
            Ver todos →
          </NuxtLink>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead>
              <tr class="border-b border-slate-100 text-slate-400 font-bold text-xs uppercase tracking-wider">
                <th class="pb-3">Voluntario</th>
                <th class="pb-3">Miembro</th>
                <th class="pb-3 text-right">Asistencias</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr
                v-for="(vol, index) in topVolunteers"
                :key="vol.id_usuario"
                class="hover:bg-slate-50/50 transition-colors group"
              >
                <td class="py-3.5 flex items-center space-x-3">
                  <!-- Badges de podio limpios y sofisticados -->
                  <div
                    class="h-8 w-8 rounded-xl flex items-center justify-center font-black text-xs"
                    :class="[
                      index === 0 ? 'bg-amber-50 border border-amber-200 text-amber-700' :
                      index === 1 ? 'bg-slate-100 border border-slate-200 text-slate-600' :
                      index === 2 ? 'bg-orange-50 border border-orange-200 text-orange-700' :
                      'bg-slate-50 border border-slate-150 text-slate-400'
                    ]"
                  >
                    #{{ index + 1 }}
                  </div>
                  <div>
                    <p class="font-bold text-slate-800 group-hover:text-[#0b31a8] transition-colors">{{ vol.nombre_completo }}</p>
                    <p class="text-[10px] font-medium text-slate-400">{{ vol.correo }}</p>
                  </div>
                </td>
                <td class="py-3.5">
                  <span
                    v-if="vol.es_miembro_oficial"
                    class="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100 bg-blue-50 text-[#0b31a8]"
                  >
                    Oficial
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500"
                  >
                    Externo
                  </span>
                </td>
                <td class="py-3.5 text-right font-black pr-4">
                  <span class="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700">
                    {{ vol.total_asistencias }}
                  </span>
                </td>
              </tr>
              <tr v-if="topVolunteers.length === 0">
                <td colspan="3" class="py-8 text-center text-slate-400 text-xs font-medium">
                  No hay asistencias confirmadas todavía.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ACCIONES RÁPIDAS + ACTIVIDADES ACTIVAS -->
      <div class="space-y-6">
        <!-- Acciones -->
        <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 class="text-sm font-black text-slate-900 mb-4">Acciones Rápidas</h3>
          <div class="grid grid-cols-2 gap-3">

            <NuxtLink
              to="/admin/asistencias"
              class="p-4 rounded-xl bg-slate-50/50 hover:bg-slate-50 border border-slate-150 hover:border-slate-300 transition-all text-center flex flex-col items-center space-y-2 group"
            >
              <div class="p-2 rounded-lg border bg-blue-50/50 border-blue-100 text-[#0b31a8] transition-all group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span class="text-xs font-bold text-slate-700 group-hover:text-[#0b31a8]">Asistencia</span>
            </NuxtLink>

            <NuxtLink
              to="/admin/testimonios"
              class="p-4 rounded-xl bg-slate-50/50 hover:bg-slate-50 border border-slate-150 hover:border-slate-300 transition-all text-center flex flex-col items-center space-y-2 group"
            >
              <div
                class="p-2 rounded-lg border bg-orange-50/50 border-orange-100 text-[#e0531c] transition-all group-hover:scale-110 relative"
                :class="[stats.pendingTestimonials > 0 ? 'animate-bounce' : '']"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                <span
                  v-if="stats.pendingTestimonials > 0"
                  class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-white"
                  style="background:#e0531c;"
                ></span>
              </div>
              <span class="text-xs font-bold text-slate-700 group-hover:text-[#e0531c]">Moderación</span>
            </NuxtLink>

            <NuxtLink
              to="/admin/usuarios"
              class="p-4 rounded-xl bg-slate-50/50 hover:bg-slate-50 border border-slate-150 hover:border-slate-300 transition-all text-center flex flex-col items-center space-y-2 group col-span-2"
            >
              <div class="p-2 bg-rose-50 text-rose-600 rounded-lg border border-rose-100 transition-all group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-9-4.5a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm0 13.5a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <span class="text-xs font-bold text-slate-700 group-hover:text-rose-600">Administrar Voluntarios</span>
            </NuxtLink>

          </div>
        </div>

        <!-- Actividades Activas -->
        <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-black text-slate-900">Actividades Activas</h3>
            <NuxtLink to="/admin/proyectos" class="text-xs font-bold text-[#0b31a8] hover:underline">Detalle</NuxtLink>
          </div>
          <div class="space-y-3">
            <div
              v-for="p in activeProjectsList"
              :key="p.id_proyecto"
              class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-150"
            >
              <div class="min-w-0 flex-1 pr-2">
                <p class="text-xs font-bold text-slate-800 truncate">{{ p.titulo }}</p>
                <p class="text-[10px] font-semibold text-slate-400 mt-0.5">{{ formatDateRange(p.fecha_inicio, p.fecha_fin) }}</p>
              </div>
              <!-- Badge Activo basado en el verde claro y estético de la web pública -->
              <span class="flex-shrink-0 px-2 py-0.5 text-[9px] font-black tracking-wide rounded bg-emerald-50 border border-emerald-100 text-emerald-600">
                ACTIVO
              </span>
            </div>
            <div v-if="activeProjectsList.length === 0" class="text-center py-6 text-xs text-slate-400 font-medium">
              No hay proyectos activos actualmente.
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAdminData } from '../../composables/useAdminData'

definePageMeta({ layout: 'admin' })

const { stats, topVolunteers, projects } = useAdminData()

const activeProjectsList = computed(() => {
  return projects.value.filter(p => p.estado === 'ACTIVO').slice(0, 3)
})

function formatDateRange(start: string, end: string) {
  const s = new Date(start)
  const e = new Date(end)
  return `${s.getDate()} ${s.toLocaleString('es-ES', { month: 'short' })} – ${e.getDate()} ${e.toLocaleString('es-ES', { month: 'short' })}`
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>