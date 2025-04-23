<template>
  <div class="flex min-h-screen w-screen items-center justify-center">
    <div class="form-shadow dark:form-shadow w-full rounded-xl max-sm:min-h-screen sm:max-w-md">
      <div class="mb-6 mt-24 flex items-center justify-center sm:mt-12">
        <img src="../assets/logo.png" class="-ml-10 mr-[14px] h-16 w-16 rounded-full" />
        <h1 class="text-4xl font-bold md:text-4xl">Selfie</h1>
      </div>
      <div class="p-8">
        <div class="mb-8">
          <div class="mb-2 flex justify-between">
            <span :class="{ 'opacity-50': actual_step != 0 }" class="inline-block rounded-full bg-green-200 px-2 py-1 text-xs uppercase text-green-600" id="step1">User info</span>
            <span :class="{ 'opacity-50': actual_step != 1 }" class="inline-block rounded-full bg-green-200 px-2 py-1 text-xs uppercase text-green-600" id="step2">Credentials</span>
            <span :class="{ 'opacity-50': actual_step != 2 }" class="inline-block rounded-full bg-green-200 px-2 py-1 text-xs uppercase text-green-600" id="step3">User image</span>
          </div>
          <div class="mb-4 flex h-2 overflow-hidden rounded bg-green-200 text-xs">
            <div ref="progress_bar"   :style="{ width: `${(actual_step+1) * 25}%` }" class="flex flex-col justify-center whitespace-nowrap bg-green-500 text-center text-white shadow-none transition-all duration-500 ease-in-out"></div>
          </div>
        </div>
        <form @submit.prevent="submit()" ref="multi_step_form">
        <div v-if="actual_step === 0" ref="step_1" class="step">
          <!-- personal information -->
          <label for="name" class="mb-2 block text-sm">Name</label>
          <input v-model="name" name="name" id="name" class="mb-4 block w-full rounded-xl p-3.5 focus:outline focus:outline-neutral-800 dark:bg-neutral-800 dark:focus:outline-slate-50" placeholder="Inserisci il nome" required />
          <label for="surname" class="mb-2 block text-sm">Surname</label>
          <input v-model="surname" name="surname" id="surname" class="mb-4 block w-full rounded-xl p-3.5 focus:outline focus:outline-neutral-800 dark:bg-neutral-800 dark:focus:outline-slate-50" placeholder="Inserisci il cognome" required />
          <label for="birthday" class="mb-2 block text-sm">Birthday</label>
          <input v-model="birthday" type="date" name="birthday" id="birthday" class="mb-4 block w-full rounded-xl p-3.5 focus:outline focus:outline-neutral-800 dark:bg-neutral-800 dark:focus:outline-slate-50" />
        </div>

        <div v-if="actual_step === 1" ref="step_2" class="step">
          <!-- account information -->
          <label for="email" class="mb-2 block text-sm">Email</label>
          <input v-model="email" type="email" name="email" id="email" class="mb-4 block w-full rounded-xl p-3.5 focus:outline focus:outline-neutral-800 dark:bg-neutral-800 dark:focus:outline-slate-50" placeholder="Inserisci l'email" required />

          <label for="username" class="mb-2 block text-sm">Username</label>
          <input v-model="username" ref="input_username" type="username" name="username" id="username" class="mb-4 block w-full rounded-xl p-3.5 focus:outline focus:outline-neutral-800 dark:bg-neutral-800 dark:focus:outline-slate-50" placeholder="Inserisci l'username" required />

          <label for="password" class="mb-2 block text-sm">Password</label>
          <input v-model="password" ref="input_password" type="" name="password" id="password" class="mb-4 block w-full rounded-xl p-3.5 focus:outline focus:outline-neutral-800 dark:bg-neutral-800 dark:focus:outline-slate-50" placeholder="Inserisci la password" required />

          <label for="r_password" class="mb-2 block text-sm">Ripeti la password</label>
          <input v-model="r_password" ref="input_r_password" type="" name="r_password" id="r_password" class="mb-4 block w-full rounded-xl p-3.5 focus:outline focus:outline-neutral-800 dark:bg-neutral-800 dark:focus:outline-slate-50" placeholder="Riscrivi la password" required />
        </div>

        <div v-if="actual_step === 2" ref="step_3" class="step">
          <!-- not required credentials -->
          <label for="image" class="mb-2 block text-sm">Immagine profilo</label>
          <input type="file" ref="input_image" @change="get_image()" name="image" id="image" class="mb-4 block w-full rounded-xl p-3.5 focus:outline focus:outline-neutral-800 dark:bg-neutral-800 dark:focus:outline-slate-50" />
          <div class="flex justify-center">
            <img v-if="image" :src="image" class="mt-2 h-32 w-32 object-cover" />
          </div>
        </div>

        <p class="mb-4 ml-1 mt-2 text-base font-light">
          Hai già un account?
          <router-link to="/" class="font-medium hover:underline">Accedi</router-link>
        </p>

        <!-- bottoni -->
        <div class="mt-8 flex justify-between">
          <button ref="prevBtn" @click="previous_step()" type="button" class="focus:shadow-outline hidden rounded-lg bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400 focus:outline-none">Previous</button>
          <button ref="nextBtn" @click="next_step()" type="button" class="focus:shadow-outline rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none">Next</button>
          <button ref="submitBtn" type="submit" class="focus:shadow-outline hidden rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none">Submit</button>
        </div>
      </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/api"
import router from "@/router"
import { onMounted, ref } from "vue"

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
const name = ref("test")
const surname = ref("test")
const birthday = ref("2025-12-31")
const email = ref("test@test")
const password = ref("test")
const r_password = ref("test")
const username = ref("test")
const image = ref(null)

let step = []
let step_1 = ref(null)
let step_2 = ref(null)
let step_3 = ref(null)

step[0] = step_1
step[1] = step_2
step[2] = step_3

let actual_step = ref(0)

function showStep() {
  let step = actual_step.value
  prevBtn.value.classList.toggle("hidden", step === 0)
  nextBtn.value.classList.toggle("hidden", step === 2)
  submitBtn.value.classList.toggle("hidden", step !== 2)
}

onMounted(() => {
  showStep()
  console.log()
})

function next_step() {
  if (validateStep()) {
    actual_step.value++
    showStep()
  }
}

function previous_step() {
  actual_step.value--
  showStep()
}

async function submit() {
  if (validateStep(actual_step)) {
    alert("Form submitted successfully!")
    const response = await api.create_account(name.value, surname.value, password.value, email.value, image.value, username.value, birthday.value)
    if(response.success){
      actual_step++
      router.push("/")
    }   
  }
}

function get_image() {
  const file = input_image.value?.files[0]
  if (file) {
    image.value = URL.createObjectURL(file)
  }
}

function validateStep() {
  const currentStepElement = step[actual_step.value]
  const inputs = currentStepElement.value.querySelectorAll("input[required]")
  let isValid = true

  inputs.forEach((input) => {
    if (!input.value) {
      isValid = false
    }
  })

  if (actual_step.value === 1) {
    if (password.value !== r_password.value) {
      isValid = false
      alert(input_password.value)
      input_password.value.classList.add("border-red-500")
      alert("Password riscritta male")
    }
  }

  return isValid
}
</script>
