<template>
  <div class="fixed inset-x-0 top-0 z-10">
    <Navbar viewTitle="Note" :titleColor="classColor" :backButton="true"></Navbar>
  </div>
  <div class="pt-[88px] lg:pt-[92px] overflow-auto ml-5 mr-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px] lg:gap-4 lg:ml-28 lg:mr-28 2xl:gap-6 2xl:ml-36 2xl:mr-36">
    <Note v-for="note in notes" :id="note.id" :title="note.title" :content="note.content" :tag="note.tag"></Note>
    <div class="h-4"></div>
  </div>
  
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import Note from "@/components/Note.vue"
import { useMainStore } from "@/store"

export default {
  name: "NotesView",
  components: {
    Navbar,
    Note,
  },
  setup() {
    const classColor = "text-amber-300 dark:text-amber-400"
    const store = useMainStore()

    const notes = store.user.notes 

    return { classColor, notes }
  },
  methods: {},
}
</script>
