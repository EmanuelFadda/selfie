<template>
  <div class="min-h-screen flex bg-gradient-to-b from-slate-50 to-slate-100 dark:from-neutral-900 dark:to-neutral-800 text-neutral-900 dark:text-stone-200" style="flex-flow: column;">
    <nav class="flex p-4 pt-5 pb-5 mb-6 bg-slate-100 dark:bg-[#0f0f0f] text-3xl font-bold">
      Selfie
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="self-center absolute right-4 size-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    </nav>

    <div class="flex flex-auto rounded-3xl bg-sky-400 dark:bg-sky-500 ml-5 mr-5 mb-4 pl-[14px] pt-[10px] font-semibold text-xl" style="flex-flow: column;">
      <h1 class="mb-1">Calendario</h1>
      <div class="flex-1 bg-neutral-800 -ml-[14px] pl-3 pt-[6px] pr-3 border-sky-500 border-4 rounded-b-3xl rounded-t-md font-medium text-base">
        Qui possiamo mettere eventi, bla bla bla bla bla<br>
        - prova<br>
        - prova

      </div>
    </div>
    
    <div class="grid grid-cols-2 grid-rows-1 gap-4">
      <div class="flex ml-5 mb-7 rounded-3xl aspect-square bg-amber-300 dark:bg-amber-400 pl-3 pt-[7px] font-semibold" style="flex-flow: column;">
        <h1 class="mb-[3px]">Note</h1>
        <div class="flex-1 bg-neutral-800 -ml-3 pl-3 pt-[3px] pr-3 border-amber-400 border-[3px] rounded-b-3xl rounded-t-md font-medium text-base">
        Qui possiamo mettere eventi, bla bla bla bla bla<br>
        - prova<br>
        - prova

      </div>
      </div>
      <div class="flex mr-5 mb-7 rounded-3xl aspect-square bg-red-400 dark:bg-red-500 pl-3 pt-[7px] font-semibold" style="flex-flow: column;">
        <h1 class="mb-[3px]">Pomodoro</h1>
        <div class="flex-1 bg-neutral-800 -ml-3 pl-3 pt-[3px] pr-3 border-red-500 border-[3px] rounded-b-3xl rounded-t-md font-medium text-base">
        Qui possiamo mettere eventi, bla bla bla bla bla<br>
        - prova<br>
        - prova

      </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {

  }
}
</script>
