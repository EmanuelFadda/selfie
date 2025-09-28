<template>
  <div class="flex min-h-screen flex-col">
    <Navbar viewTitle="Calendario" :myButton="myButton" :titleColor="classColor" :backButton="true"  :settingsArray="settingsArray"></Navbar>
    <Calendar class=""></Calendar>
  </div>
</template>

<script setup>
import Calendar from '@/components/Calendar.vue';
import Navbar from '@/components/Navbar.vue';
const classColor = "text-blue-300 dark:text-blue-400"
import router from '@/router';
import { useRoute } from 'vue-router';


const route = useRoute()


// bottone della navbar che porta alla creazione degli elementi
const myButton = {
  exist: true,
  paths: ["M12 4.5v15m7.5-7.5h-15"],
  function: () => {
    router.push(`${route.path}/new`)
  },
}


</script>
 