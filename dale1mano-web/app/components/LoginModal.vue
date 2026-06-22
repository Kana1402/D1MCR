<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'loginSuccess', adminData: { adminId: number; nombre: string }): void
}>()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const config = useRuntimeConfig()
const sessionCookieOptions = {
  maxAge: 60 * 60 * 24,
  sameSite: 'lax' as const,
  secure: !import.meta.dev,
  path: '/'
}

const tokenCookie = useCookie('auth_token', sessionCookieOptions)
const adminIdCookie = useCookie('admin_id', sessionCookieOptions)
const adminNameCookie = useCookie('admin_name', sessionCookieOptions)

async function handleLogin() {
  if (!email.value || !password.value) {
    errorMessage.value = 'Por favor, completa todos los campos.'
    return
  }

  try {
    isLoading.value = true
    errorMessage.value = ''
    successMessage.value = ''

    let data: any

    if (email.value === 'admin@dale1mano.org' && password.value === 'admin123') {
      // Credenciales de prueba locales para desarrollo (Bypass sin API)
      data = {
        token: 'mock_token_123',
        adminId: 1,
        nombre: 'Administrador Demo'
      }
    } else {
      // Conexión real con la API
      const url = `${config.public.apiBase}/api/auth/login` 
      data = await $fetch<any>(url, {
        method: 'POST',
        body: {
          email: email.value,
          password: password.value
        }
      })
    }

    successMessage.value = `¡Bienvenido/a, ${data.nombre}!`
    
    tokenCookie.value = data.token
    adminIdCookie.value = data.adminId.toString()
    adminNameCookie.value = data.nombre

    setTimeout(() => {
      emit('loginSuccess', { adminId: data.adminId, nombre: data.nombre })
      resetForm()
    }, 1200)

  } catch (error: any) {
    errorMessage.value = error.data?.message || 'Correo o contraseña incorrectos o servidor caído.'
    console.error('Error en Login:', error)
  } finally {
    isLoading.value = false
  }
}

function resetForm() {
  email.value = ''
  password.value = ''
  errorMessage.value = ''
  successMessage.value = ''
  emit('close')
}
</script>

<template>
  <Transition name="fade">
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
      @click.self="resetForm"
    >
      <div class="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all duration-300 p-8 space-y-6">
        
        <button 
          @click="resetForm" 
          :disabled="isLoading"
          class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 disabled:opacity-50 text-2xl font-semibold leading-none p-1 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none"
        >
          &times;
        </button>

        <div class="text-center space-y-1">
          <h1 class="text-2xl font-black tracking-tight text-slate-900">
            Iniciar Sesión
          </h1>
          <p class="text-sm font-medium text-slate-500">
            Panel de Administración
          </p>
        </div>

        <div class="space-y-3">
          <Transition name="slide">
            <div 
              v-if="errorMessage" 
              class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs font-bold flex items-center space-x-2"
            >
              <span>⚠️</span>
              <span class="flex-1 leading-normal">{{ errorMessage }}</span>
            </div>
          </Transition>

          <Transition name="slide">
            <div 
              v-if="successMessage" 
              class="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-xs font-bold flex items-center space-x-2"
            >
              <span>✅</span>
              <span class="flex-1 leading-normal">{{ successMessage }}</span>
            </div>
          </Transition>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div class="space-y-1">
            <label for="email" class="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Correo Electrónico
            </label>
            <input 
              id="email" 
              v-model="email" 
              type="email" 
              placeholder="admin@correo.com" 
              required 
              :disabled="isLoading" 
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#072277] focus:bg-white disabled:opacity-50 disabled:bg-slate-100 transition-all font-medium"
            />
          </div>

          <div class="space-y-1">
            <label for="password" class="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Contraseña
            </label>
            <input 
              id="password" 
              v-model="password" 
              type="password" 
              placeholder="••••••••" 
              required 
              :disabled="isLoading" 
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#072277] focus:bg-white disabled:opacity-50 disabled:bg-slate-100 transition-all font-medium"
            />
          </div>

          <div class="pt-2">
            <button 
              type="submit" 
              :disabled="isLoading"
              class="w-full bg-[#072277] hover:bg-[#051855] text-white font-bold py-3 px-4 rounded-xl text-sm tracking-wide shadow-md shadow-blue-900/10 hover:shadow-lg disabled:opacity-60 disabled:hover:bg-[#072277] transition-all flex items-center justify-center space-x-2"
            >
              <span v-if="isLoading" class="flex items-center space-x-2">
                <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Verificando...</span>
              </span>
              <span v-else>Ingresar al Sistema</span>
            </button>
						<NuxtLink
  						to="/unete"
  						@click="resetForm"
  						class="w-full mt-2 bg-gradient-to-r from-[#e0531c] to-[#f06732] hover:from-[#f06732] hover:to-[#e0531c] text-white font-bold py-3 px-4 rounded-xl text-sm tracking-wide shadow-md shadow-orange-500/10 hover:shadow-lg transition-all flex items-center justify-center space-x-2"
						>
  						<span>Registrarse</span>
						</NuxtLink>
          </div>
        </form>

      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Transiciones suaves para Vue */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.2s ease-out;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>