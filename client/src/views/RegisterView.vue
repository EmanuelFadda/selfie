<template>
  <div class="flex min-h-screen w-screen items-center justify-center">
    <div class="form-shadow dark:form-shadow w-full rounded-xl max-sm:min-h-screen sm:max-w-md">
      <div class="mb-2 mt-24 flex items-center justify-center sm:mt-10">
        <img src="../assets/logo.png" class="-ml-10 mr-[14px] h-16 w-16 rounded-full" />
        <h1 class="text-4xl font-bold md:text-4xl">Selfie</h1>
      </div>
      <div class="sm:py-6 px-8" :class="actual_step === 0 ? 'pt-4' : 'pt-10'">
        <h1 v-if="actual_step === 0" class="mb-6 mt-4 sm:mt-0 sm:mb-4 text-2xl font-bold tracking-tight md:text-2xl">Crea il tuo account!</h1>
        <div class="mb-6">
          <div class="mb-2 grid grid-cols-3 sm:gap-14 gap-6">
            <span @click="goToStep(0)" class="inline-block rounded-full px-2 py-1 text-sm bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20 text-center" id="step1">Info Utente</span>
            <span @click="goToStep(1)" :class="{ 'opacity-50': actual_step < 1 }" class="inline-block rounded-full px-2 py-1 text-sm bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20 text-center" id="step2">Credenziali</span>
            <span @click="goToStep(2)" :class="{ 'opacity-50': actual_step < 2 }" class="inline-block rounded-full px-2 py-1 text-sm bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20 text-center" id="step3">Immagine</span>
          </div>
          <div class="flex h-2 overflow-hidden rounded bg-green-500/10 text-xs">
            <div ref="progress_bar" :style="{ width: `${(actual_step + 1) * 33 + (actual_step === 2 ? 1 : 0)}%` }" class="flex flex-col justify-center whitespace-nowrap bg-green-400 text-center text-white shadow-none transition-all duration-500 ease-in-out"></div>
          </div>
        </div>
        <form @submit.prevent="submit()" ref="multi_step_form">
          <div v-if="actual_step === 0" ref="step_1" class="step">
            <!-- personal information -->
            <label for="name" class="mb-2 block font-medium">Nome</label>
            <input v-model="name" name="name" id="name" class="mb-4 block w-full rounded-xl p-3.5 focus:outline focus:outline-neutral-800 dark:bg-neutral-800 dark:focus:outline-slate-50" placeholder="Inserisci il nome" required />
            <label for="surname" class="mb-2 block font-medium">Cognome</label>
            <input v-model="surname" name="surname" id="surname" class="mb-4 block w-full rounded-xl p-3.5 focus:outline focus:outline-neutral-800 dark:bg-neutral-800 dark:focus:outline-slate-50" placeholder="Inserisci il cognome" required />
            <label for="birthday" class="mb-2 block font-medium">Compleanno</label>
            <input v-model="birthday" type="date" name="birthday" id="birthday" class="mb-4 block w-full rounded-xl p-3.5 focus:outline focus:outline-neutral-800 dark:bg-neutral-800 dark:focus:outline-slate-50" required />
          </div>

          <div v-if="actual_step === 1" ref="step_2" class="step">
            <!-- account information -->
            <label for="email" class="mb-2 block ">Email</label>
            <input :disabled="isDisabled" v-model="email" type="email" name="email" id="email" class="mb-4 block w-full rounded-xl p-3.5 focus:outline focus:outline-neutral-800 dark:bg-neutral-800 dark:focus:outline-slate-50" placeholder="Inserisci l'email" required />

            <label for="username" class="mb-2 block font-medium">Username</label>
            <input :disabled="isDisabled" v-model="username" ref="input_username" type="username" name="username" id="username" class="mb-4 block w-full rounded-xl p-3.5 focus:outline focus:outline-neutral-800 dark:bg-neutral-800 dark:focus:outline-slate-50" placeholder="Inserisci l'username" required />
            
            <label for="password" class="mb-2 block font-medium">Password</label>
            <input :disabled="isDisabled" v-model="password" ref="input_password" type="password" name="password" id="password" class="mb-4 block w-full rounded-xl p-3.5 focus:outline focus:outline-neutral-800 dark:bg-neutral-800 dark:focus:outline-slate-50" placeholder="Inserisci la password" required />

            <label for="r_password" class="mb-2 block font-medium">Ripeti la password</label>
            <input :disabled="isDisabled" v-model="r_password" ref="input_r_password" type="password" name="r_password" id="r_password" class="mb-4 block w-full rounded-xl p-3.5 focus:outline focus:outline-neutral-800 dark:bg-neutral-800 dark:focus:outline-slate-50" placeholder="Riscrivi la password" required />
          </div>

          <div v-if="actual_step === 2" ref="step_3" class="step">
            <!-- not required credentials -->
            <label for="image" class="mb-2 block font-medium">Immagine profilo</label>
            <input type="file" ref="input_image" @change="get_image()" name="image" id="image" class="mb-1.5 block w-full rounded-xl p-3.5 focus:outline focus:outline-neutral-800 dark:bg-neutral-800 dark:focus:outline-slate-50" />
            <p class="mb-4 ml-1 text-sm font-light">*se non inserita, verrà usata un immagine default</p>
            <h2 class="mt-8 ml-0.5 text-lg font-semibold">Ecco il tuo profilo:</h2>
            <div class="mt-4 sm:mb-6 flex items-center space-x-4 pl-2">
              <img :src="image" alt="Immagine profilo" class="text-sm h-24 w-24 rounded-full border-2 border-slate-200 dark:border-neutral-600 text-center object-cover" />
              <div class="flex-none">
                <h2 class="text-2xl font-semibold text-neutral-900 dark:text-slate-50">{{ namesurname }}</h2>
                <h5 class="text-neutral-600 dark:text-neutral-400"> Visualizza profilo</h5>
              </div>
            </div>
          </div>

          <p :class="{ 'invisible': actual_step != 0 }" class="mb-4 ml-1 mt-2 text-sm font-light">
            Hai già un account?
            <router-link to="/" class="font-medium hover:underline">Accedi</router-link>
          </p>

          <!-- bottoni -->
          <div class="flex" :class=" actual_step === 0 ? 'justify-end mt-10 sm:mt-0' : 'justify-between mt-6 sm:-mt-6'">
            <button ref="prevBtn" @click="previous_step()" type="button" class="flex items-center font-medium focus:shadow-outline rounded-xl bg-gray-300 py-2.5 pr-4 text-gray-800 hover:bg-gray-400 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-5 ml-1.5 mr-0.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
              Indietro
            </button>
            <button ref="nextBtn" @click="next_step()" type="button" class="flex items-center font-medium focus:shadow-outline rounded-xl bg-green-500 py-2.5 pl-4 text-white hover:bg-green-600 focus:outline-none">Avanti
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-5 ml-0.5 mr-1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            <button ref="submitBtn" type="submit" class="focus:shadow-outline hidden rounded-xl bg-green-500 px-4 text-white hover:bg-green-600 focus:outline-none font-semibold">Registrati</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/api"
import router from "@/router"
import { onMounted, onUnmounted, ref } from "vue"
import { useMainStore } from "@/store"
import { onBeforeRouteLeave, useRoute } from "vue-router"

