<template>
  <!-- Cambiado a fondo claro slate-50 y texto slate-800 para consistencia con la web pública -->
  <div class="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-[#0b31a8] selection:text-white">
    <div class="flex flex-1 relative overflow-hidden">

      <!-- SIDEBAR -->
      <!-- Ahora es de fondo blanco puro con un borde sutil, igual que la sección izquierda de la imagen -->
      <aside
        class="bg-white border-r border-slate-200 w-64 flex flex-col fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0"
        :class="[isSidebarOpen ? 'translate-x-0' : '-translate-x-full']"
      >
        <!-- Logo / Marca -->
        <div class="p-6 border-b border-slate-100 flex items-center space-x-3">
          <!-- Gradiente del logo adaptado a los colores corporativos exactos -->
          <div class="h-9 w-9 rounded-xl flex items-center justify-center font-black text-xs text-white shadow-md overflow-hidden"
               style="background: linear-gradient(135deg, #0b31a8 0%, #1e3a8a 100%);">
            D1M
          </div>
          <div>
            <!-- El texto "Dale1Mano" usa el azul oscuro y "CR" usa el naranja #e0531c de la imagen -->
            <span class="font-black text-[#0b31a8] tracking-wide block text-sm">Dale1Mano<span class="text-[#e0531c]">CR</span></span>
            <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Panel Admin</span>
          </div>
        </div>

        <!-- Menú de Navegación -->
        <nav class="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group font-semibold text-sm"
            :class="[
              route.path === item.path
                ? 'text-white shadow-md shadow-blue-700/10'
                : 'text-slate-500 hover:bg-slate-50 hover:text-[#0b31a8]'
            ]"
            :style="route.path === item.path ? 'background: linear-gradient(135deg, #0b31a8 0%, #1a365d 100%);' : ''"
            @click="closeSidebarOnMobile"
          >
            <div class="flex items-center space-x-3">
              <!-- El icono hereda el color del texto activo/inactivo de forma orgánica -->
              <span class="w-5 h-5 flex items-center justify-center transition-colors" v-html="item.icon"></span>
              <span>{{ item.label }}</span>
            </div>

            <!-- Badge de pendientes usando el naranja de la Landing de la imagen -->
            <span
              v-if="item.key === 'testimonios' && pendingTestimonialsCount > 0"
              class="px-2 py-0.5 text-[11px] font-bold bg-[#e0531c] text-white rounded-full"
            >
              {{ pendingTestimonialsCount }}
            </span>
          </NuxtLink>
        </nav>

        <!-- Footer del Sidebar -->
        <div class="p-4 border-t border-slate-100 space-y-1">
          <!-- Link al sitio público -->
          <NuxtLink
            to="/"
            class="flex items-center space-x-3 w-full px-4 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-[#0b31a8] rounded-xl transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            <span class="text-xs">Ver sitio público</span>
          </NuxtLink>
          <!-- Logout -->
          <button
            @click="handleLogout"
            class="flex items-center space-x-3 w-full px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            <span class="text-xs">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      <!-- BACKDROP MÓVILES -->
      <div
        v-if="isSidebarOpen"
        @click="isSidebarOpen = false"
        class="fixed inset-0 bg-slate-900/40 z-30 lg:hidden backdrop-blur-sm transition-opacity duration-300"
      ></div>

      <!-- CONTENIDO PRINCIPAL -->
      <div class="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <!-- TOPBAR -->
        <!-- Estilo frosted glass blanco transparente sobre fondo slate-50 -->
        <header class="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 px-6 py-4 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <!-- Toggle Sidebar (mobile) -->
            <button
              @click="isSidebarOpen = !isSidebarOpen"
              class="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 focus:outline-none lg:hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            <!-- Título de Página -->
            <div class="hidden sm:block">
              <!-- El título ahora usa el color azul oscuro de los encabezados de la Landing -->
              <h1 class="text-xl font-black text-slate-900 flex items-center space-x-2">
                <span>{{ currentPageTitle }}</span>
              </h1>
              <!-- Subtítulo usando el verde esmeralda característico de los tags en la imagen (#059669 aprox o verde corporativo) -->
              <p class="text-xs font-bold text-emerald-700 uppercase tracking-wider mt-0.5">
                Panel administrativo · <span class="font-extrabold text-[#0b31a8]">Dale1Mano CR</span>
              </p>
            </div>
          </div>

          <!-- Acciones de sesión -->
          <div class="flex items-center space-x-4">
            <!-- Fecha -->
            <span class="hidden md:inline-block text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 border border-slate-200">
              {{ formattedDate }}
            </span>

            <!-- Notificación testimonios pendientes (Estilo badge naranja corporativo ligero) -->
            <NuxtLink
              v-if="pendingTestimonialsCount > 0"
              to="/admin/testimonios"
              class="relative p-2 rounded-xl bg-[#e0531c]/10 border border-[#e0531c]/20 text-[#e0531c] hover:bg-[#e0531c]/20 transition-all"
              title="Testimonios pendientes de moderación"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              <span class="absolute -top-1 -right-1 w-4 h-4 bg-[#e0531c] text-white text-[9px] font-black rounded-full flex items-center justify-center">
                {{ pendingTestimonialsCount }}
              </span>
            </NuxtLink>

            <!-- Avatar de Admin -->
            <div class="flex items-center space-x-3 pl-4 border-l border-slate-200">
              <div class="h-8 w-8 rounded-full flex items-center justify-center text-white font-black text-sm shadow-sm"
                   style="background: linear-gradient(135deg, #0b31a8 0%, #1e3a8a 100%);">
                A
              </div>
              <div class="hidden sm:block text-left">
                <p class="text-xs font-black text-slate-800">Administrador</p>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ONG Oficial</p>
              </div>
            </div>
          </div>
        </header>

        <!-- MAIN AREA -->
        <!-- El contenedor del slot mantiene los paddings pero los elementos hijos heredarán el contexto limpio -->
        <main class="flex-1 p-6 max-w-7xl w-full mx-auto">
          <!-- Indicador de carga adaptado a colores limpios -->
          <transition name="fade">
            <div v-if="isLoading" class="fixed bottom-6 right-6 bg-white border border-slate-200 text-slate-800 px-4 py-3 rounded-xl flex items-center space-x-3 shadow-xl z-50">
              <svg class="animate-spin h-5 w-5 text-[#0b31a8]" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span class="text-xs font-bold tracking-wide uppercase text-slate-600">Guardando cambios...</span>
            </div>
          </transition>

          <slot />
        </main>
      </div>
    </div>

    <!-- TOAST NOTIFICATIONS (Adaptados a temas claros pero manteniendo la alerta de color) -->
    <div class="fixed top-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full">
      <transition-group name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="p-4 rounded-xl border flex items-start space-x-3 shadow-lg bg-white transition-all duration-300"
          :class="[
            toast.type === 'success' ? 'border-emerald-200 text-slate-700' :
            toast.type === 'error'   ? 'border-rose-200 text-slate-700' :
            toast.type === 'warning' ? 'border-amber-200 text-slate-700' :
            'border-blue-200 text-slate-700'
          ]"
        >
          <div class="flex-shrink-0 mt-0.5">
            <svg v-if="toast.type === 'success'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-emerald-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else-if="toast.type === 'error'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-rose-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else-if="toast.type === 'warning'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-amber-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-blue-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.028M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="flex-1 text-xs font-bold leading-relaxed">{{ toast.message }}</div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
