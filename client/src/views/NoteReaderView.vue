<template>
  <Navbar viewTitle="Nota" :titleColor="classColor" :backButton="true"></Navbar>

  <div class="ml-5 mr-5 h-[calc(100vh-108px)] rounded-2xl lg:h-[calc(100vh-132px)] dark:bg-neutral-800">
    <div class="relative ml-[18px] mr-[18px] pt-5 h-auto">
      <input name="title" id="title" class="peer block w-full appearance-none rounded-xl border-2 border-neutral-700 bg-neutral-800 p-2.5 pl-3.5 pr-3.5 text-xl font-semibold outline-0" placeholder="" :value="note.title"/>
      <label for="title" class="pear-focus:text-neutral-300 absolute start-1 top-2 z-10 mt-2.5 origin-[0] -translate-y-3 translate-x-1.5 scale-75 transform rounded-xl bg-neutral-800 px-2 text-xl font-medium duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-3 peer-focus:translate-x-1.5 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">Titolo</label>
    </div>
    <div class="relative ml-[18px] mr-[18px] pt-5 h-[calc(100%-92px)]">
      <textarea name="content" id="content" class="peer h-full block w-full text-neutral-400 appearance-none rounded-xl border-2 border-neutral-700 bg-neutral-800 p-2.5 pl-3.5 pr-3.5 text-sm font-semibold outline-0" placeholder="" :value="note.content"></textarea>
      <label for="content" class="pear-focus:text-neutral-300 absolute start-1 top-2 z-10 mt-2.5 origin-[0] -translate-y-3 translate-x-1.5 scale-75 transform rounded-xl bg-neutral-800 px-2 text-xl font-medium duration-300 peer-placeholder-shown:top-9 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-3 peer-focus:translate-x-1.5 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">Testo</label>
    </div>
    
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import { useMainStore } from "@/store"
import {useRoute} from "vue-router"

export default {
  name: "NoteReaderView",
  components: {
    Navbar,
  },
  props: {},
  setup() {
    const classColor = "text-amber-300 dark:text-amber-400"
    const store = useMainStore()
    const route = useRoute()

    const note = store.user.notes.filter(note => note.id == route.params.id)[0]

    return { classColor, note }
  },
  methods: {},
}
</script>

<style scoped>
textarea {
  resize: none;
}
</style>