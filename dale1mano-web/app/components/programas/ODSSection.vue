<!-- app/components/programas/ODSSection.vue -->
<template>
  <section class="py-20 bg-white text-slate-800">
    <div class="max-w-7xl mx-auto px-6 md:px-12 text-center">

      <!-- Título -->
      <div class="max-w-3xl mx-auto mb-12 space-y-2">
        <h2 class="text-3xl font-black text-[#072277] sm:text-4xl tracking-tight uppercase">
          Objetivos de Desarrollo Sostenible
        </h2>
        <div class="w-16 h-1 bg-orange-500 mx-auto rounded-full"></div>
      </div>

      <!-- Cuadrícula ODS -->
      <div class="grid grid-cols-1 sm:grid-cols-5 gap-3 max-w-6xl mx-auto">
        <div
          v-for="ods in listaODS"
          :key="ods.numero"
          :style="{ backgroundColor: ods.color }"
          class="h-40 rounded-xl p-4 text-white flex flex-col items-center justify-center gap-3 shadow-sm hover:scale-105 transition-all duration-300"
        >
          <!-- Número -->
          <span class="text-3xl font-black leading-none">
            {{ ods.numero }}
          </span>

          <!-- Icono -->
          <img
            v-if="ods.imagen"
            :src="ods.imagen"
            :alt="ods.titulo"
            class="w-12 h-12 object-contain brightness-0 invert"
          />

          <!-- Título -->
          <h3 class="text-[11px] font-black uppercase text-center leading-tight">
            {{ ods.titulo }}
          </h3>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
const listaODS = [
  {
    numero: 1,
    imagen: 'https://img.icons8.com/?size=100&id=zq7OkVHocxK5&format=png&color=000000',
    titulo: 'Fin de la pobreza',
    color: '#e5243b'
  },
  {
    numero: 2,
    imagen: 'https://img.icons8.com/?size=100&id=t3z86GnXSIyW&format=png&color=000000',
    titulo: 'Hambre cero',
    color: '#dda63a'
  },
  {
    numero: 3,
    imagen: 'https://img.icons8.com/?size=100&id=gINNTdIsWR8p&format=png&color=000000',
    titulo: 'Salud y bienestar',
    color: '#4c9f38'
  },
  {
    numero: 4,
    imagen: 'https://img.icons8.com/?size=100&id=60436&format=png&color=000000',
    titulo: 'Educación de calidad',
    color: '#c5192d'
  },
  {
    numero: 5,
    imagen: 'https://img.icons8.com/?size=100&id=eSZL-X9QKWmd&format=png&color=000000',
    titulo: 'Igualdad de género',
    color: '#ff3a21'
  },
  {
    numero: 6,
    imagen: 'https://img.icons8.com/?size=100&id=sY5UYYL1YSWL&format=png&color=000000',
    titulo: 'Agua limpia y saneamiento',
    color: '#26bde2'
  },
  {
    numero: 7,
    imagen: 'https://img.icons8.com/?size=100&id=CptiRCfMDDkw&format=png&color=000000',
    titulo: 'Energía asequible y no contaminante',
    color: '#fcc30b'
  },
  {
    numero: 8,
    imagen: 'https://img.icons8.com/?size=100&id=7164&format=png&color=000000',
    titulo: 'Trabajo decente y crecimiento económico',
    color: '#a21942'
  },
  {
    numero: 9,
    imagen: 'https://img.icons8.com/?size=100&id=dZSbGCCEdbY4&format=png&color=000000',
    titulo: 'Industria, innovación e infraestructura',
    color: '#e5243b'
  },
  {
    numero: 10,
    imagen: 'https://img.icons8.com/?size=100&id=10993&format=png&color=000000',
    titulo: 'Reducción de las desigualdades',
    color: '#dda63a'
  },
  {
    numero: 11,
    imagen: 'https://img.icons8.com/?size=100&id=5UjqOo3CqVsq&format=png&color=000000',
    titulo: 'Ciudades y comunidades sostenibles',
    color: '#4c9f38'
  },
  {
    numero: 12,
    imagen: 'https://img.icons8.com/?size=100&id=L1F8Hl9HpeDM&format=png&color=000000',
    titulo: 'Producción y consumo responsables',
    color: '#c5192d'
  },
  {
    numero: 13,
    imagen: 'https://img.icons8.com/?size=100&id=MPS5K7ososFb&format=png&color=000000',
    titulo: 'Acción por el clima',
    color: '#ff3a21'
  },
  {
    numero: 14,
    imagen: 'https://img.icons8.com/?size=100&id=tbN5oI8IwxeY&format=png&color=000000',
    titulo: 'Vida submarina',
    color: '#26bde2'
  },
  {
    numero: 15,
    imagen: 'https://img.icons8.com/?size=100&id=106514&format=png&color=000000',
    titulo: 'Vida de ecosistemas terrestres',
    color: '#fcc30b'
  },
  {
    numero: 16,
    imagen: 'https://img.icons8.com/?size=100&id=47440&format=png&color=000000',
    titulo: 'Paz, justicia e instituciones sólidas',
    color: '#a21942'
  },
  {
    numero: 17,
    imagen: 'https://img.icons8.com/?size=100&id=61850&format=png&color=000000',
    titulo: 'Colaboración para lograr los objetivos',
    color: '#a21942'
  }
]
</script>