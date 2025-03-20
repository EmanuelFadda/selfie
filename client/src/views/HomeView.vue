<template>
  <div class="flex-flow-col flex min-h-screen">
    <Navbar viewName="Selfie" name="Nome" surname="Cognome" :settingsArray="settingsArray"></Navbar>

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
  data() {
    return {
      settingsArray: [
        { label: "Layout", route: "/modifylayout  ", icon: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" },
        { label: "Riconoscimenti", route: "/credits", icon: "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" },
        { label: "Logout", route: "/", icon: "M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" },
      ],
    };
  },
};
</script>
