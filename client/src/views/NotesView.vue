<template>
  <div class="fixed inset-x-0 top-0 z-10">
    <Navbar viewTitle="Note" :titleColor="classColor" :backButton="true" :myButton="myButton"></Navbar>
  </div>
  <div class="pt-[88px] lg:pt-[92px] overflow-auto ml-5 mr-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px] lg:gap-4 lg:ml-28 lg:mr-28 2xl:gap-6 2xl:ml-36 2xl:mr-36">
    <NotePreview v-for="note in store.notes" :id="note.id" :title="note.title" :content="note.content" :tag="note.tag"></NotePreview>
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

onMounted(async () => {
  const notes_response = await api.getNotes()
  const notes = notes_response.content.notes
  store.notes = notes
})
</script>
