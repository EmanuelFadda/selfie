<template>
  <Navbar viewTitle="Note" :titleColor="classColor" :backButton="true" :myButton="myButton" :backRoute="`/${store.user.username}/note`"></Navbar>

  <div class="ml-5 mr-5 h-[calc(100vh-108px)] rounded-2xl lg:h-[calc(100vh-132px)] dark:bg-neutral-800">
    <!-- Title -->
    <div class="relative ml-[18px] mr-[18px] pt-5">
      <input name="title" id="title" class="peer block w-full appearance-none rounded-xl border-2 border-neutral-700 bg-neutral-800 p-2.5 pl-3.5 pr-3.5 text-xl font-semibold outline-0" placeholder="" v-model="currentNote.title" />
      <label for="title" class="pear-focus:text-neutral-300 absolute start-1 top-2 z-10 mt-2.5 origin-[0] -translate-y-3 translate-x-1.5 scale-75 transform rounded-xl bg-neutral-800 px-2 text-xl font-medium duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-3 peer-focus:translate-x-1.5 peer-focus:scale-75 peer-focus:px-2">Titolo</label>
    </div>

    <!-- Content -->
    <div class="relative ml-[18px] mr-[18px] h-[calc(100%-164px)] pt-5">
      <textarea name="content" id="content" class="peer block h-full w-full appearance-none rounded-xl border-2 border-neutral-700 bg-neutral-800 p-2.5 pl-3.5 pr-3.5 text-sm font-semibold text-neutral-400 outline-0" placeholder="" v-model="currentNote.content"></textarea>
      <label for="content" class="pear-focus:text-neutral-300 absolute start-1 top-2 z-10 mt-2.5 origin-[0] -translate-y-3 translate-x-1.5 scale-75 transform rounded-xl bg-neutral-800 px-2 text-xl font-medium duration-300 peer-placeholder-shown:top-9 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-3 peer-focus:translate-x-1.5 peer-focus:scale-75 peer-focus:px-2">Testo</label>
    </div>

    <!-- Tag -->
    <div class="relative ml-[18px] mr-[18px] pt-5">
      <div class="absolute start-1 top-2 z-10 mt-2.5 origin-[0] -translate-y-3 translate-x-1.5 scale-75 rounded-xl bg-neutral-800 px-2 text-xl font-medium text-neutral-300">Tag</div>
      <div name="tag" id="tag" class="flex h-[52px] space-x-2 w-full rounded-xl border-2 border-neutral-700 bg-neutral-800 p-3 pl-3.5 pr-3.5 text-xl font-semibold overflow-x-auto whitespace-nowrap">
        <span v-for="(tag, index) in tagFilter" :id="'tag-' + index" class="relative inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium ring-1 ring-inset" @click="selectBadge(tag.name)" :class="selected === tag.name ? tag.color : 'dark:bg-gray-200/10 dark:text-gray-200 dark:ring-gray-200/10 '">
          {{ tag.name }}
          <svg v-if="selected === tag.name" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3 ml-1 -mr-[2px]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </span>
      </div>
    </div>

  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue"
import { useMainStore } from "@/store"
import { useRoute } from "vue-router"
import router from "@/router"
import { ref, onMounted } from "vue"
import api from "@/api"

const store = useMainStore()
const route = useRoute()

const colorsMap = store.colorsMap
const classColor = "text-amber-300 dark:text-amber-400"
const selected = ref("")
const tagFilter = ref([])
const currentNote = ref({})

// bottone che ti permette sia di aggiungere se siamo "/username/new" oppure la crea "/username/idNota"
const myButton = {
  exist: true,
  paths: ["m4.5 12.75 6 6 9-13.5"],
  function: async () => {
    if (currentNote.value.id === "new") {
      await api.createNote(currentNote.value.title, currentNote.value.content, selected.value, currentNote.value.created, new Date().toISOString())
    } else {
      await api.editNote(currentNote.value.id, currentNote.value.title, currentNote.value.content, selected.value, new Date().toISOString())
    }

    //refresh
    const response = await api.getNotes()
    const notes = response.content.notes
    store.notes = notes

    router.go(-1)
  },
}

onMounted(async () => {
  if (route.params.id === "new") {
    currentNote.value = {
      id: "new",
      title: "",
      content: "",
      tag: "",
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
    }
  } else {
    const response = await api.getNotes()
    const notes = response.content.notes
    store.notes = notes

    currentNote.value = store.notes.filter((note) => note.id == route.params.id)[0]
  }

  const response = await api.getTags()
  const tags = response.content.tags
  store.tags = tags
  tagFilter.value = tags

  if (currentNote.value.tag !== "") tagFilter.value = store.tags.filter((tag) => tag.name == currentNote.value.tag)
  
  tagFilter.value = tagFilter.value.map((tag) => ({"name": tag.name, "color": colorsMap[tag.color]}))
  selected.value = currentNote.value.tag
})

function selectBadge(name) {
  if (selected.value === name) { 
    selected.value = ""
    tagFilter.value = store.tags.map((tag) => ({"name": tag.name, "color": colorsMap[tag.color]}))  
  }
  else if (selected.value.length >= 0) {
    selected.value = name
    tagFilter.value = tagFilter.value.filter(tag => tag.name === name)
  }
}
</script>

<style scoped>
textarea {
  resize: none;
}

::-webkit-scrollbar {
  height:0px;
}
</style>