// Tu bloque de lógica se mantiene exactamente igual y funcional...
import { ref, computed } from 'vue'
import { useRoute } from '#app' // Asegurado para Nuxt 3 genérico si usas navigateTo o macros
import { useAdminData } from '../composables/useAdminData'

const route = useRoute()
const { toasts, isLoading, testimonials } = useAdminData()

const isSidebarOpen = ref(false)

function closeSidebarOnMobile() {
  isSidebarOpen.value = false
}

const pendingTestimonialsCount = computed(() => {
  return testimonials.value.filter(t => !t.aprobado).length
})

const formattedDate = computed(() => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
  return new Date().toLocaleDateString('es-ES', options)
})

const currentPageTitle = computed(() => {
  const path = route.path
  if (path === '/admin') return 'Panel General'
  if (path === '/admin/proyectos') return 'Gestión de Proyectos'
  if (path === '/admin/tematicas') return 'Gestión de Temáticas'
  if (path === '/admin/usuarios') return 'Gestión de Voluntarios'
  if (path === '/admin/asistencias') return 'Pase de Asistencias'
  if (path === '/admin/junta-directiva') return 'Junta Directiva'
  if (path === '/admin/testimonios') return 'Moderación de Testimonios'
  return 'Administración'
})

const navItems = [
  {
    key: 'dashboard',
    label: 'Inicio',
    path: '/admin',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>`
  },
  {
    key: 'proyectos',
    label: 'Proyectos',
    path: '/admin/proyectos',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>`
  },
  {
    key: 'usuarios',
    label: 'Voluntarios',
    path: '/admin/usuarios',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>`
  },
  {
    key: 'asistencias',
    label: 'Asistencias',
    path: '/admin/asistencias',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
  },
  {
    key: 'junta',
    label: 'Junta Directiva',
    path: '/admin/junta-directiva',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.97 5.97 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>`
  },
  {
    key: 'testimonios',
    label: 'Testimonios',
    path: '/admin/testimonios',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>`
  }
]

function handleLogout() {
  navigateTo('/')
}
</script>

<style>
/* Estilos de transición intactos */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.9);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>