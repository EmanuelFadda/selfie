import { createApp } from "vue"
import App from "./App.vue"
import "./registerServiceWorker"
import { createPinia } from "pinia"
import router from "./router"
import "./assets/tailwind.css"

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/labs/VCalendar'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  directives,
  components
})

createApp(App)
  .use(createPinia())
  .use(router)
  .use(vuetify)
  .mount("#app")