const store = useMainStore()
const route = useRoute()

const prevBtn = ref(null)
const nextBtn = ref(null)
const submitBtn = ref(null)
const multi_step_form = ref(null)
const progress_bar = ref(null)
const input_username = ref(null)
const input_password = ref(null)
const input_r_password = ref(null)
const input_image = ref(null)

// verrà poi integrato con le api di login di google etc...
const name = ref("")
const surname = ref("")
const birthday = ref("")
const email = ref("")
const password = ref("")
const r_password = ref("")
const username = ref("")
const image = ref("")
let file = null
const login = ref("")

const namesurname = ref("")

let isDisabled = 0

let step = []
let step_1 = ref(null)
let step_2 = ref(null)
let step_3 = ref(null)

step.push(step_1)
step.push(step_2)
step.push(step_3)

let actual_step = ref(0)

function showStep() {
  let step = actual_step.value
  prevBtn.value.classList.toggle("hidden", step === 0)
  nextBtn.value.classList.toggle("hidden", step === 2)
  submitBtn.value.classList.toggle("hidden", step !== 2)
}

onMounted(async () => {
  showStep()

  if (route.query.type == 1) {
    isDisabled = true
    name.value = store.name
    surname.value = store.surname
    email.value = store.email
    username.value = store.username
    image.value = store.image
    file = await urlToFile(image.value)
    login.value = store.login
  } else {
    isDisabled = false
    name.value = ""
    surname.value = ""
    email.value = ""
    username.value = ""
    image.value = ""
    login.value = 0
    file = null
  }
})

