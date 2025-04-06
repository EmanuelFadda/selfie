<template>
  <div class="flex min-h-screen flex-col">
    <Navbar viewTitle="Pomodoro" :titleColor="classColor" :backButton="true" ></Navbar>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue"

export default {
  name: "TomatoView",
  components: {
    Navbar,
  },
  setup() {
    return {}
  },
  data() {
    return {
      classColor: "text-red-400 dark:text-red-500",
    }
  },
}
</script>
