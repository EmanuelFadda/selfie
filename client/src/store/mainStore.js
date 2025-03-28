import { defineStore } from "pinia"

export const useMainStore = defineStore("main", {
  state: () => ({
    topItem: [],
    bottomItems: [],
  }),
  actions: {
    setTopItem(item) {
      this.topItem = [item]
    },
    setBottomItems(items) {
      this.bottomItems = [...items]
    },
  },
})
