<template>
  <div class="flex min-h-screen flex-col">
    <Navbar viewTitle="Note" :titleColor="classColor" name="Nome" surname="Cognome" :backButton="true" :settingsArray="settingsArray"></Navbar>

    <div class="ml-5 mr-5 grid h-full grid-cols-1 gap-y-[10px] overflow-auto">
      <!-- Inizio Nota -->
      <div @click="editNote" class="tracking-tigh w-full rounded-2xl bg-white p-4 pb-3 pt-3 dark:bg-neutral-800" @touchstart="startTouch" @touchmove="moveTouch" @touchend="endTouch" style="user-select: none">
        <h2 class="pb-1 text-xl font-semibold">Titolo Nota</h2>
        <p class="line-clamp-2 text-lg/5 text-neutral-500">
          Un po di testo a caso
          <br />
          Un altro po di testo
        </p>
        <div v-if="showButtons" class="absolute flex flex-col items-center gap-3 rounded-lg transition-transform" :style="{ top: `${position.y}px`, left: `${position.x}px` }">
          <button class="rounded-full border-2 border-neutral-900 p-3 dark:border-slate-50" :class="selected === 'edit' ? 'bg-neutral-900 text-slate-50 dark:bg-slate-50 dark:text-neutral-800' : 'bg-white dark:border-stone-200 dark:bg-neutral-900 dark:text-stone-200'" ref="editButton">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </button>
          <button class="rounded-full border-2 border-neutral-900 p-3 shadow-lg dark:border-slate-50" :class="selected === 'delete' ? 'bg-neutral-900 text-slate-50 dark:bg-slate-50 dark:text-neutral-800' : 'bg-white dark:border-stone-200 dark:bg-neutral-900 dark:text-stone-200'" v-bind:style="[mirrorButtons ? { transform: 'translateX(-50px)' } : { transform: 'translateX(50px)' }]" ref="deleteButton">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </div>
      </div>
      <!-- Fine nota -->
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import { ref } from "vue"
import router from "@/router"

export default {
  name: "NotesView",
  components: {
    Navbar,
  },
  setup() {
    const deleteButton = ref(null)
    const editButton = ref(null)

    return { deleteButton, editButton }
  },
  data() {
    return {
      settingsArray: [
        { label: "Crediti", route: `/${this.$route.params.username}/credits`, icon: "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" },
        { label: "Logout", route: "/", icon: "M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" },
      ],
      classColor: "text-amber-300 dark:text-amber-400",
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
        router.push(`/${this.$route.params.username}/notes/ID_NOTA`)
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
