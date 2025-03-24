<template>
  <div class="flex-flow-col flex min-h-screen">
    <div class="mb-2 flex items-center p-6">
      <svg @click="goBack" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-6 size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
      <h1 class="text-2xl font-semibold">Modifica layout</h1>
      <svg @click="save" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute right-5 size-6" :class="modified ? '' : 'hidden'">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
    </div>

    <!-- Drag & Drop per la parte superiore -->
    <draggable v-model="topItem" group="layout" item-key="id" class="flex-flow-col flex flex-auto" @end="handleDrag">
      <template #item="{ element }">
        <HomeGridTop :key="element.id" :title="element.title" componentType="div" :lightBgColor="element.lightBgColor" :darkBgColor="element.darkBgColor" :lightBordColor="element.lightBordColor" :darkBordColor="element.darkBordColor" content="Cambia il layout come preferisci!"></HomeGridTop>
      </template>
    </draggable>

    <!-- Drag & Drop per la parte inferiore -->
    <draggable v-model="bottomItems" group="layout" item-key="id" class="ml-5 mr-5 grid grid-cols-2 grid-rows-1 gap-4" @end="handleDrag">
      <template #item="{ element }">
        <HomeGridBottom :key="element.id" :title="element.title" componentType="div" :lightBgColor="element.lightBgColor" :darkBgColor="element.darkBgColor" :lightBordColor="element.lightBordColor" :darkBordColor="element.darkBordColor" content="Cambia il layout come preferisci!"></HomeGridBottom>
      </template>
    </draggable>
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

export default {
  name: "ModifyLayoutView",
  components: {
    draggable,
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
      router.go(-1)
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

      router.go(-1)
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
