<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div>
        <h2 class="text-xl font-black text-slate-900">Proyectos y Actividades (CU-07/09)</h2>
        <p class="text-xs text-slate-500">Crea, edita y gestiona el catálogo de iniciativas de la ONG.</p>
      </div>
      <button 
        @click="openAddModal"
        class="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-white text-xs font-black transition-all shadow-sm hover:bg-orange-600 bg-orange-500 active:scale-[0.98] self-start cursor-pointer uppercase tracking-wider"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <span>Nuevo Proyecto</span>
      </button>
    </div>

    <!-- Barra de búsqueda y filtros -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
      <!-- Buscador -->
      <div class="relative flex-1 max-w-md">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
          </svg>
        </span>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Buscar proyecto por título..." 
          class="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#0b31a8] focus:bg-white transition-all"
        />
      </div>

      <!-- Filtros por estado -->
      <div class="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
        <button 
          v-for="status in statesFilter" 
          :key="status.value"
          @click="selectedStateFilter = status.value"
          class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border shrink-0 cursor-pointer uppercase tracking-wide text-[10px]"
          :class="[
            selectedStateFilter === status.value
              ? 'bg-slate-800 text-white border-slate-800 shadow-2xs'
              : 'bg-slate-50 text-slate-500 border-slate-200 hover:text-slate-800 hover:bg-slate-100'
          ]"
        >
          {{ status.label }}
        </button>
      </div>
    </div>

    <!-- LISTADO DE PROYECTOS -->
    <div class="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-wider">
              <th class="p-4">Proyecto</th>
              <th class="p-4">Temática</th>
              <th class="p-4">Inicio / Fin</th>
              <th class="p-4">Estado</th>
              <th class="p-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr 
              v-for="proj in filteredProjects" 
              :key="proj.id_proyecto"
              class="hover:bg-slate-50/50 transition-colors"
            >
              <!-- Info Básica -->
              <td class="p-4">
                <div class="max-w-xs">
                  <p class="font-bold text-slate-800 transition-colors">{{ proj.titulo }}</p>
                  <p class="text-xs text-slate-400 font-medium truncate mt-0.5">{{ proj.descripcion }}</p>
                </div>
              </td>

              <!-- Temática -->
              <td class="p-4">
                <span class="text-xs text-indigo-600 font-bold bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">
                  {{ getTematicaName(proj.id_tematica) }}
                </span>
              </td>

              <!-- Rango de fechas -->
              <td class="p-4 text-xs text-slate-600 font-medium">
                <div>
                  <span class="text-[9px] text-slate-400 font-black uppercase tracking-wide block">Inicio:</span>
                  {{ formatDateTime(proj.fecha_inicio) }}
                </div>
                <div class="mt-1">
                  <span class="text-[9px] text-slate-400 font-black uppercase tracking-wide block">Fin:</span>
                  {{ formatDateTime(proj.fecha_fin) }}
                </div>
              </td>

              <!-- Estado -->
              <td class="p-4">
                <span 
                  class="inline-flex items-center text-[10px] font-black tracking-wide px-2.5 py-0.5 rounded-full uppercase"
                  :class="[
                    proj.estado === 'ACTIVO' ? 'bg-emerald-100 text-emerald-700' :
                    proj.estado === 'PASADO' ? 'bg-slate-100 text-slate-600' :
                    'bg-rose-100 text-rose-700'
                  ]"
                >
                  {{ proj.estado }}
                </span>
              </td>

              <!-- Acciones -->
              <td class="p-4 text-center">
                <div class="flex items-center justify-center space-x-2">
                  <!-- Detalles -->
                  <button 
                    @click="openDetailsModal(proj)"
                    class="p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                    title="Ver Detalles e Inscritos"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>

                  <!-- Editar -->
                  <button 
                    @click="openEditModal(proj)"
                    class="p-2 rounded-lg bg-blue-50 border border-blue-200 text-[#0b31a8] hover:bg-[#0b31a8] hover:text-white hover:border-transparent transition-all cursor-pointer"
                    title="Editar Proyecto"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                  </button>

                  <!-- Cambiar Estado menú -->
                  <div class="relative inline-block text-left">
                    <select 
                      :value="proj.estado" 
                      @change="handleStatusChange(proj.id_proyecto, ($event.target as HTMLSelectElement).value as any)"
                      class="bg-slate-50 border border-slate-200 text-[10px] font-black text-slate-700 rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#0b31a8] transition-colors cursor-pointer uppercase"
                    >
                      <option value="ACTIVO">Activo</option>
                      <option value="PASADO">Pasado</option>
                      <option value="CANCELADO">Cancelado</option>
                    </select>
                  </div>
                </div>
              </td>
            </tr>

            <tr v-if="filteredProjects.length === 0">
              <td colspan="5" class="py-12 text-center text-slate-400 text-xs font-medium italic">
                No se encontraron proyectos con los criterios de búsqueda actuales.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL: CREAR O EDITAR PROYECTO -->
    <transition name="fade">
      <div 
        v-if="isFormModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      >
        <div class="bg-white border border-slate-200 w-full max-w-xl rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col animate-fade-in">
          <!-- Header -->
          <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <h3 class="text-sm font-black text-slate-800 uppercase tracking-wide">
              {{ isEditing ? 'Actualizar Proyecto (CU-09)' : 'Crear Proyecto (CU-09)' }}
            </h3>
            <button @click="isFormModalOpen = false" class="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l18 18" />
              </svg>
            </button>
          </div>

          <!-- Body Form -->
          <form @submit.prevent="submitForm" class="p-6 space-y-4 overflow-y-auto flex-1 text-left">
            <!-- Título -->
            <div class="space-y-1">
              <label class="text-[10px] uppercase font-black text-slate-400 block tracking-wider">Título del Proyecto</label>
              <input 
                v-model="form.titulo" 
                type="text" 
                required
                placeholder="Ej. Mochilas de Esperanza 2026"
                class="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#0b31a8] focus:bg-white transition-all"
              />
            </div>

            <!-- Eje Temático -->
            <div class="space-y-1">
              <label class="text-[10px] uppercase font-black text-slate-400 block tracking-wider">Eje Temático</label>
              <select 
                v-model="form.id_tematica"
                required
                class="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#0b31a8] focus:bg-white transition-all cursor-pointer"
              >
                <option :value="null" disabled>Selecciona una Temática</option>
                <option 
                  v-for="tem in activeThematics" 
                  :key="tem.id_tematica" 
                  :value="tem.id_tematica"
                >
                  {{ tem.nombre }}
                </option>
              </select>
            </div>

            <!-- Descripción -->
            <div class="space-y-1">
              <label class="text-[10px] uppercase font-black text-slate-400 block tracking-wider">Descripción</label>
              <textarea 
                v-model="form.descripcion" 
                rows="4"
                required
                placeholder="Detalla de qué trata el proyecto, objetivos y lugar..."
                class="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#0b31a8] focus:bg-white transition-all"
              ></textarea>
            </div>

            <!-- Fechas -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-[10px] uppercase font-black text-slate-400 block tracking-wider">Fecha y Hora de Inicio</label>
                <input 
                  v-model="form.fecha_inicio" 
                  type="datetime-local" 
                  required
                  class="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#0b31a8] focus:bg-white transition-all"
                />
              </div>

              <div class="space-y-1">
                <label class="text-[10px] uppercase font-black text-slate-400 block tracking-wider">Fecha y Hora de Fin</label>
                <input 
                  v-model="form.fecha_fin" 
                  type="datetime-local" 
                  required
                  class="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#0b31a8] focus:bg-white transition-all"
                />
              </div>
            </div>
          </form>

          <!-- Footer -->
          <div class="px-6 py-4 border-t border-slate-100 flex justify-end space-x-3 bg-slate-50">
            <button 
              type="button" 
              @click="isFormModalOpen = false" 
              class="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer uppercase"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              @click="submitForm"
              class="px-5 py-2 text-white text-xs font-black rounded-xl shadow-xs transition-all bg-[#0b31a8] hover:bg-blue-800 cursor-pointer uppercase tracking-wider"
            >
              Guardar Proyecto
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- MODAL: DETALLES E INSCRITOS -->
    <transition name="fade">
      <div 
        v-if="isDetailsModalOpen && selectedProject"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      >
        <div class="bg-white border border-slate-200 w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col animate-fade-in">
          <!-- Header -->
          <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div>
              <h3 class="text-sm font-black text-slate-800 uppercase tracking-wide">Detalle de Proyecto</h3>
              <p class="text-[10px] text-indigo-600 font-bold uppercase mt-0.5">{{ getTematicaName(selectedProject.id_tematica) }}</p>
            </div>
            <button @click="isDetailsModalOpen = false" class="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l18 18" />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="p-6 space-y-6 overflow-y-auto flex-1 text-left">
            <!-- Título y descripción -->
            <div class="space-y-2">
              <h4 class="text-base font-bold text-slate-900">{{ selectedProject.titulo }}</h4>
              <p class="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 font-medium">
                {{ selectedProject.descripcion }}
              </p>
            </div>

            <!-- Detalles de fechas y estado -->
            <div class="grid grid-cols-3 gap-4">
              <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center shadow-3xs">
                <span class="text-[9px] uppercase font-black text-slate-400 block mb-1 tracking-wider">Estado</span>
                <span class="text-xs font-black text-slate-800">{{ selectedProject.estado }}</span>
              </div>
              <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center shadow-3xs">
                <span class="text-[9px] uppercase font-black text-slate-400 block mb-1 tracking-wider">Fecha Inicio</span>
                <span class="text-[10px] font-bold text-slate-700">{{ formatDateTime(selectedProject.fecha_inicio) }}</span>
              </div>
              <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center shadow-3xs">
                <span class="text-[9px] uppercase font-black text-slate-400 block mb-1 tracking-wider">Fecha Fin</span>
                <span class="text-[10px] font-bold text-slate-700">{{ formatDateTime(selectedProject.fecha_fin) }}</span>
              </div>
            </div>

            <!-- LISTADO DE VOLUNTARIOS INSCRITOS (CU-14) -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <h4 class="text-[10px] font-black uppercase tracking-wider text-slate-500">Voluntarios Inscritos ({{ projectEnrolls.length }})</h4>
                <NuxtLink 
                  to="/admin/asistencias" 
                  class="text-[10px] font-black text-[#0b31a8] hover:underline uppercase tracking-wide"
                  @click="isDetailsModalOpen = false"
                >
                  Pase de asistencia
                </NuxtLink>
              </div>

              <div class="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div class="max-h-48 overflow-y-auto">
                  <table class="w-full text-left text-xs">
                    <thead>
                      <tr class="border-b border-slate-200 text-slate-500 font-black text-[10px] bg-slate-50 uppercase tracking-wider">
                        <th class="p-3">Nombre</th>
                        <th class="p-3">Inscripción</th>
                        <th class="p-3 text-center">Asistió</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                      <tr 
                        v-for="enroll in projectEnrolls" 
                        :key="enroll.id_asistencia"
                        class="hover:bg-slate-50/50 transition-colors"
                      >
                        <td class="p-3">
                          <p class="font-bold text-slate-800">{{ enroll.nombre_completo }}</p>
                          <p class="text-[11px] font-medium text-slate-400">{{ enroll.correo }}</p>
                        </td>
                        <td class="p-3 text-slate-600 font-medium">
                          {{ formatDate(enroll.fecha_inscripcion) }}
                        </td>
                        <td class="p-3 text-center">
                          <span 
                            class="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wide"
                            :class="[
                              enroll.asistio 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'bg-rose-100 text-rose-700'
                            ]"
                          >
                            {{ enroll.asistio ? 'Sí' : 'No' }}
                          </span>
                        </td>
                      </tr>

                      <tr v-if="projectEnrolls.length === 0">
                        <td colspan="3" class="py-8 text-center text-slate-400 italic font-medium">
                          No hay voluntarios inscritos en este proyecto todavía.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-6 py-4 border-t border-slate-100 flex justify-end bg-slate-50">
            <button 
              @click="isDetailsModalOpen = false" 
              class="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer uppercase"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useAdminData, addToast } from '../../composables/useAdminData'

