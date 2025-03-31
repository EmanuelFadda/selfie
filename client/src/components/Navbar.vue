<!-- Navbar component -->
<template>
  <nav class="max-lg:mb-1 flex items-center bg-slate-100 p-6 dark:bg-neutral-900">
    <svg v-if="backButton" @click="goBack" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="mr-5 -ml-1 size-6 lg:size-7" ref="back">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
    <h1 class="text-3xl lg:text-4xl" :class="titleColor,backButton ? 'font-semibold' : 'font-bold'"  ref="pageTitle">{{ viewTitle }}</h1>
    <svg :class="{'invisible': settingsArray.length === 0}" @click="settings = true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="absolute right-5 size-8 lg:size-9 self-center">
      <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  </nav>

  <!-- Blurred overlay -->
  <div v-if="settings" @click="settings = false" class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"></div>

  <!-- Scrollable settings menu -->
  <div :class="settings ? 'translate-x-0' : 'translate-x-full'" class="3xl:w-[16%] fixed right-0 top-0 h-full w-[82%] bg-slate-100 shadow-lg transition-transform duration-[400ms] md:w-[36%] lg:w-[30%] xl:w-[28%] 2xl:w-[20%] dark:bg-neutral-800">
    <!-- Menu content -->
    <div class="mt-6 flex items-center space-x-2 pl-2">
      <img src="" alt="Immagine profilo" class="h-[52px] w-[52px] rounded-full border-2 border-slate-200 dark:border-neutral-600" />
      <div class="flex-none">
        <h2 class="text-lg font-semibold text-neutral-900 dark:text-slate-50">{{ name + " " + surname }}</h2>
        <h5 class="text-sm text-neutral-600 dark:text-neutral-400">Visualizza profilo</h5>
      </div>
    </div>

    <!-- Options list -->
    <div class="mt-3 pl-1">
      <RouterLink v-for="(setting, index) in settingsArray" :key="index" :to="setting.route" class="flex items-center border-b border-slate-300 py-3 pl-4 text-lg dark:border-neutral-600">
        <svg v-if="setting.icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-3 size-6">
          <path :d="setting.icon" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        {{ setting.label }}
      </RouterLink>
    </div>
  </div>
</template>

<script>
import router from "@/router"
import { ref } from "vue"

export default {
  name: "Navbar",
  setup() {
    const back = ref(null)
    const pageTitle = ref(null)
    const settings = ref(false)

    return { back, pageTitle, settings }
  },
  props: {
    name: String,
    surname: String,
    viewTitle: String,
    backButton: Boolean,
    titleColor: { type: String, default: "" },
    settingsArray: Array,
  },
  methods: {
    goBack() {
      this.back.classList.add("animate-arrow")
      this.pageTitle.classList.add("animate-page-title")

      setTimeout(() => {
        router.go(-1)
      }, 650)
    },
  },
}
</script>

<style scoped>
.animate-arrow {
  animation: arrow 0.5s;
  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  -o-animation-fill-mode: forwards;
  -ms-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

.animate-page-title {
  animation: page-title 0.5s;
  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  -o-animation-fill-mode: forwards;
  -ms-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

@keyframes arrow {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-40px);
  }
}

@keyframes page-title {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-40px);
  }
}
</style>
