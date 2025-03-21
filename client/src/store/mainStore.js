import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    topItem: [{ id: 0, title: "Calendario", route:"/calendar", componentType: "RouterLink", lightBgColor: "bg-sky-400", darkBgColor: "dark:bg-sky-500", lightBordColor: "border-sky-400", darkBordColor: "dark:border-sky-500", content: "Qui ci verranno messi eventi e attività" }],
    bottomItems: [
      { id: 1, title: "Note", route:"/", componentType: "RouterLink", lightBgColor: "bg-amber-300", darkBgColor: "dark:bg-amber-400", lightBordColor: "border-amber-300", darkBordColor: "dark:border-amber-400", content: "Una prova di una nota carina" },
      { id: 2, title: "Pomodoro", route:"/", componentType: "RouterLink", lightBgColor: "bg-red-400", darkBgColor: "dark:bg-red-500", lightBordColor: "border-red-400", darkBordColor: "dark:border-red-500", content: "Studia tanto con i pomodori!" },
    ],
  }),
  actions: {
    setTopItem(item) {
      this.topItem = item;
    },
    setBottomItems(item, index) {
      this.bottomItems[index] = item;
    },
    getTopItem() {
      return this.topItem;
    },
    getBottomItem(index) {
      return this.bottomItems[index];
    },
  },
});
