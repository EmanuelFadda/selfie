<template>
  <!-- Blurred background for modal -->
  <div v-if="state[0]" class="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm transition-opacity duration-300"></div>

  <!-- Celebration Modal -->
  <div v-if="state[0]" class="relative z-30" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 z-30 w-screen overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-5 text-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-2xl text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div class="select-none bg-neutral-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-200 sm:mx-0 sm:size-10">
                <!-- Celebration icon -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="size-6 text-green-700">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
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
            <button @click="cancelFunction" type="button" class="inline-flex w-full justify-center rounded-lg px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-slate-50 hover:text-neutral-800">
              Chiudi
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "TomatoCelebrateModal"
})

defineProps({
  cancelFunction: {
    type: Function,
    required: true
  },
  state: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})
</script>