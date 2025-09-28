<template>
  <div class="flex min-h-screen flex-col">
    <Navbar viewTitle="Modifica tags" :backButton="true"></Navbar>

    <div class="-mt-2.5 ml-2.5 lg:ml-28 lg:mr-28">
      <!-- Create new tag -->
      <!-- Add button -->
      <div v-if="!addTag" class="flex items-center justify-center border-b border-neutral-600 py-3 pl-2.5 lg:py-5 lg:pt-6 lg:pl-0">
        <svg @click="addTag = !addTag" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="-ml-1.5 lg:ml-0 size-6 lg:size-7">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>

      <!-- New tag -->
      <div v-if="addTag" class="border-b border-neutral-600 py-3 pl-2.5">
        <div class="flex items-center justify-between">
          <!-- Tag -->
          <span class="my-2 lg:ml-3 inline-flex min-h-6 min-w-5 select-none items-center rounded-lg px-2 py-1 text-xs font-medium ring-1 ring-inset" :class="newTagColor.length !== 1 ? 'bg-gray-200/10 text-gray-200 ring-gray-200/10' : newTagColor[0][1]">{{ newTagName }}</span>

          <!-- Buttons -->
          <div class="flex">
            <!-- Save -->
            <svg xmlns="http://www.w3.org/2000/svg" @click="createTag" id="saveNew" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="mr-3 lg:mr-4 size-[22px] lg:size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <!-- Cancel -->
            <svg xmlns="http://www.w3.org/2000/svg" @click="resetTag" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="mr-5 lg:mr-8 size-[22px] lg:size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        <div class="relative mb-2 mr-5 lg:ml-3 lg:mr-8 mt-2 grid grid-cols-2 items-center gap-x-3 lg:gap-x-4 gap-y-2">
          <!-- Input field for tag's name -->
          <div class="relative -mt-4 pt-6">
            <label for="newtag" class="pear-focus:text-neutral-300 absolute start-1 top-2 z-10 mt-3 origin-[0] -translate-y-1.5 scale-75 transform rounded-xl bg-neutral-800 px-2 font-medium duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100">Nome</label>
            <input name="newtag" id="newtag" class="peer block w-full appearance-none rounded-xl border-2 border-neutral-700 bg-neutral-800 px-2.5 py-3 font-semibold outline-0" placeholder="" v-model="newTagName" />
          </div>

          <!-- Input field for tag's colors -->
          <div class="relative -mt-4 pt-6">
            <div class="absolute start-1 top-2 z-10 mt-3 origin-[0] -translate-y-1.5 scale-75 rounded-xl bg-neutral-800 px-2 font-medium text-neutral-300">Colore</div>
            <div name="tag" id="tag" class="flex h-[52px] w-full space-x-2 overflow-x-auto whitespace-nowrap rounded-xl border-2 border-neutral-700 bg-neutral-800 p-3 pl-3.5 pr-3.5 text-xl font-semibold">
              <span v-for="color in newTagColor" class="relative inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium ring-1 ring-inset" :class="color[1]" @click="filterNewTagColor(color[0])">
                {{ color[0] }}
                <svg v-if="newTagColor.length === 1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="-mr-[2px] ml-1 size-3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tag list -->
      <div v-for="(tag, index) in mappedTags" class="border-b border-neutral-600 py-3 pl-2.5">
        <div class="flex items-center justify-between">
          <!-- Tag -->
          <span class="my-2 lg:ml-3 inline-flex min-h-6 min-w-5 select-none items-center rounded-lg px-2 py-1 text-xs font-medium ring-1 ring-inset" :class="tag.colorsFilter.length !== 1 ? 'bg-gray-200/10 text-gray-200 ring-gray-200/10' : tag.colorsFilter[0][1]">{{ tag.name }}</span>

          <!-- Buttons -->
          <div class="flex">
            <!-- Edit -->
            <svg v-if="!mappedTags[index].edit" @click="editTag(index)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="mr-3 lg:mr-4 size-[22px] lg:size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            <!-- Save -->
            <svg v-if="mappedTags[index].edit" @click="saveTag(index)" :id="`save-${index}`" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="mr-3 lg:mr-4 size-[22px] lg:size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <!-- Cancel -->
            <svg v-if="mappedTags[index].edit" @click="cancel(index)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="mr-3 lg:mr-4 size-[22px] lg:size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            <!-- Delete -->
            <svg xmlns="http://www.w3.org/2000/svg" @click="deleteModal[index] = true" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="mr-5 lg:mr-8 size-[22px] lg:size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </div>
        </div>

        <div v-if="mappedTags[index].edit" class="relative mb-2 mr-5 mt-2 lg:ml-3 lg:mr-8 grid grid-cols-2 items-center gap-x-3 lg:gap-x-4 gap-y-2">
          <!-- Input field for tag' name -->
          <div class="relative -mt-4 pt-6">
            <label :for="'name-' + index" class="pear-focus:text-neutral-300 absolute start-1 top-2 z-10 mt-3 origin-[0] -translate-y-1.5 scale-75 transform rounded-xl bg-neutral-800 px-2 font-medium duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100">Nome</label>
            <input :name="'name-' + index" :id="'name-' + index" class="peer block w-full appearance-none rounded-xl border-2 border-neutral-700 bg-neutral-800 px-2.5 py-3 font-semibold outline-0" placeholder="" v-model="tag.name" />
          </div>

          <!-- Input field for tag' colors -->
          <div class="relative -mt-4 pt-6">
            <div class="absolute start-1 top-2 z-10 mt-3 origin-[0] -translate-y-1.5 scale-75 rounded-xl bg-neutral-800 px-2 font-medium text-neutral-300">Colore</div>
            <div name="tag" id="tag" class="flex h-[52px] w-full space-x-2 overflow-x-auto whitespace-nowrap rounded-xl border-2 border-neutral-700 bg-neutral-800 p-3 pl-3.5 pr-3.5 text-xl font-semibold">
              <span v-for="color in tag.colorsFilter" @click="handleColor(index, color[0])" :id="'tag-' + index" class="relative inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium ring-1 ring-inset" :class="color[1]">
                {{ color[0] }}
                <svg v-if="tag.colorsFilter.length === 1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="-mr-[2px] ml-1 size-3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <DeleteModal :deleteFunction="() => deleteTag(index)" :cancelFunction="() => (deleteModal[index] = false)" :state="deleteModal[index]" title="Elimina tag" message="Sei sicuro di voler eliminare questo tag? Eliminando il tag, tutte le note a cui è associato non avranno più alcun tag."></DeleteModal>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue"
