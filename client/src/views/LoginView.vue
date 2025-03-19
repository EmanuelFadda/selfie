<template>
  <section class="lex min-h-screen bg-gray-50">
    <div class="mb-16 flex w-screen flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
      <h1 class="mb-10 text-center text-3xl font-semibold text-gray-900 md:text-4xl">Selfie</h1>
      <div class="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
        <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 class="text-xl font-bold tracking-tight text-gray-900 md:text-2xl">Accedi al tuo account</h1>
          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label for="email" class="mb-2 block text-sm font-medium text-gray-900">Email</label>
              <input type="email" name="email" id="email" class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900" placeholder="email@unibo.it" required="" />
            </div>
            <div>
              <label for="password" class="mb-2 block text-sm font-medium text-gray-900">Password</label>
              <input type="password" name="password" id="password" placeholder="••••••••" class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900" required="" />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex h-5 items-center">
                  <input id="remember" aria-describedby="remember" type="checkbox" class="h-4 w-4 rounded border border-gray-300" required="" />
                </div>
                <div class="ml-2 text-sm">
                  <label for="remember" class="text-gray-400">Ricordami</label>
                </div>
              </div>
              <a href="#" class="text-sm font-medium text-gray-600 hover:underline">Password dimenticata?</a>
            </div>
            <button type="submit" class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4">Sign in</button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Non hai ancora un account?
              <a href="#" class="text-primary-600 font-medium hover:underline">Registrati</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "LoginView",
  components: {},
};
</script>
