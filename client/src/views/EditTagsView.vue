<!-- !!! Va fatto responsive e light mode !!! + refactoring del codice -->

<template>
  <div class="flex min-h-screen flex-col">
    <Navbar viewTitle="Modifica tags" :backButton="true"></Navbar>

    <div class="-mt-2.5 ml-2.5 grid grid-cols-1">
      <div v-for="(tag, index) in mappedTags" class="border-b border-neutral-600 py-3 pl-2.5">
        <div class="flex items-center justify-between">
          <!-- Tag -->
          <span class="my-2 inline-flex select-none items-center rounded-lg px-2 py-1 text-xs font-medium ring-1 ring-inset" :class="tag.color">{{ tag.name }}</span>

          <!-- Buttons -->
          <div class="flex">
            <!-- Edit -->
            <svg v-if="!mappedTags[index].edit" @click="handleEdit(index)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="mr-3 size-[22px]">
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            <!-- Save -->
            <svg v-if="mappedTags[index].edit" @click="save(index)" :id="`save-${index}`" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="mr-3 size-[22px]">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <!-- Cancel -->
            <svg v-if="mappedTags[index].edit" @click="cancel(index)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="mr-3 size-[22px]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            <!-- Delete -->
            <svg xmlns="http://www.w3.org/2000/svg" @click="deleteModal = !deleteModal" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="mr-5 size-[22px]">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </div>
        </div>

        <!-- Blurred overlay for modal -->
        <div v-if="deleteModal" class="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"></div>

        <!-- Modal for deleting confirmation -->
        <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" v-if="deleteModal">
          <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-5 text-center sm:p-0">
              <div class="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-neutral-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 select-none">
                  <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                      <svg class="size-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                      </svg>
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 class="text-base font-semibold" id="modal-title">Elimina tag</h3>
                      <div class="mt-2">
                        <p class="text-sm">Sei sicuro di voler eliminare questo tag? Eliminando il tag, tutte le note a cui è associato non avranno più alcun tag.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-neutral-800 px-4 py-3 pb-5 sm:flex sm:flex-row-reverse sm:px-6">
                  <button @click="deleteTag(index)" type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold hover:bg-red-400 sm:ml-3 sm:w-auto">Elimina</button>
                  <button @click="deleteModal = false" type="button" class="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-gray-300 ring-inset hover:text-neutral-800 hover:bg-slate-50 sm:mt-0 sm:w-auto">Annulla</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="mappedTags[index].edit" class="relative mb-2 mr-5 mt-2 grid grid-cols-2 items-center gap-x-3 gap-y-2">
          <!-- Input field for tag' name -->
          <div class="relative -mt-4 pt-6">
            <label :for="'name-' + index" class="pear-focus:text-neutral-300 absolute start-1 top-2 z-10 mt-3 origin-[0] -translate-y-1.5 scale-75 transform rounded-xl bg-neutral-800 px-2 font-medium duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100">Nome</label>
            <input :name="'name-' + index" :id="'name-' + index" class="peer block w-full appearance-none rounded-xl border-2 border-neutral-700 bg-neutral-800 px-2.5 py-3 font-semibold outline-0" placeholder="" v-model="tag.name" />
          </div>

          <!-- Input field for tag' colors -->
          <div class="relative -mt-4 pt-6">
            <div class="absolute start-1 top-2 z-10 mt-3 origin-[0] -translate-y-1.5 scale-75 rounded-xl bg-neutral-800 px-2 font-medium text-neutral-300">Tag</div>
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
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import { useMainStore } from "@/store"
import { ref } from "vue"

export default {
  name: "EditTagsView",
  components: {
    Navbar,
  },
  setup() {
    const store = useMainStore()
    const editTag = ref(false)

    const tags = store.user.tags

    const colorsMap = {
      grey: "bg-gray-50 text-gray-600 ring-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/20",
      red: "bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20",
      yellow: "bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-500 dark:ring-yellow-400/20",
      green: "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20",
      blue: "bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30",
      indigo: "bg-indigo-50 text-indigo-700 ring-indigo-700/10 dark:bg-indigo-400/10 dark:text-indigo-400 dark:ring-indigo-400/30",
      purple: "bg-purple-50 text-purple-700 ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30",
      pink: "bg-pink-50 text-pink-700 ring-pink-700/10 dark:bg-pink-400/10 dark:text-pink-400 dark:ring-pink-400/20",
    }

    const mappedTags = ref(tags.map((tag) => ({ 
      edit: false, 
      original_color: tag.color, 
      original_name: tag.name, 
      name: tag.name, 
      colorsFilter: [[tag.color, colorsMap[tag.color]]], 
      color: colorsMap[tag.color] 
    })))
    const tagName = ref(mappedTags.value.map((tag) => tag.name))

    const deleteModal = ref(false)

    return { mappedTags, colorsMap, editTag, tagName, deleteModal }
  },
  methods: {
    handleEdit(index) {
      const thisTag = this.mappedTags[index]
      thisTag.edit = !thisTag.edit
    },
    cancel(index) {
      const thisTag = this.mappedTags[index]

      thisTag.edit = !thisTag.edit

      thisTag.name = thisTag.original_name
      thisTag.colorsFilter = [[thisTag.original_color, this.colorsMap[thisTag.original_color]]]
      thisTag.color = this.colorsMap[thisTag.original_color]
    },
    save(index) {
      const thisTag = this.mappedTags[index]
      thisTag.color = thisTag.colorsFilter[0][1]

      if (thisTag.name.length > 0 && thisTag.colorsFilter.length === 1) {
        fetch("http://localhost:3000/edit_tag", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            old_name: thisTag.original_name,
            new_name: thisTag.name,
            new_color: thisTag.colorsFilter[0][0],
          }),
        })

        const save = document.getElementById(`save-${index}`)

        save.classList.add("stroke-green-500")
        save.setAttribute("stroke-width", "3")

        setTimeout(() => {
          thisTag.edit = !thisTag.edit
        }, 800)
      } else {
        const save = document.getElementById(`save-${index}`)
        thisTag.color = this.colorsMap[thisTag.original_color]

        save.classList.add("stroke-red-500")
        save.setAttribute("stroke-width", "3")

        setTimeout(() => {
          save.classList.remove("stroke-red-500")
          save.setAttribute("stroke-width", "1.8")
        }, 800)
      }
    },
    handleColor(index, color) {
      const thisTag = this.mappedTags[index]

      // If the color is already selected, show every color 
      // else show only the selected color
      if (thisTag.colorsFilter.length === 1) thisTag.colorsFilter = Object.entries(this.colorsMap)
      else thisTag.colorsFilter = [[color, this.colorsMap[color]]]
    },
    deleteTag(index) {
      const thisTag = this.mappedTags[index]

      fetch("http://localhost:3000/delete_tag", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name_tag: thisTag.name,
        }),
      })

      this.mappedTags.splice(index, 1)

     
      fetch("http://localhost:3000/get_notes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          data.content.notes.forEach((note) => (
            fetch("http://localhost:3000/edit_note", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
              },
              body: JSON.stringify({
                id_note: note.id,
                new_title: note.title,
                new_content: note.content,
                new_tag: note.tag === thisTag.name ? "" : note.tag,
              }),
            })
          ))
        })

      this.deleteModal = false
    }
  },
}
</script>

<style scoped>
::-webkit-scrollbar {
  height: 0px;
}
</style>
