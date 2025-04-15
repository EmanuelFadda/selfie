<template>
  <div class="flex min-h-screen flex-col">
    <Navbar viewTitle="Calendario" :titleColor="classColor" :backButton="true" name="Nome" surname="Cognome" :settingsArray="settingsArray"></Navbar>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue"

const classColor = "text-sky-400 dark:text-sky-500"

</script>
