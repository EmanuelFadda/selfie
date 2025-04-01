<template>
  <div class="fixed inset-x-0 top-0 z-10">
    <Navbar viewTitle="Note" :titleColor="classColor" name="Nome" surname="Cognome" :backButton="true"></Navbar>
  </div>
  <div class="pt-[84px] lg:pt-[88px] pt- overflow-auto ml-5 mr-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px] lg:ml-20 lg:mr-20 lg:gap-4 xl:ml-28 xl:mr-28 2xl:gap-6 2xl:ml-36 2xl:mr-36">
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
