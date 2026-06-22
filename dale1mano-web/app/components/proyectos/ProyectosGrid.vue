<template>
  <section class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-6 md:px-12 space-y-10">
      
      <FiltroProyectos 
        :filtroActual="filtro" 
        @cambiarFiltro="filtro = $event" 
      />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <ProyectoCard 
          v-for="proj in proyectosFiltrados" 
          :key="proj.id" 
          :proyecto="proj"
          :activo="filtro === 'activos'"
          @abrirInscripcion="abrirModal"
        />
      </div>

      <div v-if="proyectosFiltrados.length === 0" class="text-center py-12 text-slate-400 text-sm">
        No hay proyectos registrados en esta sección en este momento.
      </div>

      <Transition name="fade">
        <div v-if="modalAbierto" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 transform transition-all">
            
            <div class="bg-slate-700 px-6 py-4 flex justify-between items-center text-white">
              <h3 class="font-bold text-base tracking-wide">Formulario de inscripción</h3>
              <button @click="cerrarModal" class="text-slate-300 hover:text-white text-xl font-bold transition-colors">&times;</button>
            </div>

            <form @submit.prevent="enviarFormulario" class="p-6 space-y-4 text-slate-700">
              <div>
                <label class="block text-xs font-bold text-slate-500 mb-1">Nombre Completo</label>
                <input v-model="form.nombre" type="text" placeholder="Ingrese su nombre" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" required />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-slate-500 mb-1">Cédula</label>
                  <input v-model="form.cedula" type="text" placeholder="Ingrese su número de cédula" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" required />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-500 mb-1">Número telefónico</label>
                  <input v-model="form.telefono" type="tel" placeholder="Ingrese un número telefónico" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" required />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-500 mb-1">Fecha Nacimiento</label>
                <input v-model="form.fechaNacimiento" type="date" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" required />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-slate-500 mb-1">Género</label>
                  <select v-model="form.genero" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500">
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-500 mb-1">Cantidad de miembros a asistir</label>
                  <input v-model.number="form.cantidad" type="number" min="1" placeholder="Ingrese la cantidad de miembros" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" required />
                </div>
              </div>

              <div class="pt-4 flex justify-end space-x-2 border-t border-slate-100">
                <button type="button" @click="cerrarModal" class="px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors">
                  Cancelar
                </button>
                <button type="submit" class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition-colors">
                  🚀 Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>

    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useAdminData } from '~/composables/useAdminData'
import FiltroProyectos from './FiltroProyectos.vue'
import ProyectoCard from './ProyectoCard.vue'

const { projects, thematics, users, enrollUserInProject } = useAdminData()

const config = useRuntimeConfig()
const filtro = ref('activos')
const modalAbierto = ref(false)
const proyectoSeleccionado = ref(null)
const isLoading = ref(false)

const form = ref({
  nombre: '',
  cedula: '',
  telefono: '',
  fechaNacimiento: '',
  genero: 'Masculino',
  cantidad: 1
})

const proyectosFiltrados = ref([])

async function cargarProyectos() {
  try {
    isLoading.value = true
    const estadoAPI = filtro.value === 'activos' ? 'ACTIVO' : 'PASADO'
    
    let data
    try {
      // Intentar conectar con la API real
      const url = `${config.public.apiBase}/api/proyectos?estado=${estadoAPI}`
      data = await $fetch(url)
    } catch (e) {
      console.warn('API de proyectos no disponible, cargando mock local del panel de administración.')
      // Fallback local: filtrar los proyectos del estado de administración
      data = projects.value
        .filter(p => p.estado === estadoAPI)
        .map(p => {
          const tem = thematics.value.find(t => t.id_tematica === p.id_tematica)
          return {
            id_proyecto: p.id_proyecto,
            titulo: p.titulo,
            descripcion: p.descripcion,
            fecha_inicio: p.fecha_inicio,
            fecha_fin: p.fecha_fin,
            tematica: tem ? tem.nombre : 'General'
          }
        })
    }
    
    // Mapear los datos al formato esperado por ProyectoCard.vue
    proyectosFiltrados.value = data.map(proj => {
      const dateObjStart = new Date(proj.fecha_inicio)
      const dateObjEnd = new Date(proj.fecha_fin)
      
      const fechaStr = dateObjStart.toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      })
      
      const horaStr = `de ${dateObjStart.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })} a ${dateObjEnd.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })}`

      return {
        id: proj.id_proyecto,
        tipo: filtro.value,
        titulo: proj.titulo,
        fecha: fechaStr,
        hora: horaStr,
        lugar: `Eje: ${proj.tematica || 'General'}`,
        descripcion: proj.descripcion
      }
    })
  } catch (error) {
    console.error('Error al cargar proyectos:', error)
    proyectosFiltrados.value = []
  } finally {
    isLoading.value = false
  }
}

watch([filtro, projects], () => {
  cargarProyectos()
}, { deep: true })

onMounted(() => {
  cargarProyectos()
})

const abrirModal = (proyecto) => {
  proyectoSeleccionado.value = proyecto
  modalAbierto.value = true
}

const cerrarModal = () => {
  modalAbierto.value = false
  proyectoSeleccionado.value = null
  form.value = { nombre: '', cedula: '', telefono: '', fechaNacimiento: '', genero: 'Masculino', cantidad: 1 }
}

const enviarFormulario = async () => {
  try {
    // 1. Verificar si el usuario ya existe en nuestro estado reactivo, sino crearlo
    let user = users.value.find(u => u.nombre_completo.toLowerCase() === form.value.nombre.trim().toLowerCase())
    
    if (!user) {
      const newId = users.value.length ? Math.max(...users.value.map(u => u.id_usuario)) + 1 : 1
      const normalizedEmailName = form.value.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '')
      user = {
        id_usuario: newId,
        nombre_completo: form.value.nombre.trim(),
        correo: `${normalizedEmailName}@gmail.com`,
        rol: 'USER',
        es_miembro_oficial: false,
        fecha_registro: new Date().toISOString(),
        estado: 'ACTIVO'
      }
      users.value.push(user)
      if (typeof window !== 'undefined') {
        localStorage.setItem('d1m_users', JSON.stringify(users.value))
      }
    }

    // 2. Inscribir al voluntario en la actividad dentro de la base de datos simulada
    if (proyectoSeleccionado.value) {
      await enrollUserInProject(user.id_usuario, proyectoSeleccionado.value.id)
    }

    alert(`¡Inscripción exitosa para ${form.value.nombre}! Te esperamos en el proyecto.`)
    cerrarModal()
  } catch (error) {
    console.error(error)
    alert('Ocurrió un error en la inscripción rápida.')
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>