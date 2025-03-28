<template>
  <div class="relative min-h-screen" @click="startAnimation">
    <div class="mb-2 flex items-center p-6">
      <svg @click.stop="goBack" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="mr-6 size-6" ref="back">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
      <h1 class="text-3xl font-semibold" ref="pageTitle">Crediti</h1>
    </div>

    <div class="h-full">
      <div :class="name1Class" ref="name1" style="user-select: none">Massimiliano Prandi</div>
      <div :class="name2Class" ref="name2" style="user-select: none">Emanuel Fadda</div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue"
import router from "../router/index.js"

export default {
  name: "CreditsView",
  setup() {
    const name1 = ref(null)
    const name2 = ref(null)
    const animationStarted = ref(false)
    const back = ref(null)
    const pageTitle = ref(null)

    const name1Class = computed(() => (animationStarted.value ? "absolute text-2xl font-semibold whitespace-nowrap" : "text-2xl font-semibold flex justify-center"))

    const name2Class = computed(() => (animationStarted.value ? "absolute text-2xl font-semibold whitespace-nowrap" : "text-2xl font-semibold flex justify-center"))

    const animate = (element, speedX, speedY) => {
      let rect = element.getBoundingClientRect()
      let x = window.innerWidth / 2 - element.innerHTML.length * 3
      let y = rect.y + (element.innerHTML.length > 17 ? 0 : 32) - 20

      element.style.position = "absolute"
      element.style.left = `${x}px`
      element.style.top = `${y}px`

      const update = () => {
        if (!element) return

        x += speedX
        y += speedY

        if (x <= 0 || x + element.offsetWidth >= window.innerWidth) speedX *= -1
        if (y <= 0 || y + element.offsetHeight >= window.innerHeight) speedY *= -1

        element.style.left = `${x}px`
        element.style.top = `${y}px`

        requestAnimationFrame(update)
      }
      update()
    }

    return { name1, name2, animationStarted, animate, name1Class, name2Class, back, pageTitle }
  },
  methods: {
    goBack() {
      this.back.classList.add("animate-arrow")
      this.pageTitle.classList.add("animate-page-title")

      setTimeout(() => {
        router.go(-1)
      }, 650)
    },
    startAnimation() {
      if (this.animationStarted) return
      this.animationStarted = true

      if (this.name1 && this.name2) {
        this.animate(this.name1, -1.5, -1.5)
        this.animate(this.name2, 1.5, -1.5)
      }
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
    transform: translateX(-48px);
  }
}

@keyframes page-title {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-48px);
  }
}
</style>
