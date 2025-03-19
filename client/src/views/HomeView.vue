<template>
  <div class="flex-flow-col flex min-h-screen">
    <Navbar viewName="Selfie" name="Nome" surname="Cognome"></Navbar>

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
import Navbar from "../components/Navbar.vue";

export default {
  name: "HomeView",
  components: {
    Navbar,
  },
};
</script>
