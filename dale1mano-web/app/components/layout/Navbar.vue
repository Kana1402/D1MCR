<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const emit = defineEmits<{
  (e: 'openLogin'): void
}>()

const route = useRoute()
const router = useRouter()
const searchText = ref((route.query.search as string) || '')
const searchTimeout = ref<number | null>(null)

watch(
  () => route.query.search,
  (newValue) => {
    searchText.value = typeof newValue === 'string' ? newValue : ''
  }
)

watch(searchText, (value) => {
  if (searchTimeout.value) {
    window.clearTimeout(searchTimeout.value)
  }
  searchTimeout.value = window.setTimeout(() => {
    const query = value.trim()
    const queryParams = query ? { search: query } : {}
    router.replace({ path: '/', query: queryParams })
  }, 250)
})

function onClickAdmin() {
  emit('openLogin')
}
</script>

<template>
  <nav class="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-20 items-center">
        
        <div class="flex-shrink-0 flex items-center">
          <NuxtLink to="/" class="group flex items-center space-x-2 focus:outline-none">
            <span class="text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-[#0b31a8] transition-colors duration-300">
              Dale1Mano<span class="text-[#e0531c]">CR</span>
            </span>
          </NuxtLink>
        </div>

        <div class="hidden md:flex space-x-1 items-center">
          
          <NuxtLink 
            to="/" 
            class="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-[#e0531c] hover:bg-slate-50 transition-all duration-200 relative group"
            active-class="text-[#e0531c] bg-orange-50/60"
          >
            Inicio
            <span class="absolute bottom-1 left-4 right-4 h-0.5 bg-[#e0531c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center hidden" active-class="block"></span>
          </NuxtLink>

          <NuxtLink 
            to="/nosotros" 
            class="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-[#e0531c] hover:bg-slate-50 transition-all duration-200"
            active-class="text-[#e0531c] bg-orange-50/60"
          >
            Nosotros
          </NuxtLink>

          <NuxtLink 
            to="/programas" 
            class="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-[#e0531c] hover:bg-slate-50 transition-all duration-200"
            active-class="text-[#e0531c] bg-orange-50/60"
          >
            Programas
          </NuxtLink>

          <NuxtLink 
            to="/proyectos" 
            class="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-[#e0531c] hover:bg-slate-50 transition-all duration-200"
            active-class="text-[#e0531c] bg-orange-50/60"
          >
            Proyectos
          </NuxtLink>

          <NuxtLink 
            to="/unete" 
            class="ml-4 inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#e0531c] to-[#f06732] hover:from-[#f06732] hover:to-[#e0531c] shadow-md shadow-orange-500/10 hover:shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Únete
          </NuxtLink>
				
       		 <button 
					  class="ml-4 inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#0b31a8] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#0b31a8] shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200" 
					  @click="onClickAdmin">
          	<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          Admin
        </button>

        </div>
        
      </div>
    </div>
  </nav>
</template>