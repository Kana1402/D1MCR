<template>
  <section class="py-20 bg-slate-50 text-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <h2 class="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight uppercase">
          Testimonios
        </h2>
        <div class="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div 
          v-for="(video, index) in videos" 
          :key="index" 
          class="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/60 hover:shadow-md transition-all duration-300"
        >
          <div class="w-full md:w-[50%] aspect-video md:aspect-auto md:min-h-[220px] bg-black relative flex items-center justify-center group overflow-hidden">
            
            <template v-if="videoActivo !== index">
              <img 
                :src="`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`" 
                :alt="video.titulo"
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                @error="manejarErrorMiniatura"
              />
              <div class="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors duration-300"></div>
              
              <button 
                @click="videoActivo = index"
                class="absolute z-10 flex items-center justify-center w-14 h-14 bg-opacity-100 text-white rounded-full shadow-lg transform group-hover:scale-110 transition-all duration-300"
                aria-label="Reproducir video"
              >
               
              </button>
            </template>

            <iframe 
              v-else
              class="absolute top-0 left-0 w-full h-full" 
              :src="`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`" 
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen
            ></iframe>
          </div>

          <div class="w-full md:w-[50%] p-6 flex flex-col justify-between space-y-4">
            <div class="space-y-2">
              <h3 class="text-lg font-bold text-slate-900 leading-snug line-clamp-2">
                {{ video.titulo }}
              </h3>
              <div class="w-8 h-0.5 bg-orange-400 rounded-full"></div>
            </div>

            <div class="flex-grow flex flex-col justify-start">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Descripción
              </span>
              <p class="text-sm text-slate-600 leading-relaxed line-clamp-4">
                {{ video.descripcion }}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAdminData } from '~/composables/useAdminData'

const { testimonials, projects } = useAdminData()

// Estado para controlar qué video se está reproduciendo
const videoActivo = ref(null)

// Cargar testimonios dinámicamente desde el composable (solo aprobados por el administrador)
const videos = computed(() => {
  return testimonials.value
    .filter(t => t.aprobado && t.url_video)
    .map(t => {
      // Intentar extraer el ID de YouTube del url_video
      let youtubeId = 'Q9GUIcrlG4c'
      const match = t.url_video.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
      if (match) {
        youtubeId = match[1]
      }

      // Obtener nombre del proyecto asociado
      const proj = projects.value.find(p => p.id_proyecto === t.id_proyecto)
      const projTitle = proj ? proj.titulo : 'Proyecto Dale1Mano'

      return {
        titulo: `${projTitle} - Testimonio`,
        youtubeId: youtubeId,
        descripcion: t.contenido
      }
    })
})

// Función de respaldo por si algún video viejo no soporta miniatura HD (1280x720)
const manejarErrorMiniatura = (event) => {
  const img = event.target
  if (img.src.includes('maxresdefault.jpg')) {
    // Si falla la máxima resolución, cae a la resolución estándar (hqdefault) que siempre existe
    img.src = img.src.replace('maxresdefault.jpg', 'hqdefault.jpg')
  }
}
</script>