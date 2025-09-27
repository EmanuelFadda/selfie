<template>
  <div class="flex min-h-screen flex-col" >
    <Navbar viewTitle="Pomodoro" :titleColor="classColor" :backButton="true"></Navbar>
    <div class="flex flex-col items-center justify-center ml-5 mr-5 lg:ml-28 lg:mr-28 2xl:ml-36 2xl:mr-36">
      
      <div>
        <span class="inline-flex items-center rounded-s-lg px-2 py-1 text-sm font-medium border-2 border-e-1" :class="classBreakTomato[breakSwitch][0]">Pomodoro</span>
        <span class="inline-flex items-center px-5 py-1 text-sm font-medium border-2 border-s-1 border-e-1" :class="classBreakTomato[breakSwitch][1]">Break</span>
        <span class="inline-flex items-center rounded-e-lg px-2 py-1 text-sm font-medium border-2 border-s-1" :class="classBreakTomato[breakSwitch][2]">Long Break</span>
      </div>      

      <div class="flex items-center justify-center my-8">
        <FlipDigit :value="Math.floor(timer.minutes.value / 10)" />
        <FlipDigit :value="timer.minutes.value % 10" />
        <div class="text-6xl font-bold text-red-500 mx-2 mb-3">:</div>
        <FlipDigit :value="Math.floor(timer.seconds.value / 10)" />
        <FlipDigit :value="timer.seconds.value % 10" />
      </div>

      <div class="flex gap-x-4">
        <button @click="toggleTimer()" class="rounded-md border-2 px-6 py-0.5">
          <svg v-if="!timer.isRunning.value" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
          </svg>
        </button>
        <button @click="restartCurrentInterval()" class="rounded-md border-2 px-1 py-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
      </div>
    </div>
    <div class="mt-8">
        <div class="pt-2.5 px-2 mx-2 border-neutral-600 border-t-2 " v-for="(session, index) in store.tomato_sessions" :key="session.id">
          <div class="flex gap-x-2 items-center">
            <p class="font-bold text-xl mb-0.5">{{ session.name }}</p>
            <button
              @click="selectSession(index)"
              :class="index === activeSessionIndex ? 'inline-flex items-center rounded-2xl my-1 px-3 py-0.5 text-xs font-semibold border-2 border-red-400 bg-red-400/10 text-red-400 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-400' : 'inline-flex items-center rounded-2xl my-1 px-3 py-0.5 text-xs font-semibold border-2 border-gray-400 bg-gray-200/10 text-gray-600 dark:border-gray-600 dark:bg-gray-400/10 dark:text-gray-400'"
            >
              {{ index === activeSessionIndex ? "Attivo" : "Seleziona" }}
            </button>
          </div>
          <p>Tempo: {{ session.time.tomato }}/{{ session.time.short_break }}/{{ session.time.long_break }}</p>
          <p class="mb-2.5">Completate: {{ session.done }}/{{ session.rep_tomato }}</p>
        </div>
    </div>
    <TomatoCelebrateModal
      :state="showCelebrateModal"
      :title="celebrateTitle[0]"
      :message="celebrateMessage[0]"
      :cancelFunction="() => showCelebrateModal[0] = false"
    />
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue"
import FlipDigit from "../components/FlipDigit.vue" 
import TomatoCelebrateModal from "../components/TomatoCelebrateModal.vue"
import api from "@/api"
import { onMounted, ref, watchEffect, watch } from "vue"
import { useMainStore } from "@/store"
import { useTimer } from "vue-timer-hook"

const store = useMainStore()

const activeSessionIndex = ref(0)
const breakSwitch = ref(0) // 0: Pomodoro, 1: Short Break, 2: Long Break
const shortBreaksCount = ref(0)

const showCelebrateModal = ref([false])
const celebrateTitle = ref([""])
const celebrateMessage = ref([""])

const classColor = "text-red-400 dark:text-red-500"
const classBreakTomato = ref([
  [
    "bg-red-400/10 text-red-400 border-red-400/20 dark:bg-red-400/10 dark:text-red-400 dark:border-red-400/20",
    "bg-gray-50 text-gray-600 border-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:border-gray-400/20",
    "bg-gray-50 text-gray-600 border-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:border-gray-400/20"
  ],
  [
    "bg-gray-50 text-gray-600 border-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:border-gray-400/20",
    "bg-red-400/10 text-red-400 border-red-400/20 dark:bg-red-400/10 dark:text-red-400 dark:border-red-400/20",
    "bg-gray-50 text-gray-600 border-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:border-gray-400/20"
  ],
  [
    "bg-gray-50 text-gray-600 border-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:border-gray-400/20",
    "bg-gray-50 text-gray-600 border-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:border-gray-400/20",
    "bg-red-400/10 text-red-400 border-red-400/20 dark:bg-red-400/10 dark:text-red-400 dark:border-red-400/20"
  ]
])

