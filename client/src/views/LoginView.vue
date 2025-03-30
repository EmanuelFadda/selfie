<template>
  <div class="flex min-h-screen w-screen flex-col items-center justify-center max-sm:px-6">
    <div class="form-shadow dark:form-shadow w-full max-w-md rounded-xl">
      <h1 class="mb-6 mt-8 text-center text-3xl font-bold md:text-4xl">Selfie</h1>
      <div class="p-6 sm:p-8">
        <h1 class="mb-4 text-xl font-bold tracking-tight md:text-2xl">Accedi al tuo account</h1>
        <form>
          <div>
            <label for="username" class="mb-2 block text-sm font-medium">Username</label>
            <input v-model="username" type="username" name="username" id="username" class="mb-4 block w-full rounded-lg p-2.5 focus:outline focus:outline-neutral-800 dark:bg-neutral-800 dark:focus:outline-slate-50" placeholder="user123" required="" />
          </div>
          <div>
            <label for="password" class="mb-2 block text-sm font-medium">Password</label>
            <input v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="mb-4 block w-full rounded-lg p-2.5 focus:outline focus:outline-neutral-800 dark:bg-neutral-800 dark:focus:outline-slate-50" required="" />
          </div>
          <button @click="login" type="button" class="mt-10 w-full rounded-lg bg-white px-5 py-2.5 text-center text-sm font-medium focus:outline md:mt-12 dark:bg-neutral-800">Accedi</button>
          <p class="mb-4 mt-2 text-sm font-light">
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
  data () {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    async login () {
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