import DeleteModal from "@/components/DeleteModal.vue"
import { ref, onMounted } from "vue"
import api from "@/api"
import { useMainStore } from "@/store"

const store = useMainStore()

const colorsMap = store.colorsMap

const mappedTags = ref([])
const deleteModal = ref([])
const addTag = ref(false)
const newTagName = ref("Nuovo tag")
const newTagColor = ref(Object.entries(colorsMap))

onMounted(async () => {
  const response = await api.getTags()
  const tags = response.content.tags

  mappedTags.value = tags.map(tag => ({
    edit: false,
    original_color: tag.color,
    original_name: tag.name,
    name: tag.name,
    colorsFilter: [[tag.color, colorsMap[tag.color]]],
  }))
  
  deleteModal.value = mappedTags.value.map((_) => false)

  addTag.value = false

  newTagName.value = "Nuovo tag"
  newTagColor.value = Object.entries(colorsMap)
})

function resetTag() {
  // Reset variables for a new tag
  addTag.value = false

  newTagName.value = "Nuovo tag"
  newTagColor.value = Object.entries(colorsMap)
}

function filterNewTagColor(newColor) {
  if (newTagColor.value.length === 1) {
    newTagColor.value = Object.entries(colorsMap)
  } else {
    newTagColor.value = [[newColor, colorsMap[newColor]]]
  }
}

