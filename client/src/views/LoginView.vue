<template>
  <div class="mb-16 flex min-h-screen w-screen flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
    <h1 class="mb-10 text-center text-3xl font-bold md:text-4xl">Selfie</h1>
    <div class="w-full rounded-lg sm:max-w-md md:mt-0 xl:p-0">
      <div class="p-6 sm:p-8">
        <h1 class="mb-4 text-xl font-bold tracking-tight md:text-2xl">Accedi al tuo account</h1>
        <form class="" action="#">
          <div>
            <label for="email" class="mb-2 block text-sm font-medium">Email</label>
            <input type="email" name="email" id="email" class="mb-4 block w-full rounded-lg p-2.5 focus:outline focus:outline-neutral-800 md:mb-6 dark:bg-neutral-800 dark:focus:outline-slate-50" placeholder="email@unibo.it" required="" />
          </div>
          <div>
            <label for="password" class="mb-2 block text-sm font-medium">Password</label>
            <input type="password" name="password" id="password" placeholder="••••••••" class="mb-4 block w-full rounded-lg p-2.5 focus:outline focus:outline-neutral-800 md:mb-6 dark:bg-neutral-800 dark:focus:outline-slate-50" required="" />
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-start">
              <div class="flex h-5 items-center">
                <input id="remember" aria-describedby="remember" type="checkbox" class="h-4 w-4 accent-neutral-800" required="" />
              </div>
              <div class="ml-2 text-sm">
                <label for="remember" class="">Ricordami</label>
              </div>
            </div>
            <a href="#" class="text-sm font-medium hover:underline">Password dimenticata?</a>
          </div>
          <button type="submit" class="mb-4 mt-10 w-full rounded-lg bg-white px-5 py-2.5 text-center text-sm font-medium focus:outline md:mb-6 md:mt-12 dark:bg-neutral-800">Sign in</button>
          <p class="text-sm font-light">
            Non hai ancora un account?
            <a href="#" class="font-medium hover:underline">Registrati</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  components: {},
}
</script>
