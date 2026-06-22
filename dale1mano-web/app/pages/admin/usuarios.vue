<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div>
        <h2 class="text-xl font-black text-slate-900">Voluntarios y Usuarios Registrados (CU-12)</h2>
        <p class="text-xs text-slate-500">Busca voluntarios, promueve a miembros oficiales y gestiona accesos.</p>
      </div>
    </div>

    <!-- TARJETAS DE CONTEO RÁPIDO (MÉTRICAS CLARAS) -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <!-- Total Voluntarios -->
      <div class="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between shadow-2xs">
        <div>
          <span class="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Voluntarios Totales</span>
          <h3 class="text-2xl font-black text-slate-800 mt-1">{{ totalVolunteers }}</h3>
        </div>
        <div class="p-2.5 rounded-xl border bg-blue-50 border-blue-100 text-[#0b31a8]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493" />
          </svg>
        </div>
      </div>

      <!-- Miembros Oficiales -->
      <div class="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between shadow-2xs">
        <div>
          <span class="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Miembros Oficiales (CU-13)</span>
          <h3 class="text-2xl font-black text-emerald-600 mt-1">{{ officialMembers }}</h3>
        </div>
        <div class="p-2.5 rounded-xl border bg-emerald-50 border-emerald-100 text-emerald-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <!-- Inactivos -->
      <div class="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between shadow-2xs">
        <div>
          <span class="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Inactivos</span>
          <h3 class="text-2xl font-black text-rose-600 mt-1">{{ inactiveUsers }}</h3>
        </div>
        <div class="p-2.5 rounded-xl border bg-rose-50 border-rose-100 text-rose-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Barra de búsqueda -->
    <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
      <div class="relative max-w-md w-full">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
          </svg>
        </span>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Buscar voluntario por nombre o correo (CU-12)..." 
          class="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#0b31a8] focus:bg-white transition-all"
        />
      </div>
    </div>

    <!-- TABLA DE VOLUNTARIOS (DISEÑO CORPORATIVO CLARO) -->
    <div class="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden text-left">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-wider">
              <th class="p-4">Voluntario</th>
              <th class="p-4">Fecha de Registro</th>
              <th class="p-4">Rol</th>
              <th class="p-4">Actividades (CU-14/15)</th>
              <th class="p-4">Miembro Oficial (CU-13)</th>
              <th class="p-4">Estado</th>
              <th class="p-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr 
              v-for="user in searchedUsers" 
              :key="user.id_usuario"
              class="hover:bg-slate-50/50 transition-colors"
            >
              <!-- Info Básica -->
              <td class="p-4">
                <div>
                  <p class="font-bold text-slate-800">{{ user.nombre_completo }}</p>
                  <p class="text-xs text-slate-400 font-medium">{{ user.correo }}</p>
                </div>
              </td>

              <!-- Fecha de Registro -->
              <td class="p-4 text-xs text-slate-600 font-medium">
                {{ formatDate(user.fecha_registro) }}
              </td>

              <!-- Rol Selector Claro -->
              <td class="p-4 text-xs">
                <select 
                  :value="user.rol" 
                  @change="handleRoleChange(user.id_usuario, ($event.target as HTMLSelectElement).value as any)"
                  class="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#0b31a8] focus:bg-white transition-all cursor-pointer"
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </td>

              <!-- Actividades / Participación badges limpios -->
              <td class="p-4">
                <div class="flex items-center space-x-1.5 font-black text-[10px] uppercase tracking-wide">
                  <span 
                    class="px-2 py-0.5 rounded border bg-slate-50 border-slate-200 text-slate-500" 
                    title="Proyectos a los que se inscribió"
                  >
                    {{ getUserActivityStats(user.id_usuario).inscribed }} Insc.
                  </span>
                  <span 
                    class="px-2 py-0.5 rounded border bg-emerald-50 border-emerald-100 text-emerald-600" 
                    title="Asistencias reales registradas"
                  >
                    {{ getUserActivityStats(user.id_usuario).attended }} Asist.
                  </span>
                </div>
              </td>

              <!-- Miembro Oficial -->
              <td class="p-4">
                <div class="flex items-center">
                  <span 
                    v-if="user.es_miembro_oficial"
                    class="inline-flex items-center text-[10px] font-black tracking-wide px-2.5 py-0.5 rounded border bg-blue-50 border-blue-100 text-[#0b31a8] uppercase"
                  >
                    Socio Oficial
                  </span>
                  <button 
                    v-else
                    @click="handlePromote(user.id_usuario)"
                    class="inline-flex items-center text-[10px] font-black px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-600 hover:text-white hover:border-transparent transition-all cursor-pointer"
                    title="Promover a miembro oficial"
                  >
                    Promover (CU-13)
                  </button>
                </div>
              </td>

              <!-- Estado -->
              <td class="p-4">
                <span 
                  class="inline-flex items-center text-[10px] font-black tracking-wide px-2.5 py-0.5 rounded-full uppercase"
                  :class="[
                    user.estado === 'ACTIVO' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  ]"
                >
                  {{ user.estado }}
                </span>
              </td>

              <!-- Acciones cambiar estado -->
              <td class="p-4 text-center">
                <button 
                  @click="handleToggleStatus(user.id_usuario)"
                  class="px-3 py-1.5 rounded-lg text-[10px] font-black transition-all border cursor-pointer"
                  :class="[
                    user.estado === 'ACTIVO' 
                      ? 'bg-rose-50 hover:bg-rose-600 border-rose-200 text-rose-600 hover:text-white hover:border-transparent' 
                      : 'bg-emerald-50 hover:bg-emerald-600 border-emerald-200 text-emerald-600 hover:text-white hover:border-transparent'
                  ]"
                >
                  {{ user.estado === 'ACTIVO' ? 'Desactivar' : 'Activar' }}
                </button>
              </td>
            </tr>

            <tr v-if="searchedUsers.length === 0">
              <td colspan="7" class="py-12 text-center text-slate-400 text-xs font-medium italic">
                No se encontraron usuarios que coincidan con la búsqueda.
              </td>
            </tr>
          </tbody>
        </table>
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

const { users, attendances, toggleUserStatus, promoteToOfficial, changeUserRole } = useAdminData()

const searchQuery = ref('')

// Conteo de actividades por usuario (CU-14/15)
function getUserActivityStats(userId: number) {
  const userEnrolls = attendances.value.filter(a => a.id_usuario === userId)
  const inscribed = userEnrolls.length
  const attended = userEnrolls.filter(a => a.asistio).length
  return { inscribed, attended }
}

// Conteos rápidos
const totalVolunteers = computed(() => users.value.length)
const officialMembers = computed(() => users.value.filter(u => u.es_miembro_oficial).length)
const inactiveUsers = computed(() => users.value.filter(u => u.estado === 'INACTIVO').length)

// Buscador reactivo (CU-12: SP_BuscarUsuarios)
const searchedUsers = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return users.value
  
  return users.value.filter(u => {
    return u.nombre_completo.toLowerCase().includes(q) || u.correo.toLowerCase().includes(q)
  })
})

// Acciones
function handleToggleStatus(id: number) {
  toggleUserStatus(id)
}

function handlePromote(id: number) {
  promoteToOfficial(id)
}

function handleRoleChange(id: number, rol: any) {
  changeUserRole(id, rol)
}

// Formateador de fecha
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