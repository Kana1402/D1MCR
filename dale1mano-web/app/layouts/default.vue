<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-800">
    <LayoutNavbar @openLogin="handleOpenLogin" />

    <main class="flex-grow">
      <slot />
    </main>

    <LayoutFooter />
		<LoginModal 
      :isOpen="isLoginModalOpen" 
      @close="isLoginModalOpen = false" 
      @loginSuccess="handleLoginSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Estado para controlar la apertura del modal
const isLoginModalOpen = ref(false)

// Función que se ejecuta cuando .NET confirma que las credenciales son correctas
function handleLoginSuccess(adminData: { adminId: number; nombre: string }) {
  isLoginModalOpen.value = false
  
  // Redirección nativa de Nuxt hacia tu sección privada de administración
  navigateTo('/admin') 
}

function handleOpenLogin() {
  console.log('Layout: openLogin event received. Opening modal...')
  isLoginModalOpen.value = true
}
</script>

