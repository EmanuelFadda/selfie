<template>
  <div class="flex min-h-screen flex-col">
    <Navbar viewTitle="Calendario" :titleColor="classColor" :backButton="true" name="Nome" surname="Cognome" :settingsArray="settingsArray"></Navbar>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"

export default {
  name: "CalendarView",
  components: {
    Navbar,
  },
  setup() {
    const classColor = "text-sky-400 dark:text-sky-500"

    return { classColor }
  },
}
</script>
