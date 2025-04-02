<template>
  <div @click="editNote" class="tracking-tigh relative w-full rounded-2xl bg-white p-4 pb-3 pt-3  dark:bg-neutral-800" :class="tag.length === 0 ? 'min-h-[70px] sm:min-h-[90px] lg:min-h-[110px]' : 'min-h-[114px] sm:min-h-[134px] lg:min-h-[154px]'" @touchstart="startTouch" @touchmove="moveTouch" @touchend="endTouch" style="user-select: none;">
    <div class="flex items-center justify-between">
      <!-- Title -->
      <h2 class="text-xl font-semibold">{{ title }}</h2>

      <!-- Non-mobile buttons -->
      <div v-if="!isMobile" class="group relative text-left">
        <button type="button" id="menu-button" class="relative before:absolute before:-inset-2 before:content-['']">
          <svg @click="exlcudeClick = true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="-mr-2 size-[22px]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
          </svg>
        </button>
        <div class="invisible absolute -right-1 z-10 w-[148px] origin-top-right group-hover:visible" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
          <a href="#" @click="exportNote" class="flex items-center rounded-t-md border-2 border-b-0 border-neutral-700 text-neutral-700 bg-white p-2 pb-[5px] pt-[5px] text-base hover:bg-neutral-700 hover:text-slate-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-stone-200 hover:dark:bg-white hover:dark:text-neutral-800" role="menuitem" tabindex="-1" id="menu-item-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="mr-[5px] size-[22px]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Esporta
          </a>
          <a href="#" @click="exlcudeClick = true" class="flex items-center rounded-b-md border-2 border-neutral-700 text-neutral-700 bg-white p-2 pb-[5px] pt-[5px] text-base hover:bg-neutral-700 hover:text-slate-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-stone-200 hover:dark:bg-white hover:dark:text-neutral-800" role="menuitem" tabindex="-1" id="menu-item-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="mr-[5px] size-[22px]">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            Elimina
          </a>
        </div>
      </div>
    </div>

    <!-- Text -->
    <p class="line-clamp-1 pr-6 text-lg/5 text-neutral-400 sm:line-clamp-2 lg:line-clamp-3">{{ content }}</p>

    <!-- Tags -->
    <span v-if="tag.length > 0" class="absolute bottom-4 inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium ring-1 ring-inset" :class="tagColor">{{ tag }}</span>

    <!-- Mobile Buttons -->
    <div v-if="showButtons" class="absolute z-20 flex flex-col items-center gap-3 rounded-lg transition-transform" :style="{ top: `${position.y}px`, left: `${position.x}px` }">
      <button class="rounded-full border-2 border-neutral-800 p-3 dark:border-neutral-700" :class="selected === 'export' ? 'bg-neutral-800 text-slate-50 dark:bg-slate-50 dark:text-neutral-800' : 'bg-white dark:bg-neutral-800 dark:text-stone-200'" ref="editButton">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
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
import { useMainStore } from "@/store"

export default {
  name: "Note",
  props: {
    id: String,
    title: String,
    content: String,
    tag: String,
    data_creation: Date,
    date_last_modify: Date,
  },
  setup(props) {
    const deleteButton = ref(null)
    const editButton = ref(null)
    const store = useMainStore()
    const colors = {
      grey: "bg-gray-50 text-gray-600 ring-gray-500/10 dark:bg-grey-400/10 dark:text-grey-400 dark:ring-grey-400/20",
      red: "bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20",
      yellow: "bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-500 dark:ring-yellow-400/20",
      green: "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20",
      blue: "bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30",
      indigo: "bg-indigo-50 text-indigo-700 ring-indigo-700/10 dark:bg-indigo-400/10 dark:text-indigo-400 dark:ring-indigo-400/30",
      purple: "bg-purple-50 text-purple-700 ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30",
      pink: "bg-pink-50 text-pink-700 ring-pink-700/10 dark:bg-pink-400/10 dark:text-pink-400 dark:ring-pink-400/20",
    }

    let tagColor = ""
    if (props.tag.length !== 0) {
      tagColor = store.user.tags
        .filter(tag => tag.name === props.tag)
        .map(tag => colors[tag.color])
    }

    const checkMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }

    const isMobile = checkMobile()

    return { deleteButton, editButton, isMobile, tagColor }
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
        this.position = { x: touch.clientX - 70, y: touch.clientY - 180}
        this.mirrorButtons = true
      } else {
        this.position = { x: touch.clientX - 20, y: touch.clientY - 180}
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
        this.selected = "export"
      } else if (newPosX > deleteButtonPosX && newPosX < deleteButtonPosX + 48 && newPosY > deleteButtonPosY && newPosY < deleteButtonPosY + 48) {
        this.selected = "delete"
      } else {
        this.selected = null
      }
    },
    endTouch() {
      if (this.selected === "export") {
        this.exportNote()
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
        router.push(`/${this.$route.params.username}/notes/${this.id}`)
      }
      this.exlcudeClick = false
    },
    exportNote() {
      this.exlcudeClick = true
      const fileName = this.title.toLowerCase() + ".md";
      const markdownContent = `# ${this.title}\n\n${this.content}\n\n### Tag: ${this.tag}`
      const blob = new Blob([markdownContent], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    },
  },
}
</script>

<style scoped>
.transition-transform {
  transition: transform 0.2s;
}
</style>