// Initialize timer with default 25 minutes Pomodoro
function getSessionDuration() {
  const session = store.tomato_sessions[activeSessionIndex.value]
  if (!session) return 0
  switch (breakSwitch.value) {
    case 0:
      return session.time.tomato * 60
    case 1:
      return session.time.short_break * 60
    case 2:
      return session.time.long_break * 60
    default:
      return 0
  }
}

let timer = {
  isRunning: ref(false),
  minutes: ref(0),
  seconds: ref(0),
  start: () => {},
  pause: () => {},
  restart: () => {}
}
let hasStarted
let remaining

const toggleTimer = () => {
  if (timer.isRunning.value) {
    remaining.value = timer.minutes.value * 60 + timer.seconds.value
    timer.pause()
    hasStarted.value = true
  } else {
    if (!hasStarted.value) {
      timer.start()
      hasStarted.value = true
    } else {
      const newTime = new Date()
      newTime.setSeconds(newTime.getSeconds() + remaining.value)
      timer.restart(newTime, true)
    }
  }
}

const restartCurrentInterval = (autoStart = false) => {
  const duration = getSessionDuration()
  const newTime = new Date()
  newTime.setSeconds(newTime.getSeconds() + duration)
  remaining.value = duration
  hasStarted.value = false
  timer.restart(newTime, autoStart)
}

function selectSession(index) {
  if (index !== activeSessionIndex.value) {
    activeSessionIndex.value = index
    shortBreaksCount.value = 0
    breakSwitch.value = 0
    restartCurrentInterval()
  }
}

async function moveToNextInterval() {
  if (!store.tomato_sessions.length) {
    timer.pause()
    hasStarted.value = false
    return
  }
  const session = store.tomato_sessions[activeSessionIndex.value]
  if (!session) {
    timer.pause()
    hasStarted.value = false
    return
  }
  if (breakSwitch.value === 0) { 
    session.done = (session.done || 0) + 1
    try {
      await api.editTomato(session.id, session.done, session.name, session.rep_tomato, session.time.tomato, session.time.short_break, session.time.long_break)
    } catch (e) {
      console.error("Failed to update tomato session:", e)
    }
    if (session.done >= session.rep_tomato) {
      celebrateTitle.value[0] = "Sessione completata!"
      celebrateMessage.value[0] = `Hai completato tutte le ripetizioni per "${session.name}". Ottimo lavoro!`
      showCelebrateModal.value[0] = true

      try {
        await api.deleteTomato(session.id)
      } catch (e) {
        console.error("Failed to delete tomato session:", e)
      }

      store.tomato_sessions.splice(activeSessionIndex.value, 1)

      if (store.tomato_sessions.length > 0) {
        activeSessionIndex.value = 0
      } else {
        timer.pause()
        hasStarted.value = false
        return
      }

      shortBreaksCount.value = 0
      breakSwitch.value = 0
      restartCurrentInterval(false)
      return
    }

    shortBreaksCount.value++

    if (shortBreaksCount.value >= 2) {
      breakSwitch.value = 2 
      shortBreaksCount.value = 0
    } else {
      breakSwitch.value = 1 
    }
 
    restartCurrentInterval(false)
  } else {
    breakSwitch.value = 0
    restartCurrentInterval()
    timer.start()
  }
}

onMounted(async () => {
  const tomatoes_response = await api.getTomatoes()
  const tomato_sessions = tomatoes_response.content.tomato_sessions
  store.tomato_sessions = (tomato_sessions || []).filter(session => (session.done || 0) < session.rep_tomato)
  activeSessionIndex.value = 0
  breakSwitch.value = 0
  shortBreaksCount.value = 0

  let timerDuration = store.tomato_sessions && store.tomato_sessions.length > 0 ? getSessionDuration() : 0
  const time = new Date()
  time.setSeconds(time.getSeconds() + timerDuration)
  timer = useTimer(time, false)
  hasStarted = ref(false)
  remaining = ref(timerDuration)

  if (store.tomato_sessions.length > 0) {
    restartCurrentInterval()
  }

  watchEffect(() => {
    if (timer.isExpired.value) {
      moveToNextInterval()
    }
  })
})
</script>