definePageMeta({
  layout: 'admin'
})

const { 
  projects, 
  thematics, 
  attendances, 
  users, 
  addProject, 
  editProject, 
  changeProjectStatus 
} = useAdminData()

// Variables reactivas
const searchQuery = ref('')
const selectedStateFilter = ref('TODOS')
const isFormModalOpen = ref(false)
const isEditing = ref(false)
const editingId = ref<number | null>(null)
const isDetailsModalOpen = ref(false)
const selectedProject = ref<any>(null)

// Filtros
const statesFilter = [
  { label: 'Todos', value: 'TODOS' },
  { label: 'Activos', value: 'ACTIVO' },
  { label: 'Pasados', value: 'PASADO' },
  { label: 'Cancelados', value: 'CANCELADO' }
]

// Formulario de creación/edición
const form = reactive({
  titulo: '',
  id_tematica: null as number | null,
  descripcion: '',
  fecha_inicio: '',
  fecha_fin: ''
})

// Filtrado de temáticas activas para el dropdown
const activeThematics = computed(() => {
  return thematics.value.filter(t => t.estado === 'ACTIVO')
})

// Obtener nombre de la temática
function getTematicaName(id: number | null) {
  if (id === null) return 'Sin Temática'
  const tem = thematics.value.find(t => t.id_tematica === id)
  return tem ? tem.nombre : 'Sin Temática'
}

