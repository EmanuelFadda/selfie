<template>
  <div class="fixed inset-x-0 top-0 z-10">
    <Navbar viewTitle="Note" :titleColor="classColor" name="Nome" surname="Cognome" :backButton="true"></Navbar>
  </div>
  <div class="pt-[84px] overflow-auto ml-5 mr-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px] lg:ml-20 lg:mr-20 lg:gap-4 xl:ml-28 xl:mr-28 2xl:gap-6 2xl:ml-36 2xl:mr-36">
    <Note id="1" title="Prova pls" content="ciao questa è una nota un po più lunga wowww!!! bla bla bla"></Note>
    <Note id="2" title="Prova2 pls" content="nota corta"></Note>
    <Note id="3" title="Prova pls ancora" content="nota corta"></Note>
    <Note id="4" title="Prova per layout" content="nota corta"></Note>
    <Note id="5" title="Prova pls ancora" content="nota corta"></Note>
    <Note id="6" title="Prova per layout" content="nota corta"></Note>
    <Note id="7" title="Prova per layout" content="nota corta"></Note>
    <Note id="8" title="Prova pls ancora" content="nota corta"></Note>
    <Note id="9" title="Prova per layout" content="nota corta"></Note>
    <div class="h-4"></div>
  </div>
  
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import Note from "@/components/Note.vue"

export default {
  name: "NotesView",
  components: {
    Navbar,
    Note,
  },
  setup() {
    const classColor = "text-amber-300 dark:text-amber-400"

    return { classColor }
  },
  methods: {},
}
</script>
