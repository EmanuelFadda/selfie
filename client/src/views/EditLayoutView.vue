<template>
  <div class="flex-flow-col flex min-h-screen">
    <div class="mb-1 flex items-center p-6">
      <svg @click="goBack" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="mr-6 size-6" ref="back">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
      <h1 class="text-3xl font-semibold" ref="pageTitle">Modifica layout</h1>
      <svg @click="save" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="absolute right-5 size-6" ref="save" :class="modified ? '' : 'hidden'">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
    </div>

    <!-- Drag & Drop per la parte superiore -->
    <div ref="container" class="ml-5 mr-5 grid h-[calc(100vh-108px)] grid-cols-2 grid-rows-2 gap-x-4 lg:ml-20 lg:mr-20 lg:h-[calc(100vh-132px)] lg:grid-cols-3 lg:gap-8 xl:ml-28 xl:mr-28 2xl:ml-36 2xl:mr-36">
      
      <div data-swapy-slot="a" class="flex flex-auto max-sm:col-span-2 h-full">
        <div data-swapy-item="a" class="flex flex-auto h-full">
          <HomeTopItem
            :title="items[0].title"
            :route="items[0].route"
            :content="items[0].content"
            :lightBgColor="items[0].lightBgColor"
            :darkBgColor="items[0].darkBgColor"
            :lightBordColor="items[0].lightBordColor"
            :darkBordColor="items[0].darkBordColor"
            componentType="div"
            class="flex flex-auto flex-col"
          >
          </HomeTopItem>
        </div>
      </div>

      <div data-swapy-slot="b">
        <div data-swapy-item="b">
          <HomeBottomItem
            :title="items[1].title"
            :route="items[1].route"
            :content="items[1].content"
            :lightBgColor="items[1].lightBgColor"
            :darkBgColor="items[1].darkBgColor"
            :lightBordColor="items[1].lightBordColor"
            :darkBordColor="items[1].darkBordColor"
            componentType="div"
          >
          </HomeBottomItem>
        </div>
      </div>

      <div data-swapy-slot="c">
        <div data-swapy-item="c">
          <HomeBottomItem
            :title="items[2].title"
            :route="items[2].route"
            :content="items[2].content"
            :lightBgColor="items[2].lightBgColor"
            :darkBgColor="items[2].darkBgColor"
            :lightBordColor="items[2].lightBordColor"
            :darkBordColor="items[2].darkBordColor"
            componentType="div"
          >
        </HomeBottomItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeTopItem from "@/components/HomeTopItem.vue"
import HomeBottomItem from "@/components/HomeBottomItem.vue"
import router from "@/router"
import { useMainStore } from "@/store"
import { ref, onMounted } from "vue"
import { createSwapy } from 'swapy'

export default {
  name: "EditLayoutView",
  components: {
    HomeTopItem,
    HomeBottomItem,
  },
  setup() {
    const store = useMainStore()
    const back = ref(null)
    const pageTitle = ref(null)
    const save = ref(null)
    const modified = ref(false)

    const items = ref(store.items)

    const container = ref()
    const swapy = ref()

    onMounted(() => {
      swapy.value = createSwapy(container.value, {
        
      })
    })

    return { store, items, back, pageTitle, save, modified, swapy, container}
  },
  methods: {
    goBack() {
      this.back.classList.add("animate-arrow")
      this.pageTitle.classList.add("animate-page-title")

      setTimeout(() => {
        router.go(-1)
      }, 650)
    },
    handleDrag() {
      this.modified = false

      if (this.topItem.length === 2) {
          const temp = this.topItem.find(n => this.store.items.slice(0, 1).includes(n));
          this.topItem = this.topItem.filter(n => n !== temp);
          this.bottomItems.splice(this.store.items.slice(1).indexOf(this.topItem[0]), 0, temp);
      } else if (this.topItem.length === 0) {
          let index = Math.min(this.bottomItems.indexOf(this.store.items[0]), 1);
          this.topItem.push(this.bottomItems[index + 1]);
          this.bottomItems.splice(index + 1, 1);
      }

      this.modified = true
    },
    save() {
      const items = {
        0 : "calendar",
        1 : "notes",
        2 : "tomato",
      }

      const layout = [items[this.topItem[0].id], items[this.bottomItems[0].id], items[this.bottomItems[1].id]]

      fetch(`http://localhost:3000/edit_layout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          username: this.store.user.username,
          layout: layout,
        }),
      })

      this.back.classList.add("animate-arrow")
      this.pageTitle.classList.add("animate-page-title")
      this.save.classList.add("stroke-green-500")
      this.save.setAttribute("stroke-width", "3")

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
