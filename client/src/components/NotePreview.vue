<template>
  <div @click="openNote" class="relative w-full rounded-2xl bg-white p-4 pb-3 pt-3 dark:bg-neutral-800" :class="tag.length === 0 ? 'min-h-[70px] sm:min-h-[90px] lg:min-h-[110px]' : 'min-h-[108px] sm:min-h-[128px] lg:min-h-[148px]'" @touchstart="startTouch" @touchmove="handleTouch" @touchend="endTouch" style="user-select: none">
    <div class="flex items-center justify-between">
      <!-- Title -->
      <h2 class="text-xl font-semibold">{{ title }}</h2>

      <!-- Non-mobile buttons -->
      <div v-if="!isMobile" class="group relative text-left">
        <button @click="excludeClick = true" type="button" id="menu-button" class="relative before:absolute before:-inset-2 before:content-['']">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="-mr-2 size-[22px]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
          </svg>
        </button>
        <div class="invisible absolute -right-1 z-10 w-[148px] origin-top-right group-hover:visible" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
          <a href="#" @click="duplicateNote" class="flex items-center rounded-t-md border-2 border-b-0 border-neutral-700 bg-white p-2 pb-[5px] pt-[5px] text-base text-neutral-700 hover:bg-neutral-700 hover:text-slate-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-stone-200 hover:dark:bg-white hover:dark:text-neutral-800" role="menuitem" tabindex="-1" id="menu-item-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="mr-[5px] size-[22px]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
            </svg>
            Duplica
          </a>
          <a href="#" @click="exportNote" class="flex items-center border-2 border-b-0 border-neutral-700 bg-white p-2 pb-[5px] pt-[5px] text-base text-neutral-700 hover:bg-neutral-700 hover:text-slate-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-stone-200 hover:dark:bg-white hover:dark:text-neutral-800" role="menuitem" tabindex="-1" id="menu-item-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="mr-[5px] size-[22px]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Esporta
          </a>
          <a href="#" @click="deleteNote" class="flex items-center rounded-b-md border-2 border-neutral-700 bg-white p-2 pb-[5px] pt-[5px] text-base text-neutral-700 hover:bg-neutral-700 hover:text-slate-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-stone-200 hover:dark:bg-white hover:dark:text-neutral-800" role="menuitem" tabindex="-1" id="menu-item-0">
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
    <span v-if="tag.length > 0" class="absolute bottom-[14px] inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium ring-1 ring-inset" :class="tagColor">{{ tag }}</span>

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

<script setup>
import { ref, onMounted } from "vue"
import router from "@/router"
import { useRoute } from "vue-router"
import { useMainStore } from "@/store"
import api from "@/api"

defineOptions({
  name: "NotePreview"
})

const props = defineProps({
  id: String,
  title: String,
  content: String,
  tag: String,
  data_creation: Date,
  date_last_modify: Date,
})

const store = useMainStore()
const route = useRoute()

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const colorsMap = store.colorsMap

const tagColor = ref()
const deleteButton = ref(null)
const editButton = ref(null)
const showButtons = ref(false)
const position = ref({ x: 0, y: 0 })
const selected = ref(null)
const mirrorButtons = ref(null)
const pressStartTime = ref(null)
const longPress = ref(false)
const excludeClick = ref(false)

onMounted(async () => {
  const tags_response = await api.getTags()
  const tags = tags_response.content.tags
  store.tags = tags

  tagColor.value = props.tag.length === 0 ? "" : store.tags.filter(tag => tag.name === props.tag).map(tag => colorsMap[tag.color])
})

function openNote() {
  if (!excludeClick.value) {
    store.currentNote = store.notes.filter(note => note.id == props.id)[0]
    router.push(`${route.path}/${props.id}`)
  }

  excludeClick.value = false
}

function exportNote() {
  excludeClick.value = true

  const markdownContent = `# ${props.title}\n\n${props.content}\n\n### Tag: ${props.tag}`
  const blob = new Blob([markdownContent], { type: "text/markdown" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")

  a.href = url
  a.download = props.title.toLowerCase() + ".md"
  a.click()
  a.remove()

  URL.revokeObjectURL(url)
}

async function duplicateNote(){
  excludeClick.value = true

  await api.createNote(props.title, props.content, props.tag)

  const response = await api.getNotes()
  const notes = response.content.notes
  store.notes = notes
}
 
// TODO: aggiungere il modal di conferma
async function deleteNote() {
  excludeClick.value = true

  await api.deleteNote(props.id)
  
  store.notes = store.notes.filter(note => note.id !== props.id)
}

// Mobile touch handlers 
// TODO: aggiungere il pulsante export
function startTouch(event) {
  const touch = event.touches[0]
  pressStartTime.value = Date.now()
  longPress.value = true

  setTimeout(() => {
    if (longPress.value) {
      showButtons.value = true
      excludeClick.value = true
    }
  }, 300)

  if (touch.clientX > (window.innerWidth * 2) / 3) {
    position.value = { x: touch.clientX - 70, y: touch.clientY - 180 }
    mirrorButtons.value = true
  } else {
    position.value = { x: touch.clientX - 20, y: touch.clientY - 180 }
  }
}

function handleTouch(event) {
  longPress.value = false
  const touch = event.touches[0]
  const newPosX = touch.clientX
  const newPosY = touch.clientY

  const editButtonPosX = editButton.value.getBoundingClientRect().left
  const editButtonPosY = editButton.value.getBoundingClientRect().top
  const deleteButtonPosX = deleteButton.value.getBoundingClientRect().left
  const deleteButtonPosY = deleteButton.value.getBoundingClientRect().top

  if (newPosX > editButtonPosX && newPosX < editButtonPosX + 48 && newPosY > editButtonPosY && newPosY < editButtonPosY + 48) selected.value = "export"
  else if (newPosX > deleteButtonPosX && newPosX < deleteButtonPosX + 48 && newPosY > deleteButtonPosY && newPosY < deleteButtonPosY + 48) selected.value = "delete"
  else selected.value = null
}

function endTouch() {
  if (selected.value === "export") exportNote()
  else if (selected.value === "delete") deleteNote()

  longPress.value = false
  showButtons.value = false
  mirrorButtons.value = false
  selected.value = null
}
</script>

<style scoped>
.transition-transform {
  transition: transform 0.2s;
}
</style>
