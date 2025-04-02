import { defineStore } from "pinia"

export const useMainStore = defineStore("main", {
  state: () => ({
    items: [],
    user: {},
    notes: [],
    currentNote: {},
  }),
  actions: {},
})
