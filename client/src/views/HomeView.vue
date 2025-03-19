<template>
  <div class="flex-flow-col flex min-h-screen bg-slate-100 text-neutral-800 dark:bg-neutral-900 dark:text-stone-200">
    <!-- Navbar con logo, timemachine e impostazioni -->
    <nav class="mb-2 flex bg-slate-100 p-6 pb-5 text-3xl font-bold dark:bg-neutral-900">
      Selfie
      <svg @click="settings = true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="absolute right-5 size-8 self-center">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    </nav>

    <!-- Overlay sfocato e click per chiudere -->
    <div v-if="settings" @click="settings = false" class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"></div>

    <!-- Menu impostazioni scorrevole -->
    <div :class="settings ? 'translate-x-0' : 'translate-x-full'" class="fixed right-0 top-0 h-full w-[82%] bg-slate-100 shadow-lg transition-transform duration-300 dark:bg-neutral-800">
      <!-- Area per chiudere il menu -->
      <div @click="settings = false" class="absolute left-0 h-full w-[6%] cursor-pointer bg-transparent"></div>

      <!-- Contenuto del menu -->
      <div class="mt-6 flex items-center space-x-2 pl-2">
        <img src="" alt="Immagine profilo" class="h-14 w-14 rounded-full border-2 border-slate-200 dark:border-neutral-600" />
        <div class="flex-none">
          <h2 class="text-xl font-semibold text-neutral-900 dark:text-slate-50">Nome Cognome</h2>
          <h5 class="text-sm text-neutral-600 dark:text-neutral-400">Visualizza profilo</h5>
        </div>
      </div>

      <!-- Elenco opzioni (disposizione, riconoscimenti, logout) -->
      <div class="mt-3 pl-1">
        <div class="flex items-center border-b border-slate-300 py-3 pl-4 text-lg dark:border-neutral-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-3 size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
          </svg>
          Disposizione
        </div>
        <div class="flex items-center border-b border-slate-300 py-3 pl-4 text-lg dark:border-neutral-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-3 size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
          Riconoscimenti
        </div>
        <div class="flex items-center py-3 pl-4 text-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-3 size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
          </svg>
          Logout
        </div>
      </div>
    </div>

    <!-- Anteprima oggetti del calendario (default grande) -->
    <RouterLink to="/calendar" class="flex-flow-col mb-4 ml-5 mr-5 flex flex-auto rounded-3xl bg-sky-400 pl-[14px] pt-[10px] text-xl font-semibold dark:bg-sky-500">
      <h1 class="mb-1">Calendario</h1>

      <!-- Contenitore oggetti calendario -->
      <div class="-ml-[14px] flex-1 rounded-b-3xl rounded-t-md border-[3px] border-sky-400 bg-slate-50 pl-3 pr-3 pt-[6px] text-base font-medium dark:border-sky-500 dark:bg-neutral-800">
        Qui possiamo mettere eventi e attività, bla bla bla bla bla
        <br />
        - prova
        <br />
        - prova
      </div>
    </RouterLink>

    <!-- Anteprima oggetti delle note e pomodoro (default piccole) -->
    <div class="grid grid-cols-2 grid-rows-1 gap-4">
      <RouterLink to="/" class="flex-flow-col mb-7 ml-5 flex aspect-square rounded-3xl bg-amber-300 pl-[14px] pt-[7px] font-semibold dark:bg-amber-400">
        <h1 class="mb-[3px]">Note</h1>

        <!-- Contenitore oggetti note -->
        <div class="-ml-[14px] flex-1 rounded-b-3xl rounded-t-md border-[3px] border-amber-300 bg-slate-50 pl-3 pr-3 pt-[3px] text-base font-medium dark:border-amber-400 dark:bg-neutral-800">
          Questo dovrebbe essere il div per le note
          <br />
          - prova
          <br />
          - prova
        </div>
      </RouterLink>
      <RouterLink to="/" class="flex-flow-col mb-7 mr-5 flex aspect-square rounded-3xl bg-red-400 pl-[14px] pt-[7px] font-semibold dark:bg-red-500">
        <h1 class="mb-[3px]">Pomodoro</h1>

        <!-- Contenitore oggetti pomodoro -->
        <div class="-ml-[14px] flex-1 rounded-b-3xl rounded-t-md border-[3px] border-red-400 bg-slate-50 pl-3 pr-3 pt-[3px] text-base font-medium dark:border-red-500 dark:bg-neutral-800">
          Invece qui ci mettiamo il pomodooro
          <br />
          - ciaone
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      settings: false,
    };
  },
};
</script>
