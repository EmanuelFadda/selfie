<template>
  <!-- Blurred backgroud for modal -->
  <div v-if="state" class="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"></div>

  <!-- Modal for deleting confirmation -->
  <div v-if="state" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-5 text-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-2xl text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div class="select-none bg-neutral-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                <svg class="size-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 class="text-base font-semibold" id="modal-title">{{ title }}</h3>
                <div class="mt-2">
                  <p class="text-sm">{{ message }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-neutral-800 px-6 py-4 pb-5 sm:flex sm:flex-row-reverse sm:pt-1">
            <button @click="deleteFunction" type="button" class="inline-flex w-full justify-center rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold hover:bg-red-400 sm:ml-3 sm:w-auto">Elimina</button>
            <button @click="cancelFunction" type="button" class="mt-3 inline-flex w-full justify-center rounded-lg px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-slate-50 hover:text-neutral-800 sm:mt-0 sm:w-auto">Annulla</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
defineOptions({
  name: "DeleteModal"
})

defineProps({
  deleteFunction: {
    type: Function,
    required: true,
  },
  cancelFunction: {
    type: Function,
    required: true,
  },
  state: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
})

export default {
  name: "DeleteModal",
  props: {
    
  }
}

</script>