<template>
  <Navbar viewTitle="Note" :titleColor="classColor" :backButton="true"></Navbar>

  <div class="ml-5 mr-5 h-[calc(100vh-108px)] rounded-2xl lg:h-[calc(100vh-132px)] dark:bg-neutral-800">
    <!-- Title -->
    <div class="relative ml-[18px] mr-[18px] pt-5">
      <input name="title" id="title" class="peer block w-full appearance-none rounded-xl border-2 border-neutral-700 bg-neutral-800 p-2.5 pl-3.5 pr-3.5 text-xl font-semibold outline-0" placeholder="" :value="store.currentNote.title || ''" />
      <label for="title" class="pear-focus:text-neutral-300 absolute start-1 top-2 z-10 mt-2.5 origin-[0] -translate-y-3 translate-x-1.5 scale-75 transform rounded-xl bg-neutral-800 px-2 text-xl font-medium duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-3 peer-focus:translate-x-1.5 peer-focus:scale-75 peer-focus:px-2">Titolo</label>
    </div>

    <!-- Content -->
    <div class="relative ml-[18px] mr-[18px] h-[calc(100%-164px)] pt-5">
      <textarea name="content" id="content" class="peer block h-full w-full appearance-none rounded-xl border-2 border-neutral-700 bg-neutral-800 p-2.5 pl-3.5 pr-3.5 text-sm font-semibold text-neutral-400 outline-0" placeholder="" :value="store.currentNote.content || ''"></textarea>
      <label for="content" class="pear-focus:text-neutral-300 absolute start-1 top-2 z-10 mt-2.5 origin-[0] -translate-y-3 translate-x-1.5 scale-75 transform rounded-xl bg-neutral-800 px-2 text-xl font-medium duration-300 peer-placeholder-shown:top-9 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-3 peer-focus:translate-x-1.5 peer-focus:scale-75 peer-focus:px-2">Testo</label>
    </div>

    <!-- Tag -->
    <div class="relative ml-[18px] mr-[18px] pt-5">
      <div class="absolute start-1 top-2 z-10 mt-2.5 origin-[0] -translate-y-3 translate-x-1.5 scale-75 rounded-xl bg-neutral-800 px-2 text-xl font-medium text-neutral-300">Tag</div>
      <div name="tag" id="tag" class="flex h-[52px] space-x-2 w-full rounded-xl border-2 border-neutral-700 bg-neutral-800 p-3 pl-3.5 pr-3.5 text-xl font-semibold overflow-x-auto whitespace-nowrap">
        <span v-for="(tag, index) in store.tagFilter" :id="'tag-' + index" class="relative inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium ring-1 ring-inset" @click="selectBadge(tag.name)" :class="selected === tag.name ? tag.color : 'dark:bg-gray-200/10 dark:text-gray-200 dark:ring-gray-200/10 '">
          {{ tag.name }}
          <svg v-if="selected === tag.name" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3 ml-1 -mr-[2px]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </span>
      </div>
    </div>

  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import { useMainStore } from "@/store"
import { useRoute } from "vue-router"
import { ref } from "vue"

export default {
  name: "NoteReaderView",
  components: {
    Navbar,
  },
  setup() {
    const classColor = "text-amber-300 dark:text-amber-400"
    const store = useMainStore()
    const route = useRoute()
    const token = localStorage.getItem("token")
    const colorsMap = {
      grey: "bg-gray-50 text-gray-600 ring-gray-500/10 dark:bg-grey-400/10 dark:text-grey-400 dark:ring-grey-400/20",
      red: "bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20",
      yellow: "bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-500 dark:ring-yellow-400/20",
      green: "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20",
      blue: "bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30",
      indigo: "bg-indigo-50 text-indigo-700 ring-indigo-700/10 dark:bg-indigo-400/10 dark:text-indigo-400 dark:ring-indigo-400/30",
      purple: "bg-purple-50 text-purple-700 ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30",
      pink: "bg-pink-50 text-pink-700 ring-pink-700/10 dark:bg-pink-400/10 dark:text-pink-400 dark:ring-pink-400/20",
    }
    const selected = ref("")

    
    fetch("http://localhost:3000/get_notes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        store.notes = data.content.notes
        store.user.tags = data.content.tags
        store.currentNote = store.notes.filter((note) => note.id == route.params.id)[0]
        store.tagFilter = store.user.tags.filter((tag) => tag.name == store.currentNote.tag).map((tag) => ({"name": tag.name, "color": colorsMap[tag.color]}))
        selected.value = store.currentNote.tag
      })
    

    return { classColor, store, selected, colorsMap }
  },
  methods: {
    selectBadge (name) {
      if (this.selected === name) { 
        this.selected = ""
        this.store.tagFilter = this.store.user.tags.map((tag) => ({"name": tag.name, "color": this.colorsMap[tag.color]}))  
      }
      else if (this.selected.length >= 0) {
        this.selected = name
        this.store.tagFilter = this.store.tagFilter.filter(tag => tag.name === name)
      }
    }
  },
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
