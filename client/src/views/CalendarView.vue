<template>
  <div class="min-h-screen">
    <Navbar viewName="Calendario" name="Nome" surname="Cognome"></Navbar>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
  name: "CalendarView",
  components: {
    Navbar,
  },
};
</script>
