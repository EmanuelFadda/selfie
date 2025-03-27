<template>
  <div class="flex min-h-screen flex-col">
    <Navbar viewTitle="Selfie" name="Nome" surname="Cognome" :settingsArray="settingsArray"></Navbar>

    <!-- Anteprima oggetti delle note e pomodoro (default piccole) -->
    <div class="ml-5 mr-5 grid h-[calc(100vh-108px)] grid-cols-2 grid-rows-2 gap-4 lg:ml-20 lg:mr-20 lg:h-[calc(100vh-132px)] lg:grid-cols-3 lg:gap-8 xl:ml-28 xl:mr-28 2xl:ml-36 2xl:mr-36">
      <HomeGridTop v-for="(item, index) in topItem" :key="index" :title="item.title" :componentType="item.componentType" :lightBgColor="item.lightBgColor" :darkBgColor="item.darkBgColor" :lightBordColor="item.lightBordColor" :darkBordColor="item.darkBordColor" :route="item.route" :content="item.content" class="row-span-2 flex flex-auto flex-col max-sm:col-span-2 lg:col-span-2"></HomeGridTop>

      <HomeGridBottom v-for="(item, index) in bottomItems" :key="index" :title="item.title" :componentType="item.componentType" :lightBgColor="item.lightBgColor" :darkBgColor="item.darkBgColor" :lightBordColor="item.lightBordColor" :darkBordColor="item.darkBordColor" :route="item.route" :content="item.content"></HomeGridBottom>
    </div>
  </div>
</template>

<script>
import HomeGridTop from "../components/HomeGridTop.vue"
import Navbar from "../components/Navbar.vue"
import HomeGridBottom from "../components/HomeGridBottom.vue"
import { useMainStore } from "../store/mainStore"

export default {
  name: "HomeView",
  components: {
    Navbar,
    HomeGridTop,
    HomeGridBottom,
  },
  setup() {
    const store = useMainStore()
    const topItem = store.topItem
    const bottomItems = store.bottomItems

    return { store, topItem, bottomItems }
  },
  data() {
    return {
      settingsArray: [
        { label: "Layout", route: `/${this.$route.params.username}/modifylayout`, icon: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" },
        { label: "Riconoscimenti", route: `/${this.$route.params.username}/credits`, icon: "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" },
        { label: "Logout", route: "/", icon: "M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" },
      ],
    }
  },
}
</script>
