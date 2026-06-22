<template>
  <div class="space-y-6 animate-fade-in">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div>
        <h2 class="text-xl font-black text-slate-900">Junta Directiva y Miembros (CU-04/10)</h2>
        <p class="text-xs text-slate-500">Administra los directores y coordinadores de la organización y su jerarquía de visualización.</p>
      </div>
      <button 
        @click="openAddModal"
        class="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-white text-xs font-bold transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] self-start"
        style="background: linear-gradient(135deg, #e0531c 0%, #f06732 100%); box-shadow: 0 4px 14px rgba(224,83,28,0.25);"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <span>Añadir Miembro</span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
      <div 
        v-for="member in boardMembers" 
        :key="member.id_miembro"
        class="bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm p-6 rounded-2xl flex flex-col justify-between items-center text-center transition-all group relative overflow-hidden"
      >
        <span class="absolute top-4 left-4 text-[9px] font-black px-2 py-0.5 rounded bg-blue-50 border border-blue-100 text-[#0b31a8] tracking-wider">
          ORDEN #{{ member.orden_jerarquia }}
        </span>

        <div class="mt-4 mb-4 relative">
          <img 
            :src="member.url_fotografia || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'" 
            :alt="member.nombre_completo"
            class="w-24 h-24 rounded-full object-cover border-2 shadow-sm transition-transform group-hover:scale-105"
            style="border-color: #0b31a8;"
          />
        </div>

        <div class="space-y-1 mb-6">
          <h3 class="font-black text-slate-800 group-hover:text-[#0b31a8] transition-colors text-sm">
            {{ member.nombre_completo }}
          </h3>
          <p class="text-xs font-bold text-slate-500">{{ member.cargo }}</p>
        </div>

        <div class="w-full pt-4 border-t border-slate-100 flex items-center justify-between space-x-2">
          <button 
            @click="openEditModal(member)"
            class="flex-1 py-1.5 rounded-lg text-[10px] font-black transition-all bg-blue-50 border border-blue-100 text-[#0b31a8] hover:bg-[#0b31a8] hover:text-white hover:border-[#0b31a8]"
          >
            Editar (CU-10)
          </button>
          
          <button 
            @click="handleDelete(member.id_miembro)"
            class="p-1.5 rounded-lg bg-rose-50 border border-rose-100 hover:bg-rose-600 text-rose-600 hover:text-white transition-all"
            title="Eliminar miembro"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
      </div>

      <div v-if="boardMembers.length === 0" class="col-span-full py-12 text-center text-slate-400 text-sm font-medium italic">
        No hay miembros en la junta directiva registrados.
      </div>
    </div>

    <transition name="fade">
      <div 
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs"
      >
        <div class="bg-white border border-slate-200 w-full max-w-lg rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col animate-fade-in">
          <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 class="text-sm font-black text-slate-900">
              {{ isEditing ? 'Actualizar Miembro de Junta (CU-10)' : 'Añadir Miembro de Junta' }}
            </h3>
            <button @click="isModalOpen = false" class="text-slate-400 hover:text-slate-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l18 18" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="submitForm" class="p-6 space-y-4 text-left overflow-y-auto">
            <div class="space-y-1">
              <label class="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Nombre Completo</label>
              <input 
                v-model="form.nombre_completo" 
                type="text" 
                required
                :disabled="isEditing"
                placeholder="Ej. Ing. Fernando Valeriano"
                class="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#0b31a8] focus:bg-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              />
              <span v-if="isEditing" class="text-[10px] text-slate-400 font-medium italic block mt-1">
                El nombre completo no se puede editar debido a restricciones del sistema.
              </span>
            </div>

            <div class="space-y-1">
              <label class="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Cargo</label>
              <input 
                v-model="form.cargo" 
                type="text" 
                required
                placeholder="Ej. Coordinador de Finanzas"
                class="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#0b31a8] focus:bg-white transition-all"
              />
            </div>

            <div class="space-y-1">
              <label class="text-[10px] uppercase font-black text-slate-400 tracking-wider block">URL de Fotografía</label>
              <input 
                v-model="form.url_fotografia" 
                type="url" 
                placeholder="https://images.unsplash.com/..."
                class="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#0b31a8] focus:bg-white transition-all"
              />
            </div>

            <div class="space-y-1">
              <label class="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Orden de Jerarquía (Para posicionamiento)</label>
              <input 
                v-model.number="form.orden_jerarquia" 
                type="number" 
                min="1"
                required
                placeholder="Ej. 1"
                class="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#0b31a8] focus:bg-white transition-all"
              />
            </div>
          </form>

          <div class="px-6 py-4 border-t border-slate-100 flex justify-end space-x-3 bg-slate-50">
            <button 
              type="button" 
              @click="isModalOpen = false" 
              class="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              @click="submitForm"
              class="px-5 py-2 text-white text-xs font-bold rounded-xl shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              style="background: linear-gradient(135deg, #0b31a8 0%, #1e3a8a 100%);"
            >
              Guardar Miembro
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAdminData, addToast } from '../../composables/useAdminData'

definePageMeta({
  layout: 'admin'
})

const { boardMembers, addBoardMember, editBoardMember, deleteBoardMember } = useAdminData()

// Variables reactivas
const isModalOpen = ref(false)
const isEditing = ref(false)
const editingId = ref<number | null>(null)

const form = reactive({
  nombre_completo: '',
  cargo: '',
  url_fotografia: '',
  orden_jerarquia: 1
})

// Modales abrir/cerrar
function openAddModal() {
  isEditing.value = false
  editingId.value = null
  form.nombre_completo = ''
  form.cargo = ''
  form.url_fotografia = ''
  
  // Siguiente jerarquía por defecto
  const maxHierarchy = boardMembers.value.length ? Math.max(...boardMembers.value.map(b => b.orden_jerarquia)) : 0
  form.orden_jerarquia = maxHierarchy + 1

  isModalOpen.value = true
}

function openEditModal(member: any) {
  isEditing.value = true
  editingId.value = member.id_miembro
  form.nombre_completo = member.nombre_completo
  form.cargo = member.cargo
  form.url_fotografia = member.url_fotografia
  form.orden_jerarquia = member.orden_jerarquia
  isModalOpen.value = true
}

// Eliminar
async function handleDelete(id: number) {
  if (confirm('¿Estás seguro de que deseas eliminar este miembro de la junta directiva?')) {
    await deleteBoardMember(id)
  }
}

// Guardar
async function submitForm() {
  if (!form.nombre_completo || !form.cargo || form.orden_jerarquia < 1) {
    addToast('Por favor completa todos los campos requeridos.', 'error')
    return
  }

  try {
    if (isEditing.value && editingId.value) {
      await editBoardMember(editingId.value, {
        cargo: form.cargo,
        url_fotografia: form.url_fotografia,
        orden_jerarquia: form.orden_jerarquia
      })
    } else {
      await addBoardMember({
        nombre_completo: form.nombre_completo,
        cargo: form.cargo,
        url_fotografia: form.url_fotografia,
        orden_jerarquia: form.orden_jerarquia
      })
    }
    isModalOpen.value = false
  } catch (err) {
    console.error(err)
  }
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

/* Transición suave para el modal */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>