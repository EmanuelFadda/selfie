<template>
  <div class="flex min-h-screen flex-col">
    <Navbar viewTitle="Pomodoro" :titleColor="classColor" :backButton="true"></Navbar>
    <div class="flex flex-col items-center justify-center ml-5 mr-5 lg:ml-28 lg:mr-28 2xl:ml-36 2xl:mr-36">
      
      <!-- Pomodoro/Break tabs -->
      <div>
        <span class="inline-flex items-center rounded-s-lg px-2 py-1 text-sm font-medium border-2 border-e-1" :class="classBreakTomato[breakSwitch][0]">Pomodoro</span>
        <span class="inline-flex items-center rounded-e-lg px-5 py-1 text-sm font-medium border-2 border-s-1" :class="classBreakTomato[breakSwitch][1]">Break</span>
      </div>      

      <!-- Timer con FlipDigit -->
      <div class="flex items-center justify-center my-8">
        <FlipDigit :value="Math.floor(timer.minutes.value / 10)" />
        <FlipDigit :value="timer.minutes.value % 10" />
        <div class="text-6xl font-bold text-red-500 mx-2 mb-3">:</div>
        <FlipDigit :value="Math.floor(timer.seconds.value / 10)" />
        <FlipDigit :value="timer.seconds.value % 10" />
      </div>

      <p>{{ timer.isRunning.value ? 'Running' : 'Not running' }}</p>
      <button @click="timer.start()">Start</button>
      <button @click="timer.pause()">Pause</button>
      <button @click="timer.resume()">Resume</button>
      <button @click="restartFive()">Restart</button>
    </div>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue"
import FlipDigit from "../components/FlipDigit.vue"   // <--- aggiunto
import api from "@/api"
import { onMounted, ref, watchEffect } from "vue"
import { useMainStore } from "@/store"
import { useTimer } from "vue-timer-hook"

const time = new Date()
time.setSeconds(time.getSeconds() + 600) // 10 minutes timer
const timer = useTimer(time, false)

const restartFive = () => {
  const time = new Date()
  time.setSeconds(time.getSeconds() + 300)
  timer.restart(time)
}

const classColor = "text-red-400 dark:text-red-500"
const store = useMainStore()
const breakSwitch = ref(0)
const classBreakTomato = ref([
  ["bg-red-400/10 text-red-400 border-red-400/20 dark:bg-red-400/10 dark:text-red-400 dark:border-red-400/20", "bg-gray-50 text-gray-600 border-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:border-gray-400/20"], 
  ["bg-gray-50 text-gray-600 border-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:border-gray-400/20", "bg-red-400/10 text-red-400 border-red-400/20 dark:bg-red-400/10 dark:text-red-400 dark:border-red-400/20"]
])

onMounted(async () => {
  const tomatoes_response = await api.getTomatoes()
  const tomato_sessions = tomatoes_response.content.tomato_sessions
  store.tomato_sessions = tomato_sessions
  
  watchEffect(async () => {
    if (timer.isExpired.value) {
      console.warn("IsExpired")
    }
  })
})
</script>