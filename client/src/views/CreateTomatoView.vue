<template>
  <Navbar viewTitle="Pomodoro" :titleColor="classColor" :backButton="true" :myButton="myButton" :backRoute="`/${username}/tomato`"></Navbar>

  <div class="ml-5 mr-5 h-[calc(100vh-108px)] rounded-2xl lg:h-[calc(100vh-132px)] bg-neutral-800">

    <div class="flex justify-center pt-7 pb-3">
      <span @click="modeSwitch = 0" class="inline-flex items-center rounded-s-lg px-1 py-[3px] text-sm font-medium border-2 border-e-1" :class="classMode[modeSwitch][0]">Standard</span>
      <span @click="modeSwitch = 1" class="inline-flex items-center rounded-e-lg px-1 py-[3px] text-sm font-medium border-2 border-s-1" :class="classMode[modeSwitch][1]">Personalizzato</span>
    </div>   

    <div class="relative ml-[18px] mr-[18px] pt-5">
      <input name="title" id="title" class="peer block w-full appearance-none rounded-xl border-2 border-neutral-700 bg-neutral-800 p-2.5 pl-3.5 pr-3.5 text-xl font-semibold outline-0" placeholder="" v-model="newTomato.name" />
      <label for="title" class="pear-focus:text-neutral-300 absolute start-1 top-2 z-10 mt-2.5 origin-[0] -translate-y-3 translate-x-1.5 scale-75 transform rounded-xl bg-neutral-800 px-2 text-xl font-medium duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-3 peer-focus:translate-x-1.5 peer-focus:scale-75 peer-focus:px-2">Titolo</label>
    </div>

    <div v-if="modeSwitch === 0">
      <p class="relative justify-self-center pt-6 text-xl font-semibold">Sessioni</p>

      <div class="flex justify-center mt-2.5">
        <button @click="sessionNumber += 1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6 text-slate-200">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
        <span class="ml-[18px] mr-[18px] rounded-xl border-2 border-neutral-700 bg-neutral-800 px-5 py-0.5 text-lg font-semibold outline-0">{{ sessionNumber }}</span>
        <button @click="sessionNumber > 1 ? sessionNumber -= 1 : 0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6 text-slate-200">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
      </div>

      <div class="ml-[18px] pt-6 text-lg font-semibold">
        <p>Tempi calcolati:</p>
        <ul class="list-disc ml-[22px]">
          <li><p>studio -> {{ sessionNumber * 15 }} min</p></li>
          <li><p>totale -> {{ sessionNumber * 15 + ((sessionNumber - 1) - Math.floor((sessionNumber - 1) / 3)) * 5 + Math.floor((sessionNumber - 1) / 3) * 15 }} min</p></li>
        </ul>
      </div>
    </div>
    <div v-else class="ml-[18px] mr-[18px] pt-6 text-lg font-semibold">
      <p class="relative justify-self-center">Inserisci i minuti di studio:</p>
      <div class="flex items-center justify-center gap-x-2 mt-3">
        <input type="number" v-model.number="customStudyTime" min="1" class="py-0.5 w-20 rounded-xl border-2 border-neutral-700 bg-neutral-800 p-2 text-lg" />
        <button @click="calculateOptions" class="bg-red-500 py-0.5 px-1 rounded-xl">Calcola opzioni</button>
      </div>
      <div v-if="options.length > 0" class="mt-5">
        <p>Opzioni migliori:</p>
        <div class="max-h-[calc(100vh-428px)] overflow-y-auto mt-3">
          <ul class="space-y-1.5">
            <li v-for="(opt, index) in options" :key="index">
              <button @click="selectOption(opt, index)"
                :class="['w-full text-base text-left border-2 rounded-xl border-neutral-700 p-2 hover:bg-neutral-700', selectedOptionIndex === index ? 'bg-red-600/30' : '']">
                Pomodoro: {{ opt.pomodoro }}/{{ opt.shortBreak }}<span v-if="opt.longBreak !== undefined">/{{ opt.longBreak }} min</span> ({{ opt.sessions }} sessioni) 
                <span class="font-semibold">Studio -> {{ opt.totalStudyTime }} min, Totale -> {{ opt.totalTimeWithBreaks }} min</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue"