async function urlToFile(url, filename = "google-profile.jpg", mimeType = "image/jpeg") {
  const response = await fetch(url)
  const blob = await response.blob()
  return new File([blob], filename, { type: mimeType })
}

onBeforeRouteLeave(() => {
  resetForm()
})

onUnmounted(() => {
  resetForm()
})

function resetForm() {
  // Reset dello store Pinia
  store.$reset()

  // Reset delle variabili locali
  name.value = ""
  surname.value = ""
  email.value = ""
  username.value = ""
  password.value = ""
  r_password.value = ""
  image.value = ""
}

function truncateNameSurname() {
  namesurname.value = `${name.value} ${surname.value}`

  if (`${name.value} ${surname.value}`.length > 18) {
    namesurname.value = `${name.value} ${surname.value}`.substring(0, 16) + "..."
  }
}

function next_step() {
  if (validateStep()) {
    if (actual_step.value === 0) truncateNameSurname()
    actual_step.value++
    showStep()
  }
}

function previous_step() {
  actual_step.value--
  showStep()
}

async function submit() {
  for (let i = 0; i < 3; i++) {
    if (!validateStep(i)) return 
  }
  
  alert("Registrazione completata!")
  const response = await api.create_account(name.value, surname.value, password.value, email.value, file, username.value, birthday.value, login.value)
  if (response.success) {
    actual_step++
    router.push("/")
  }
}

function get_image() {
  file = input_image.value?.files[0]
  if (file) {
    image.value = URL.createObjectURL(file)
  }
}

function validateStep() {
  const currentStepElement = step[actual_step.value]
  const inputs = currentStepElement.value.querySelectorAll("input[required]:not([disabled])")
  let isValid = true

  inputs.forEach((input) => {
    if (!input.value) {
      isValid = false

      input.classList.add("border")
      input.classList.add("border-red-500")

      setTimeout(() => {
        input.classList.remove("border")
        input.classList.remove("border-red-500")
      }, 2000)
    }
  })

  if (actual_step.value === 1) {
    if (!isDisabled && password.value !== r_password.value) {
      isValid = false

      input_password.value.classList.add("border")
      input_password.value.classList.add("border-red-500")
      input_r_password.value.classList.add("border")
      input_r_password.value.classList.add("border-red-500")

      setTimeout(() => {
        input_password.value.classList.remove("border")
        input_password.value.classList.remove("border-red-500")
        input_r_password.value.classList.remove("border")
        input_r_password.value.classList.remove("border-red-500")
      }, 2000)
    }
  }

  return isValid
}

function goToStep(step) {
  actual_step.value = step
  truncateNameSurname()
  showStep()
}
</script>

<style scoped>
::-webkit-scrollbar {
  height: 0px;
  width: 0px;
  background: transparent;
}
</style>
