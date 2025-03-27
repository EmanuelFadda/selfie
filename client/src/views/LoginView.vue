<template>
  <div class="flex min-h-screen w-screen flex-col items-center justify-center max-sm:px-6">
    <div class="w-full max-w-md rounded-xl form-shadow dark:form-shadow">
      <h1 class="mb-6 mt-8 text-center text-3xl font-bold md:text-4xl">Selfie</h1>
      <div class="p-6 sm:p-8">
        <h1 class="mb-4 text-xl font-bold tracking-tight md:text-2xl">Accedi al tuo account</h1>
        <form>
          <div>
            <label for="username" class="mb-2 block text-sm font-medium">Username</label>
            <input ref="username" type="username" name="username" id="username" class="mb-4 block w-full rounded-lg p-2.5 focus:outline focus:outline-neutral-800 dark:bg-neutral-800 dark:focus:outline-slate-50" placeholder="user123" required="" />
          </div>
          <div>
            <label for="password" class="mb-2 block text-sm font-medium">Password</label>
            <input ref="password" type="password" name="password" id="password" placeholder="••••••••" class="mb-4 block w-full rounded-lg p-2.5 focus:outline focus:outline-neutral-800 dark:bg-neutral-800 dark:focus:outline-slate-50" required="" />
          </div>
          <button @click="login" type="submit" class="mt-10 w-full rounded-lg bg-white px-5 py-2.5 text-center text-sm font-medium focus:outline md:mt-12 dark:bg-neutral-800">Accedi</button>
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
import { ref } from "vue"
import { useMainStore } from "../store/mainStore"

export default {
  name: "LoginView",
  components: {},
  setup() {
    const store = useMainStore()
    const username = ref(null)
    const password = ref(null)

    const login = async () => {
      try {
        // Qui va la login ma per ora la login non funziona
      } catch (err) {        
        console.log(err)
      } finally {
        // Solo per testare la navigazione
        store.setTopItem({ id: 0, title: "Calendario", route: `/user/calendar`, componentType: "RouterLink", lightBgColor: "bg-sky-400", darkBgColor: "dark:bg-sky-500", lightBordColor: "border-sky-400", darkBordColor: "dark:border-sky-500", content: "Qui ci verranno messi eventi e attività" })
        store.setBottomItems([
          { id: 1, title: "Note", route: `/user/notes`, componentType: "RouterLink", lightBgColor: "bg-amber-300", darkBgColor: "dark:bg-amber-400", lightBordColor: "border-amber-300", darkBordColor: "dark:border-amber-400", content: "Una prova di una nota carina" },
          { id: 2, title: "Pomodoro", route: `/user/tomato`, componentType: "RouterLink", lightBgColor: "bg-red-400", darkBgColor: "dark:bg-red-500", lightBordColor: "border-red-400", darkBordColor: "dark:border-red-500", content: "Studia tanto con i pomodori!" },
        ])

        router.push(`/user`)
      }
    }

    return { login, username, password }
  },
}
</script>
