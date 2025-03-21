<template>
  <div class="relative min-h-screen overflow-hidden">
    <div ref="name1" class="absolute whitespace-nowrap text-2xl font-bold text-white" style="left: 0px; top: 0px; user-select: none">Crediti:</div>
    <div ref="name2" class="absolute whitespace-nowrap text-2xl font-bold text-white" style="left: 100px; top: 100px; user-select: none">Massimiliano Prandi</div>
    <div ref="name3" class="absolute whitespace-nowrap text-2xl font-bold text-white" style="left: 200px; top: 200px; user-select: none">Emanuel Fadda</div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "CreditsView",
  setup() {
    const name1 = ref(null)
    const name2 = ref(null)
    const name3 = ref(null)

    const animate = (element, speedX, speedY) => {
      let x = parseFloat(element.style.left)
      let y = parseFloat(element.style.top)
      const update = () => {
        x += speedX
        y += speedY

        if (x <= 0 || x + element.offsetWidth >= window.innerWidth) speedX *= -1
        if (y <= 0 || y + element.offsetHeight >= window.innerHeight) speedY *= -1

        element.style.left = `${x}px`
        element.style.top = `${y}px`

        requestAnimationFrame(update)
      }
      update()
    };

    onMounted(() => {
      if (name1.value && name2.value && name3.value) {
        animate(name1.value, 2, 2)
        animate(name2.value, -2, -2)
        animate(name3.value, 2, -2)
      }
    });

    return { name1, name2, name3 }
  },
};
</script>