async function createTag() {
  // Check if the tag name is not empty and the color is selected
  if (newTagName.value.length > 0 && newTagColor.value.length === 1) {
    // Create the new tag
    await api.createTag(newTagName.value, newTagColor.value[0][0])

    // Visual feedback for save (success)
    const save = document.getElementById("saveNew")

    save.classList.add("stroke-green-500")
    save.setAttribute("stroke-width", "3")
  
    setTimeout(() => {
      save.classList.remove("stroke-green-500")
      save.setAttribute("stroke-width", "1.8")

      // Add the new tag to the list
      mappedTags.value.push({
        edit: false,
        original_color: newTagColor.value[0][0],
        original_name: newTagName.value,
        name: newTagName.value,
        colorsFilter: [[newTagColor.value[0][0], colorsMap[newTagColor.value[0][0]]]],
      })

      // Reset variables for a new tag
      newTagName.value = "Nuovo tag"
      newTagColor.value = Object.entries(colorsMap)

      // Close add tag section
      addTag.value = false
    }, 800)
  } else { 
    // Visual feedback for save(error)
    const save = document.getElementById("saveNew")

    save.classList.add("stroke-red-500")
    save.setAttribute("stroke-width", "3")

    setTimeout(() => {
      save.classList.remove("stroke-red-500")
      save.setAttribute("stroke-width", "1.8")
    }, 800)
  }
}

function editTag(index) {
  // Show the edit section for the tag
  const thisTag = mappedTags.value[index]
  thisTag.edit = !thisTag.edit
}
    
function cancel(index) {
  // Reset the tag to its original state
  const thisTag = mappedTags.value[index]

  thisTag.edit = !thisTag.edit

  thisTag.name = thisTag.original_name
  thisTag.colorsFilter = [[thisTag.original_color, colorsMap[thisTag.original_color]]]
}

async function saveTag(index) {
  const thisTag = mappedTags.value[index]

  // Check if the tag name is not empty and the color is selected
  if (thisTag.name.length > 0 && thisTag.colorsFilter.length === 1) {
    await api.editTag(thisTag.original_name, thisTag.name, thisTag.colorsFilter[0][0])

    const tags_response = await api.getTags()
    const tags = tags_response.content.tags
    store.tags = tags


    const response = await api.getNotes()
    const notes = response.content.notes

    notes.forEach(note =>
      api.editNote(note.id, note.title, note.content, thisTag.name)
    )

    // Visual feedback for save (success)
    const save = document.getElementById(`save-${index}`)

    save.classList.add("stroke-green-500")
    save.setAttribute("stroke-width", "3")

    setTimeout(() => {
      thisTag.edit = !thisTag.edit
    }, 800)
  } else {
    // Visual feedback for save (error)
    const save = document.getElementById(`save-${index}`)

    save.classList.add("stroke-red-500")
    save.setAttribute("stroke-width", "3")

    setTimeout(() => {
      save.classList.remove("stroke-red-500")
      save.setAttribute("stroke-width", "1.8")
    }, 800)
  }
}

async function deleteTag(index) {
  const thisTag = mappedTags.value[index]

  await api.deleteTag(thisTag.name)

  mappedTags.value.splice(index, 1)

  const response = await api.getNotes()
  const notes = response.content.notes

  notes.forEach(note =>
    api.editNote(note.id, note.title, note.content, note.tag === thisTag.name ? "" : note.tag)
  )
    
  deleteModal.value[index] = false
}

function handleColor(index, color) {
  const thisTag = mappedTags.value[index]

  // If the color is already selected, show every color
  // else show only the selected color
  if (thisTag.colorsFilter.length === 1) thisTag.colorsFilter = Object.entries(colorsMap)
  else thisTag.colorsFilter = [[color, colorsMap[color]]]
}
</script>

<style scoped>
::-webkit-scrollbar {
  height: 0px;
}
</style>
