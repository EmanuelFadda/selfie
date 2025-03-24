<template>
  <div class="flex-flow-col flex min-h-screen">
    <div class="mb-1 flex items-center p-6">
      <svg @click="goBack" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="mr-6 size-6" ref="back">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
      <h1 class="text-3xl font-semibold" ref="pageTitle">Modifica layout</h1>
      <svg @click="save" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="absolute right-5 size-6" :class="modified ? '' : 'hidden'">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
    </div>

    <!-- Drag & Drop per la parte superiore -->
    <div class="ml-5 mr-5 grid h-[calc(100vh-108px)] grid-cols-2 grid-rows-2 gap-x-4 lg:ml-20 lg:mr-20 lg:h-[calc(100vh-132px)] lg:grid-cols-3 lg:gap-8 xl:ml-28 xl:mr-28 2xl:ml-36 2xl:mr-36">
      <draggable v-model="topItem" group="layout" item-key="id" @end="handleDrag" class="max-sm:mb-4 row-span-2 max-sm:col-span-2 lg:col-span-2">
        <template #item="{ element }">
          <HomeGridTop :key="element.id" :title="element.title" componentType="div" :lightBgColor="element.lightBgColor" :darkBgColor="element.darkBgColor" :lightBordColor="element.lightBordColor" :darkBordColor="element.darkBordColor" content="Cambia il layout come preferisci!" class="-mb-0 -ml-0 -mr-0 flex flex-auto flex-col"></HomeGridTop>
        </template>
      </draggable>

      <!-- Drag & Drop per la parte inferiore -->
      <draggable v-model="bottomItems" group="layout" item-key="id" @end="handleDrag" class="row-span-2 grid grid-rows-subgrid gap-4 lg:gap-8 max-sm:gap-y-0 max-sm:col-span-2 max-sm:grid max-sm:grid-cols-subgrid">
        <template #item="{ element }">
          <HomeGridBottom :key="element.id" :title="element.title" componentType="div" :lightBgColor="element.lightBgColor" :darkBgColor="element.darkBgColor" :lightBordColor="element.lightBordColor" :darkBordColor="element.darkBordColor" content="Cambia il layout come preferisci!"></HomeGridBottom>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
// dovrei trovare un modo per far si che gli elementi vengano messi tutti nella stessa
// grid, altrimenti ce un po di flickering quando si sposta un elemento dal top al bottom
// e viceversa

import router from "../router/index.js"
import HomeGridBottom from "../components/HomeGridBottom.vue"
import HomeGridTop from "../components/HomeGridTop.vue"
import { useMainStore } from "../store/mainStore.js"
import draggable from "vuedraggable"
import { ref } from "vue"

export default {
  name: "ModifyLayoutView",
  components: {
    draggable,
    HomeGridTop,
    HomeGridBottom,
  },
  setup() {
    const store = useMainStore()
    const back = ref(null)
    const pageTitle = ref(null)

    const topItem = store.topItem
    const bottomItems = store.bottomItems

    return { store, topItem, bottomItems, back, pageTitle }
  },
  data() {
    return {
      modified: false,
      originalLayout: null,
    }
  },
  methods: {
    goBack() {
      if (this.originalLayout) {
        this.store.topItem = [...this.originalLayout.topItem]
        this.store.bottomItems = [...this.originalLayout.bottomItems]
      }

      this.back.classList.add("animate-arrow")
      this.pageTitle.classList.add("animate-page-title")

      setTimeout(() => {
        router.go(-1)
      }, 650)
    },
    handleDrag() {
      this.modified = false

      if (this.topItem.length === 2) {
        let temp = this.topItem.find((n) => this.originalLayout.topItem.includes(n))
        this.topItem = this.topItem.filter((n) => n !== temp)
        let index = this.originalLayout.bottomItems.indexOf(this.topItem[0])
        this.bottomItems.splice(index, 0, temp)
      } else if (this.topItem.length === 0) {
        let index = this.bottomItems.indexOf(this.originalLayout.topItem[0])
        if (index > 1) index = 1
        let temp = this.bottomItems[index + 1]
        this.topItem.push(temp)
        this.bottomItems.splice(index + 1, 1)
      }

      // Aggiorna lo stato dopo ogni operazione
      this.originalLayout = {
        topItem: [...this.topItem],
        bottomItems: [...this.bottomItems],
      }

      this.modified = true
    },
    save() {
      this.store.topItem = this.topItem
      this.store.bottomItems = this.bottomItems

      this.back.classList.add("animate-arrow")
      this.pageTitle.classList.add("animate-page-title")

      setTimeout(() => {
        router.go(-1)
      }, 650)
    },
  },
  mounted() {
    this.originalLayout = {
      topItem: this.store.topItem,
      bottomItems: [...this.store.bottomItems],
    }
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
