<template>
  <div class="flex min-h-screen flex-col">
    <Navbar viewTitle="Pomodoro" :titleColor="classColor" :backButton="true" ></Navbar>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue"

const classColor = "text-red-400 dark:text-red-500"
  
</script>
