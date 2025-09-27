import { defineStore } from "pinia"

export const useMainStore = defineStore("main", {
  state: () => ({
    menu: {
      layout: [],
      content: {},
    },
    user: {},
    notes: [],
    activities:[],
    events:[],
    tagFilter: [],
    tags: [],
    colorsMap: {
      grey: "bg-gray-50 text-gray-600 ring-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/20",
      red: "bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20",
      yellow: "bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-500 dark:ring-yellow-400/20",
      green: "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20",
      blue: "bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30",
      indigo: "bg-indigo-50 text-indigo-700 ring-indigo-700/10 dark:bg-indigo-400/10 dark:text-indigo-400 dark:ring-indigo-400/30",
      purple: "bg-purple-50 text-purple-700 ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30",
      pink: "bg-pink-50 text-pink-700 ring-pink-700/10 dark:bg-pink-400/10 dark:text-pink-400 dark:ring-pink-400/20",
    },
    selectedDateTime: "",
    currentDateTime: "",
    editCalendarObj:"",
  }),
  actions: {
    updateDateTime() {
      if (!this.selectedDateTime) {
        const now = new Date()
        const day = String(now.getDate()).padStart(2, '0')
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const year = now.getFullYear()
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        this.currentDateTime = `${day}/${month}/${year} ${hours}:${minutes}`
      } else {
        const date = new Date(this.selectedDateTime)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        this.currentDateTime = `${day}/${month}/${year} ${hours}:${minutes}`
      }
    },
    startClock() {
      this.updateDateTime()

      setInterval(() => {
        if (!this.selectedDateTime) {
          this.updateDateTime()
        }
      }, 60000)
    },
    getVirtualNow() {
      if (this.selectedDateTime) {
        return new Date(this.selectedDateTime).toISOString()
      }
      return new Date().toISOString()
    },
    
  }
})
