<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div>
        <h2 class="text-xl font-black text-slate-900">Control y Pase de Asistencias (CU-14/15)</h2>
        <p class="text-xs text-slate-500">Selecciona una actividad para marcar la asistencia de los voluntarios inscritos.</p>
      </div>
    </div>

    <!-- SELECCIÓN DE PROYECTO -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Panel de Selección Izquierdo -->
      <div class="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-4 h-fit">
        <div class="space-y-1">
          <label class="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Seleccionar Proyecto</label>
          <select 
            v-model="selectedProjectId" 
            @change="handleProjectChange"
            class="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#0b31a8] focus:bg-white transition-all cursor-pointer"
          >
            <option :value="null">-- Selecciona un Proyecto --</option>
            <option 
              v-for="p in availableProjects" 
              :key="p.id_proyecto" 
              :value="p.id_proyecto"
            >
              [{{ p.estado }}] {{ p.titulo }}
            </option>
          </select>
        </div>

        <!-- Info del Proyecto Seleccionado -->
        <transition name="fade">
          <div v-if="selectedProject" class="space-y-3 pt-4 border-t border-slate-100 text-left">
            <h3 class="text-sm font-black text-[#0b31a8]">{{ selectedProject.titulo }}</h3>
            <p class="text-xs text-slate-600 leading-relaxed truncate-3-lines">{{ selectedProject.descripcion }}</p>
            
            <div class="text-[11px] space-y-2 text-slate-500 font-semibold pt-1">
              <div class="flex justify-between items-center">
                <span>Estado:</span>
                <span class="font-black uppercase text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{{ selectedProject.estado }}</span>
              </div>
              <div class="flex justify-between">
                <span>Inicio:</span>
                <span class="text-slate-700 font-medium">{{ formatDateTime(selectedProject.fecha_inicio) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Fin:</span>
                <span class="text-slate-700 font-medium">{{ formatDateTime(selectedProject.fecha_fin) }}</span>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Panel de Estadísticas y Listado Derecho -->
      <div class="lg:col-span-2 space-y-6">
        <transition name="fade" mode="out-in">
          <!-- Si no hay proyecto seleccionado -->
          <div 
            v-if="!selectedProject" 
            class="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center text-slate-400 text-xs font-medium italic flex flex-col items-center justify-center space-y-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-10 h-10 text-slate-300">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75 2.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 2.24a4.5 4.5 0 1110.122 0M9.75 10.5c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25c-.621 0-1.125-.504-1.125-1.125V10.5z" />
            </svg>
            <span>Selecciona un proyecto de la lista de la izquierda para comenzar el pase de asistencia.</span>
          </div>

          <!-- Si hay proyecto seleccionado -->
          <div v-else class="space-y-6 animate-fade-in">
            <!-- Estadísticas del Proyecto (Métricas Claras) -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div class="bg-white border border-slate-200 p-4 rounded-xl text-center shadow-2xs">
                <span class="text-[9px] uppercase font-black text-slate-400 tracking-wider block mb-1">Inscritos</span>
                <span class="text-xl font-black text-slate-800">{{ projectStats.inscribed }}</span>
              </div>
              <div class="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center shadow-2xs">
                <span class="text-[9px] uppercase font-black text-emerald-600 tracking-wider block mb-1">Asistieron</span>
                <span class="text-xl font-black text-emerald-600">{{ projectStats.attended }}</span>
              </div>
              <div class="bg-rose-50 border border-rose-100 p-4 rounded-xl text-center shadow-2xs">
                <span class="text-[9px] uppercase font-black text-rose-600 tracking-wider block mb-1">Faltaron</span>
                <span class="text-xl font-black text-rose-600">{{ projectStats.absent }}</span>
              </div>
              <div class="bg-blue-50 border border-blue-100 p-4 rounded-xl text-center shadow-2xs">
                <span class="text-[9px] uppercase font-black text-[#0b31a8] tracking-wider block mb-1">% Asistencia</span>
                <span class="text-xl font-black text-[#0b31a8]">{{ projectStats.rate }}%</span>
              </div>
            </div>

            <!-- Controles de listado e inscripción rápida -->
            <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
              <!-- Filtro de búsqueda -->
              <div class="relative flex-1">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
                  </svg>
                </span>
                <input 
                  v-model="searchQuery" 
                  type="text" 
                  placeholder="Buscar voluntario en la lista..." 
                  class="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#0b31a8] focus:bg-white transition-all"
                />
              </div>

              <!-- Inscripción rápida dropdown -->
              <div class="flex items-center space-x-2 shrink-0">
                <select 
                  v-model="userToEnrollId"
                  class="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#0b31a8] focus:bg-white transition-all max-w-[200px] cursor-pointer"
                >
                  <option :value="null">-- Inscribir rápido --</option>
                  <option 
                    v-for="u in nonEnrolledUsers" 
                    :key="u.id_usuario" 
                    :value="u.id_usuario"
                  >
                    {{ u.nombre_completo }}
                  </option>
                </select>
                <button 
                  @click="handleQuickEnroll"
                  :disabled="!userToEnrollId"
                  class="px-4 py-2.5 text-white text-xs font-bold rounded-xl transition-all shadow-sm disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 disabled:cursor-not-allowed disabled:scale-100 hover:scale-[1.02] active:scale-[0.98]"
                  style="background: linear-gradient(135deg, #0b31a8 0%, #1e3a8a 100%);"
                >
                  Inscribir
                </button>
              </div>
            </div>

            <!-- Listado de Asistencias Tabla Corporativa (CU-14) -->
            <div class="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden text-left">
              <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                  <thead>
                    <tr class="border-b border-slate-200 bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-wider">
                      <th class="p-4">Voluntario</th>
                      <th class="p-4">Socio Oficial</th>
                      <th class="p-4">Inscrito el</th>
                      <th class="p-4 text-center">¿Asistió? (CU-14/15)</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100">
                    <tr 
                      v-for="enroll in filteredEnrolls" 
                      :key="enroll.id_asistencia"
                      class="hover:bg-slate-50/50 transition-colors"
                    >
                      <!-- Info Voluntario -->
                      <td class="p-4">
                        <div>
                          <p class="font-bold text-slate-800">{{ enroll.nombre_completo }}</p>
                          <p class="text-xs text-slate-400">{{ enroll.correo }}</p>
                        </div>
                      </td>

                      <!-- Socio -->
                      <td class="p-4 text-xs">
                        <span 
                          v-if="enroll.es_miembro_oficial"
                          class="inline-flex items-center text-[10px] font-black px-2 py-0.5 rounded border bg-blue-50 border-blue-100 text-[#0b31a8]"
                        >
                          Oficial
                        </span>
                        <span 
                          v-else
                          class="text-slate-400 italic text-xs font-medium"
                        >
                          No oficial
                        </span>
                      </td>

                      <!-- Fecha Inscripción -->
                      <td class="p-4 text-xs text-slate-600 font-medium">
                        {{ formatDate(enroll.fecha_inscripcion) }}
                      </td>

                      <!-- Pase asistencia interactivo con Toggle Claro -->
                      <td class="p-4 text-center">
                        <div class="flex items-center justify-center">
                          <label class="relative inline-flex items-center cursor-pointer select-none">
                            <input 
                              type="checkbox" 
                              :checked="enroll.asistio"
                              @change="toggleAttendanceState(enroll.id_usuario, !enroll.asistio)"
                              class="sr-only peer"
                            >
                            <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                            <span class="ml-3 text-xs font-black min-w-[55px]" :class="[enroll.asistio ? 'text-emerald-600' : 'text-slate-400']">
                              {{ enroll.asistio ? 'ASISTIÓ' : 'FALTÓ' }}
                            </span>
                          </label>
                        </div>
                      </td>
                    </tr>

                    <tr v-if="filteredEnrolls.length === 0">
                      <td colspan="4" class="py-12 text-center text-slate-400 text-xs font-medium italic">
                        Ningún voluntario coincide con la búsqueda.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Nota de guardado instantáneo -->
            <p class="text-[10px] text-slate-400 text-right font-medium italic">
              * Nota: Las asistencias se guardan automáticamente al presionar el interruptor.
            </p>
          </div>
        </transition>
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

const { 
  projects, 
  attendances, 
  users, 
  markAttendance, 
  enrollUserInProject 
} = useAdminData()

const selectedProjectId = ref<number | null>(null)
const searchQuery = ref('')
const userToEnrollId = ref<number | null>(null)

// Proyectos ordenados por fecha
const availableProjects = computed(() => {
  return [...projects.value].sort((a, b) => new Date(b.fecha_inicio).getTime() - new Date(a.fecha_inicio).getTime())
})

// Proyecto actual seleccionado
const selectedProject = computed(() => {
  if (!selectedProjectId.value) return null
  return projects.value.find(p => p.id_proyecto === selectedProjectId.value) || null
})

// Cambios de proyecto limpian estados
function handleProjectChange() {
  searchQuery.value = ''
  userToEnrollId.value = null
}

// Voluntarios inscritos en el proyecto seleccionado
const enrolledVolunteers = computed(() => {
  if (!selectedProjectId.value) return []
  return attendances.value
    .filter(a => a.id_proyecto === selectedProjectId.value)
    .map(a => {
      const u = users.value.find(user => user.id_usuario === a.id_usuario)
      return {
        id_asistencia: a.id_asistencia,
        id_usuario: a.id_usuario,
        nombre_completo: u ? u.nombre_completo : 'Usuario Desconocido',
        correo: u ? u.correo : '',
        es_miembro_oficial: u ? u.es_miembro_oficial : false,
        fecha_inscripcion: a.fecha_inscripcion,
        asistio: a.asistio
      }
    })
})

// Voluntarios filtrados
const filteredEnrolls = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return enrolledVolunteers.value
  return enrolledVolunteers.value.filter(v => 
    v.nombre_completo.toLowerCase().includes(q) || v.correo.toLowerCase().includes(q)
  )
})

