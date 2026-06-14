<template>
  <section class="relative w-full min-h-[85vh] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
    <div class="absolute inset-0 z-0 overflow-hidden">
      <img 
        src="/images/heros/BannerHero.png" 
        alt="Voluntariado D1MCR" 
        class="w-full h-full object-cover opacity-75 scale-85 transition-transform duration-1000"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
    </div>

    <div class="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center space-y-6">
 

      <h1 class="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white max-w-4xl">
        BIENVENIDOS A <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-200 to-orange-400">D1MCR</span>
      </h1>

      <p class="text-base sm:text-lg md:text-xl text-slate-300 font-medium max-w-2xl leading-relaxed">
        La <span class="text-white font-semibold">Asociación Dale Una Mano a Costa Rica</span> forma jóvenes como agentes de cambio por medio del voluntariado para potencializar sus habilidades y transformar sus comunidades.
      </p>

      <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
        <NuxtLink 
          to="/nosotros" 
          class="w-full sm:w-auto text-center px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#e0531c] to-[#f06732] hover:from-[#f06732] hover:to-[#e0531c] shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          Conocer más
        </NuxtLink>
        
        <NuxtLink 
          to="/unete" 
          class="w-full sm:w-auto text-center px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          Involucrarme
        </NuxtLink>
      </div>

    </div>

    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce text-slate-400 hidden sm:block">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>
</template>