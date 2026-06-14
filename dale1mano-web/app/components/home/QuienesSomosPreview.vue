<template>
  <section class="py-16 bg-slate-50 text-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-3xl overflow-hidden shadow-xl bg-white border border-slate-150">
        <div class="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center text-center lg:text-left space-y-6">
          <span class="text-sm font-bold tracking-widest text-emerald-600 uppercase">
            ¿Quiénes Somos?
          </span>
          <h2 class="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Hola, Dale Una Mano a Costa Rica te saluda
          </h2>
          <p class="text-lg text-slate-600 leading-relaxed">
            Somos una ONG constituida legalmente como asociación sin fines de lucro en Matina, Limón.
          </p>
          <p class="text-base text-slate-500 leading-relaxed">
            Somos jóvenes líderes, voluntarios, y agentes de cambio que buscamos ser una organización líder en desarrollo juvenil y acción que impacte y transforme a CR por medio del servicio solidario.
          </p>
          <div class="pt-4 flex justify-center lg:justify-start">
            <span class="inline-block text-emerald-600 font-bold border-b-2 border-emerald-500 pb-1">
              #JuntosHacemosMas
            </span>
          </div>
        </div>

        <div class="lg:col-span-5 bg-orange-600 text-white p-8 sm:p-12 flex flex-col justify-center items-center text-center space-y-6">
          <h3 class="text-3xl font-black uppercase tracking-tight">
            ¡Forma parte de nosotros!
          </h3>
          <p class="text-orange-100 max-w-xs">
            Sumate al voluntariado y ayúdanos a potenciar habilidades en nuestras comunidades.
          </p>
          <NuxtLink to="/unete" class="inline-flex items-center justify-center px-6 py-3 bg-white text-orange-600 font-bold rounded-xl shadow-md hover:bg-orange-50 hover:scale-105 transition-all duration-300">
            Más Detalles 
            <svg class="w-5 h-5 ml-2 stroke-current fill-none" viewBox="0 0 24 24" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </NuxtLink>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-5 space-y-4 text-center lg:text-left">
          <span class="text-sm font-bold tracking-widest text-emerald-600 uppercase">
            Propósito
          </span>
          <h2 class="text-3xl font-extrabold text-slate-900">
            Nuestra Misión
          </h2>
          <p class="text-lg text-slate-600 leading-relaxed">
            Nuestra misión es formar a las juventudes como agentes de cambio por medio del voluntariado para transformar sus comunidades.
          </p>
        </div>

        <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="rounded-2xl overflow-hidden shadow-md h-64 bg-slate-200">
            <img src="/images/galeria/Galeria1.jpg" alt="Mesa de trabajo" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
          <div class="rounded-2xl overflow-hidden shadow-md h-64 bg-slate-200">
            <img src="/images/galeria/Galeria2.jpg" alt="Grupo de jóvenes" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>