// Usuarios no inscritos para inscripción rápida
const nonEnrolledUsers = computed(() => {
  if (!selectedProjectId.value) return []
  const enrolledIds = enrolledVolunteers.value.map(v => v.id_usuario)
  return users.value.filter(u => u.estado === 'ACTIVO' && !enrolledIds.includes(u.id_usuario))
})

// Estadísticas rápidas del proyecto seleccionado
const projectStats = computed(() => {
  const list = enrolledVolunteers.value
  const inscribed = list.length
  const attended = list.filter(v => v.asistio).length
  const absent = inscribed - attended
  const rate = inscribed ? Math.round((attended / inscribed) * 100) : 0
  return { inscribed, attended, absent, rate }
})

// Inscribir rápido
async function handleQuickEnroll() {
  if (!selectedProjectId.value || !userToEnrollId.value) return
  await enrollUserInProject(userToEnrollId.value, selectedProjectId.value)
  userToEnrollId.value = null
}

// Marcar asistencia instantánea (CU-14/15)
function toggleAttendanceState(userId: number, state: boolean) {
  if (!selectedProjectId.value) return
  markAttendance(userId, selectedProjectId.value, state)
}

// Formateadores
function formatDateTime(isoStr: string) {
  const d = new Date(isoStr)
  return d.toLocaleString('es-ES', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

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

.truncate-3-lines {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>