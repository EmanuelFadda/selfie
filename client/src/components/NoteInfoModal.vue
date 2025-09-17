<template>
  <!-- Blurred backgroud for modal -->
  <div v-if="state[0]" class="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"></div>

  <!-- Modal for deleting confirmation -->
  <div v-if="state[0]" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-5 text-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-2xl text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div class="select-none bg-neutral-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:size-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-gray-600">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 class="text-base font-semibold" id="modal-title">{{ title }}</h3>
                <div class="mt-2">
                  <p class="text-sm" style="white-space: pre-line">{{ message }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-neutral-800 px-6 py-4 pb-5 sm:flex sm:flex-row-reverse sm:pt-1">
            <button @click="cancelFunction" type="button" class="inline-flex w-full justify-center rounded-lg px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-slate-50 hover:text-neutral-800">Chiudi</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "DeleteModal"
})

defineProps({
  cancelFunction: {
    type: Function,
    required: true,
  },
  state: {
    type: Array,
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
</script>