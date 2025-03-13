<template>
  <div class="min-h-screen flex" style="flex-flow: column;">
    <nav class="p-4 pt-5 pb-5 mb-7 bg-gray-800 text-gray-200 text-3xl">
      Logo
    </nav>

    <div class="flex-auto bg-blue-600 ml-5 mr-5 mb-4 text-center">Calendario</div>
    
  
    <div class="grid grid-cols-2  grid-rows-1 gap-4 text-center">
      <div class="ml-5 mb-7 aspect-square bg-yellow-400">Note</div>
      <div class="mr-5 mb-7 aspect-square bg-red-600">Pomodoro</div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'HomeView',
  components: {
  }
}
</script>