// Filtro de proyectos
const filteredProjects = computed(() => {
  return projects.value.filter(p => {
    const matchesSearch = p.titulo.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesState = selectedStateFilter.value === 'TODOS' || p.estado === selectedStateFilter.value
    return matchesSearch && matchesState
  })
})

// Cambiar estado directo
function handleStatusChange(id: number, state: any) {
  changeProjectStatus(id, state)
}

// Formateadores de fecha
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

// Convertidores de fecha para input
function toLocalDatetimeString(isoStr: string) {
  if (!isoStr) return ''
  const date = new Date(isoStr)
  const tzoffset = date.getTimezoneOffset() * 60000
  const localISOTime = (new Date(date.getTime() - tzoffset)).toISOString().slice(0, 16)
  return localISOTime
}

// Modales abrir/cerrar
function openAddModal() {
  isEditing.value = false
  editingId.value = null
  form.titulo = ''
  form.id_tematica = activeThematics.value[0]?.id_tematica || null
  form.descripcion = ''
  
  // Setear por defecto hoy y hoy + 3 horas
  const now = new Date()
  const later = new Date(now.getTime() + 3 * 60 * 60 * 1000)
  form.fecha_inicio = toLocalDatetimeString(now.toISOString())
  form.fecha_fin = toLocalDatetimeString(later.toISOString())

  isFormModalOpen.value = true
}

