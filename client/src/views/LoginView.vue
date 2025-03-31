<template>
  <div class="flex min-h-screen w-screen items-center justify-center">
    <div class="max-sm:form-shadow max-sm:min-h-screen dark:form-shadow w-full sm:max-w-md rounded-xl">
      <div class="flex items-center justify-center mb-6 mt-24 md:mt-12">
        <img src="../assets/logo.png" class="w-16 h-16 rounded-full mr-[14px] -ml-10">
        <h1 class="text-4xl font-bold md:text-4xl">Selfie</h1>
      </div>
      <div class="p-8">
        <h1 class="mb-4 text-2xl font-bold tracking-tight md:text-2xl">Ben tornato!</h1>
        <form method="POST">
          <div>
            <label for="username" class="mb-2 block text-base font-medium">Username</label>
            <input v-model="username" type="username" name="username" id="username" class="mb-4 block w-full rounded-xl p-3.5 focus:outline focus:outline-neutral-800 dark:bg-neutral-800 dark:focus:outline-slate-50" placeholder="Inserisci l'username" required="" />
          </div>
          <div>
            <label for="password" class="mb-2 block text-base font-medium">Password</label>
            <input v-model="password" type="password" name="password" id="password" placeholder="Inserisci la password" class="mb-4 block w-full rounded-xl p-3.5 focus:outline focus:outline-neutral-800 dark:bg-neutral-800 dark:focus:outline-slate-50" required="" />
          </div>
          <button @click="login" type="button" class="mt-16 w-full rounded-xl bg-white py-3 text-center text-lg font-semibold focus:outline md:mt-12 dark:bg-neutral-800">Accedi</button>
          <p class="mb-4 mt-2 ml-1 text-base font-light">
            Non hai ancora un account?
            <a href="#" class="font-medium hover:underline">Registrati</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router"

export default {
  name: "LoginView",
  components: {},
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    async login() {
      // Funzione di login
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })

      const data = await response.json()
      if (data.success) {
        localStorage.setItem("token", data.content)

        router.push(`/${this.username}`)
      } else {
        console.error("Login failed")
      }
    },
  },
}
</script>
