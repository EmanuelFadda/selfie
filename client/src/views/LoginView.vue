<template>
  <div class="flex min-h-screen w-screen items-center justify-center">
    <div class="form-shadow dark:form-shadow w-full rounded-xl max-sm:min-h-screen sm:max-w-md">
      <div class="mb-4 mt-24 flex items-center justify-center sm:mt-10">
        <!-- App Logo -->
        <img src="../assets/logo.png" class="-ml-10 mr-[14px] h-16 w-16 rounded-full" />
        <!-- Title -->
        <h1 class="text-4xl font-bold md:text-4xl">Selfie</h1>
      </div>
      <div class="p-8">
        <!-- Subtitle -->
        <h1 class="mb-4 text-2xl font-bold tracking-tight md:text-2xl">Ben tornato!</h1>
        <!-- Login Form -->
        <form method="POST">
          <!-- Username Input -->
          <div>
            <label for="username" class="mb-2 block text-base font-medium">Username</label>
            <input v-model="username" autocomplete="username" type="username" name="username" id="username" class="mb-4 block w-full rounded-xl p-3.5 focus:outline focus:outline-neutral-800 dark:bg-neutral-800 dark:focus:outline-slate-50" placeholder="Inserisci l'username" required="" />
          </div>
          <!-- Password Input -->
          <div>
            <label for="password" class="mb-2 block text-base font-medium">Password</label>
            <input v-model="password" autocomplete="current-password / new-password" type="password" name="password" id="password" placeholder="Inserisci la password" class="mb-4 block w-full rounded-xl p-3.5 focus:outline focus:outline-neutral-800 dark:bg-neutral-800 dark:focus:outline-slate-50" required="" />
          </div>
          <GoogleSignIn />
          <!-- Login Button -->
          <button @click="login" type="button" class="mt-16 w-full rounded-xl bg-white py-3 text-center font-semibold focus:outline sm:mt-10 dark:bg-neutral-800">Accedi</button>
          <!-- Go To Register -->
          <p class="mb-3 ml-1 mt-2 text-sm font-light">
            Non hai ancora un account?
            <router-link :to="{ path: '/register', query: { type: 0 } }" class="font-medium hover:underline">Registrati</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router"
import api from "@/api"
import { ref } from "vue"
import GoogleSignIn from "@/components/GoogleSignIn.vue"

const username = ref("")
const password = ref("")

async function login() {
  
  const object_query = {
    "credentials.username": username.value ,
    "credentials.password": password.value
  }

  const response = await api.login(object_query)
  if (response.content!=null) {
    localStorage.setItem("token", response.content)
    router.push(`/${username.value}`)
  } else {
    alert(response.message)
  }
}
</script>