function openEditModal(proj: any) {
  isEditing.value = true
  editingId.value = proj.id_proyecto
  form.titulo = proj.titulo
  form.id_tematica = proj.id_tematica
  form.descripcion = proj.descripcion
  form.fecha_inicio = toLocalDatetimeString(proj.fecha_inicio)
  form.fecha_fin = toLocalDatetimeString(proj.fecha_fin)

  isFormModalOpen.value = true
}

// Guardar
async function submitForm() {
  // Validaciones
  if (!form.titulo || !form.descripcion || !form.fecha_inicio || !form.fecha_fin) {
    addToast('Por favor completa todos los campos del formulario.', 'error')
    return
  }

  const start = new Date(form.fecha_inicio)
  const end = new Date(form.fecha_fin)

  if (start >= end) {
    addToast('La fecha de inicio debe ser menor a la fecha de fin (CU-09).', 'error')
    return
  }

  try {
    const dataToSend = {
      id_tematica: form.id_tematica,
      titulo: form.titulo,
      descripcion: form.descripcion,
      fecha_inicio: start.toISOString(),
      fecha_fin: end.toISOString()
    }

    if (isEditing.value && editingId.value) {
      await editProject(editingId.value, dataToSend)
    } else {
      await addProject({
        ...dataToSend,
        estado: 'ACTIVO'
      })
    }
    isFormModalOpen.value = false
  } catch (err) {
    console.error(err)
  }
}

// Detalles modal e inscritos
const projectEnrolls = computed(() => {
  if (!selectedProject.value) return []
  return attendances.value
    .filter(a => a.id_proyecto === selectedProject.value.id_proyecto)
    .map(a => {
      const u = users.value.find(user => user.id_usuario === a.id_usuario)
      return {
        id_asistencia: a.id_asistencia,
        nombre_completo: u ? u.nombre_completo : 'Voluntario Desconocido',
        correo: u ? u.correo : '',
        fecha_inscripcion: a.fecha_inscripcion,
        asistio: a.asistio
      }
    })
})

function openDetailsModal(proj: any) {
  selectedProject.value = proj
  isDetailsModalOpen.value = true
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>