import { useMainStore } from "@/store"
import { ref, watch } from "vue"
import api from "@/api"
import router from "@/router"

const store = useMainStore()
const classColor = "text-red-500"
const username = store.user.username
const modeSwitch = ref(0) // 0: Standard, 1: Personalizzato
const sessionNumber = ref(1)

const customStudyTime = ref(60)
const options = ref([])
const selectedOptionIndex = ref(null)

function calculateOptions() {
  const pomodoroOptions = [10, 15, 20, 25, 30, 45, 60]
  const shortBreakOptions = [5, 10]
  const longBreakOptions = [10, 15, 20, 30]

  let bestDiff = Infinity
  let results = []

  for (let pomodoro of pomodoroOptions) {
    const minSessions = customStudyTime.value > 90 ? 4 : Math.max(3, Math.ceil(customStudyTime.value / pomodoro))
    const maxSessions = minSessions + 2

    for (let sessions = minSessions; sessions <= maxSessions; sessions++) {
      for (let shortBreak of shortBreakOptions) {
        for (let longBreak of longBreakOptions) {
          const totalPomodoroTime = pomodoro * sessions
          let longBreaksCount = sessions >= 4 ? Math.floor(sessions / 4) : 0
          let shortBreaksCount = sessions - 1 - longBreaksCount
          if (sessions < 4) {
            // Always include longBreak key with 0 if sessions < 4
            longBreak = 0
          }
          const totalBreakTime = shortBreaksCount * shortBreak + longBreaksCount * longBreak
          const totalTimeWithBreaks = totalPomodoroTime + totalBreakTime
          const fitDiff = Math.abs(totalPomodoroTime - customStudyTime.value)

          if (fitDiff < bestDiff) {
            bestDiff = fitDiff
            results = []
            results.push({ pomodoro, shortBreak, longBreak, sessions, totalStudyTime: totalPomodoroTime, totalTimeWithBreaks, fitDiff })
          } else if (fitDiff === bestDiff) {
            results.push({ pomodoro, shortBreak, longBreak, sessions, totalStudyTime: totalPomodoroTime, totalTimeWithBreaks, fitDiff })
          }
        }
      }
    }
  }

  results.sort((a, b) => a.totalTimeWithBreaks - b.totalTimeWithBreaks)
  options.value = results.slice(0, 5)
  selectedOptionIndex.value = null
}

function selectOption(opt, index) {
  selectedOptionIndex.value = index
  newTomato.value.time.tomato = opt.pomodoro
  newTomato.value.time.short_break = opt.shortBreak
  newTomato.value.time.long_break = opt.longBreak
  newTomato.value.rep_tomato = opt.sessions
}

const classMode = ref([
  [
    "bg-red-400/10 text-red-400 border-red-400/20",
    "bg-gray-400/10 text-gray-400 border-gray-400/20"
  ],
  [
    "bg-gray-400/10 text-gray-400 border-gray-400/20",
    "bg-red-400/10 text-red-400 border-red-400/20"
  ]
])

const myButton = {
  exist: true,
  paths: ["m4.5 12.75 6 6 9-13.5"],
  function: async () => {
    await api.createTomato(newTomato.value.name, newTomato.value.done, newTomato.value.rep_tomato, newTomato.value.time.tomato, newTomato.value.time.short_break, newTomato.value.time.long_break)

    await api.setMenuContentTomatoes({name: newTomato.value.name, rep_tomato: newTomato.value.rep_tomato, done: newTomato.value.done})

    const response = await api.getTomatoes()
    const tomatoes = response.data
    store.tomato_sessions = tomatoes

    router.go(-1)
  },
}

const newTomato = ref({
  name: "Nuovo Pomodoro",
  time: {
    tomato: 15,
    short_break: 5,
    long_break: 15
  },
  rep_tomato: sessionNumber.value,
  done: 0,
})

watch(sessionNumber, (newVal) => {
  newTomato.value.rep_tomato = newVal
})
</script>