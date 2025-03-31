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
    <div class="ml-5 mr-5 grid h-[calc(100vh-108px)] grid-cols-2 grid-rows-2 gap-x-4 lg:ml-20 lg:mr-20 lg:h-[calc(100vh-132px)] lg:grid-cols-3 lg:gap-8 xl:ml-28 xl:mr-28 2xl:ml-36 2xl:mr-36">
      <draggable v-model="topItem" group="layout" item-key="id" @end="handleDrag" class="row-span-2 max-sm:col-span-2 max-sm:mb-4 lg:col-span-2">
        <template #item="{ element }">
          <HomeTopItem :key="element.id" :title="element.title" componentType="div" :lightBgColor="element.lightBgColor" :darkBgColor="element.darkBgColor" :lightBordColor="element.lightBordColor" :darkBordColor="element.darkBordColor" content="Trascina questo blocco nella posizione che prefeisci!" class="-mb-0 -ml-0 -mr-0 flex flex-auto flex-col"></HomeTopItem>
        </template>
      </draggable>

      <!-- Drag & Drop per la parte inferiore -->
      <draggable v-model="bottomItems" group="layout" item-key="id" @end="handleDrag" class="row-span-2 grid grid-rows-subgrid gap-4 max-sm:col-span-2 max-sm:grid max-sm:grid-cols-subgrid max-sm:gap-y-0 lg:gap-8">
        <template #item="{ element }">
          <HomeBottomItem :key="element.id" :title="element.title" componentType="div" :lightBgColor="element.lightBgColor" :darkBgColor="element.darkBgColor" :lightBordColor="element.lightBordColor" :darkBordColor="element.darkBordColor" content="Trascina questo blocco nella posizione che prefeisci!"></HomeBottomItem>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable"
import HomeTopItem from "@/components/HomeTopItem.vue"
import HomeBottomItem from "@/components/HomeBottomItem.vue"
import router from "@/router"
import { useMainStore } from "@/store"
import { ref } from "vue"

export default {
  name: "EditLayoutView",
  components: {
    draggable,
    HomeTopItem,
    HomeBottomItem,
  },
  setup() {
    const store = useMainStore()
    const back = ref(null)
    const pageTitle = ref(null)
    const save = ref(null)
    const modified = ref(false)

    const topItem = store.items.slice(0, 1)
    const bottomItems = store.items.slice(1)

    return { store, topItem, bottomItems, back, pageTitle, save, modified }
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
        const temp = this.topItem.find((n) => this.store.items.slice(0, 1).includes(n))
        this.topItem = this.topItem.filter((n) => n !== temp)
        this.bottomItems.splice(this.store.items.slice(1).indexOf(this.topItem[0]), 0, temp)
      } else if (this.topItem.length === 0) {
        let index = Math.min(this.bottomItems.indexOf(this.store.items[0]), 1)
        this.topItem.push(this.bottomItems[index + 1])
        this.bottomItems.splice(index + 1, 1)
      }

      this.modified = true
    },
    save() {
      const items = {
        0: "calendar",
        1: "notes",
        2: "tomato",
      }

      const layout = [items[this.topItem[0].id], items[this.bottomItems[0].id], items[this.bottomItems[1].id]]

      fetch(`http://localhost:3000/modify_layout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
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
