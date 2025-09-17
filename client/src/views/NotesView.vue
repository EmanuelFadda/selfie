<template>
  <div class="fixed inset-x-0 top-0 z-10">
    <Navbar viewTitle="Note" :titleColor="classColor" :backButton="true" :myButton="myButton" :myDropdown="myDropdown" :dropdownItems="dropdownItems"></Navbar>
  </div>
  <div class="pt-[88px] lg:pt-[92px] overflow-auto ml-5 mr-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px] lg:gap-4 lg:ml-28 lg:mr-28 2xl:gap-6 2xl:ml-36 2xl:mr-36">
    <NotePreview v-for="(note, index) in store.notes" :id="note.id" :title="note.title" :content="note.content" :tag="note.tag" :created="note.created" :modified="note.modified" :state="note.infoStatus"></NotePreview>
    <div class="h-[70px] sm:col-span-2 sm:h-[56px] lg:col-span-3"></div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue"
import NotePreview from "@/components/NotePreview.vue"
import router from "@/router"
import { useRoute } from "vue-router"
import { onMounted } from "vue"
import { useMainStore } from "@/store"
import api from "@/api"
import { watch } from "vue"

const classColor = "text-amber-300 dark:text-amber-400"
const store = useMainStore()
const route = useRoute()

const myButton = {
  exist: true,
  paths: ["M12 4.5v15m7.5-7.5h-15"],
  function: () => {
    router.push(`${route.path}/new`)
  },
}

const myDropdown = {
  exist: true,
  paths: ["M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"],
}

const dropdownItems = [
  {
    title: "Alfabetico",
    paths: ["M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"],
    function: () => {},
  },
  {
    title: "Data di creazione",
    paths: ["M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"],
    function: () => {},
  },
  {
    title: "Data di modifica",
    paths: ["m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"],
    function: () => {},
  },
  {
    title: "Lunghezza contenuto",
    paths: ["M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"],
    function: () => {},
  }
]

onMounted(async () => {
  const notes_response = await api.getNotes()
  let notes = notes_response.content.notes
  notes = notes.map(note => ({ ...note, infoStatus: [false] }))
  store.notes = notes

  console.log(store.notes[0])
  console.log(notes[0])
  console.log(store.notes[0].infoStatus)
})

watch(
  () => store.notes,
  (newNotes) => {
    newNotes.forEach(note => {
      if (!note.infoStatus) note.infoStatus = [false]
    })
  },
  { deep: true, immediate: true }
)
</script>
