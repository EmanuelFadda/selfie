<template>
  <div @click="editNote" class="tracking-tigh w-full rounded-2xl bg-white p-4 pb-3 pt-3 min-h-24 md:min-h-32 lg:min-h-44 dark:bg-neutral-800" @touchstart="startTouch" @touchmove="moveTouch" @touchend="endTouch" style="user-select: none">
    <div class="flex items-center justify-between">
      <!-- Title -->
      <h2 class="pb-1 text-xl font-semibold">{{ title }}</h2>

      <!-- Non-mobile buttons -->
      <div v-if="!isMobile" class="relative group text-left">
        <button type="button" id="menu-button">
          <svg @click="exlcudeClick = true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="size-6 -mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
          </svg>
        </button>
        <div class="invisible origin-top-right absolute -right-1 z-10 w-[148px] group-hover:visible" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
          <a href="#" @click="exlcudeClick = true" class="flex items-center rounded-t-md border-2 border-b-0 border-neutral-800 bg-white p-2 pb-[5px] pt-[5px] text-base hover:bg-neutral-800 hover:text-slate-50 dark:border-neutral-700 dark:bg-neutral-800/75 dark:text-stone-200 hover:dark:bg-white/75 hover:dark:text-neutral-800" role="menuitem" tabindex="-1" id="menu-item-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="mr-[5px] size-[22px]">
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            Modifica
          </a>
          <a href="#" @click="exlcudeClick = true" class="flex items-center rounded-b-md border-2 border-neutral-800 bg-white p-2 pb-[5px] pt-[5px] text-base hover:bg-neutral-800 hover:text-slate-50 dark:border-neutral-700 dark:bg-neutral-800/75 dark:text-stone-200 hover:dark:bg-white/75 hover:dark:text-neutral-800" role="menuitem" tabindex="-1" id="menu-item-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-[5px] size-[22px]">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            Elimina
          </a>
        </div>
      </div>
    </div>

    <!-- Text -->
    <p class="line-clamp-2 pr-6 text-lg/5 text-neutral-500">{{ content }}</p>

    <!-- Mobile Buttons -->
    <div v-if="showButtons" class="absolute flex flex-col items-center gap-3 rounded-lg transition-transform" :style="{ top: `${position.y}px`, left: `${position.x}px` }">
      <button class="rounded-full border-2 border-neutral-800 p-3 dark:border-neutral-700" :class="selected === 'edit' ? 'bg-neutral-800 text-slate-50 dark:bg-slate-50 dark:text-neutral-800' : 'bg-white dark:bg-neutral-800 dark:text-stone-200'" ref="editButton">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
      </button>
      <button class="rounded-full border-2 border-neutral-800 p-3 shadow-lg dark:border-neutral-700" :class="selected === 'delete' ? 'bg-neutral-800 text-slate-50 dark:bg-slate-50 dark:text-neutral-800' : 'bg-white dark:bg-neutral-800 dark:text-stone-200'" v-bind:style="[mirrorButtons ? { transform: 'translateX(-50px) translateY(-5px)' } : { transform: 'translateX(50px) translateY(-5px)' }]" ref="deleteButton">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"
import router from "@/router"

export default {
  name: "Note",
  props: {
    id: String,
    title: String,
    content: String,
    tags: Array, // Ancora da aggiungere alla visualizzazione della nota
    data_creation: Date,
    date_last_modify: Date,
  },
  setup() {
    const deleteButton = ref(null)
    const editButton = ref(null)

    const checkMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }

    const isMobile = checkMobile()

    return { deleteButton, editButton, isMobile }
  },
  data() {
    return {
      showButtons: false,
      position: { x: 0, y: 0 },
      selected: null,
      mirrorButtons: null,
      pressStartTime: null,
      longPress: false,
      exlcudeClick: false,
    }
  },
  methods: {
    startTouch(event) {
      this.pressStartTime = Date.now()
      this.longPress = true

      setTimeout(() => {
        if (this.longPress) {
          this.showButtons = true
          this.exlcudeClick = true
        }
      }, 300)

      const touch = event.touches[0]

      if (touch.clientX > (window.innerWidth * 2) / 3) {
        this.position = { x: touch.clientX - 50, y: touch.clientY - 90 }
        this.mirrorButtons = true
      } else {
        this.position = { x: touch.clientX + 5, y: touch.clientY - 90 }
      }
    },
    moveTouch(event) {
      this.longPress = false
      const touch = event.touches[0]
      const newPosX = touch.clientX
      const newPosY = touch.clientY

      const editButtonPosX = this.editButton.getBoundingClientRect().left
      const editButtonPosY = this.editButton.getBoundingClientRect().top
      const deleteButtonPosX = this.deleteButton.getBoundingClientRect().left
      const deleteButtonPosY = this.deleteButton.getBoundingClientRect().top

      if (newPosX > editButtonPosX && newPosX < editButtonPosX + 48 && newPosY > editButtonPosY && newPosY < editButtonPosY + 48) {
        this.selected = "edit"
      } else if (newPosX > deleteButtonPosX && newPosX < deleteButtonPosX + 48 && newPosY > deleteButtonPosY && newPosY < deleteButtonPosY + 48) {
        this.selected = "delete"
      } else {
        this.selected = null
      }
    },
    endTouch() {
      if (this.selected === "edit") {
        alert("Modifica nota")
      } else if (this.selected === "delete") {
        alert("Elimina nota")
      }
      this.longPress = false
      this.showButtons = false
      this.mirrorButtons = false
      this.selected = null
    },
    editNote() {
      if (!this.exlcudeClick) {
        // Bisogna mettere la route giusta e creare la view
        router.push(`/${this.$route.params.username}/notes/${this.id}`)
      }
      this.exlcudeClick = false
    },
  },
}
</script>

<style scoped>
.transition-transform {
  transition: transform 0.2s;
}
</style>
