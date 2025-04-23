<template>
  <div class="flex min-h-screen w-screen items-center justify-center">
    <div class="form-shadow max-sm:min-h-screen dark:form-shadow w-full sm:max-w-md rounded-xl">
      <div class="flex items-center justify-center mb-6 mt-24 sm:mt-12">
        <!-- App Logo -->
        <img src="../assets/logo.png" class="w-16 h-16 rounded-full mr-[14px] -ml-10">
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
          <!-- Login Button -->
          <button @click="login" type="button" class="mt-16 w-full rounded-xl bg-white py-3 text-center text-lg font-semibold focus:outline sm:mt-12 dark:bg-neutral-800">Accedi</button>
          <!-- Go To Register -->
          <p class="mb-4 mt-2 ml-1 text-base font-light">
            Non hai ancora un account?
            <router-link to="/register" class="font-medium hover:underline">Registrati</router-link>
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

const username = ref("")
const password = ref("")

async function login() {
  const response = await api.login(username.value, password.value)
  if (response.success) {
    localStorage.setItem("token", response.content)
    router.push(`/${username.value}`)
  } else {
    alert(response.message)
  }
}
</script>
