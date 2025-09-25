// main.js
import { createApp } from "vue"
import App from "./App.vue"
import "./registerServiceWorker"
import { createPinia } from "pinia"
import router from "./router"
import "./assets/tailwind.css"



// Vuetify
import { createVuetify } from 'vuetify'

// Icone mdi
import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// Componenti Vuetify che usi
import {
  VApp,
  VMain,
  VRow,
  VCol,
  VSheet,
  VToolbar,
  VToolbarTitle,
  VToolbarItems,
  VBtn,
  VIcon,
  VMenu,
  VList,
  VListItem,
  VListItemTitle,
  VCard,
  VCardText,
  VCardActions,
  VDialog,
} from 'vuetify/components'

// Vuetify Labs
import { VCalendar } from 'vuetify/labs/VCalendar'

// Config Vuetify
const vuetify = createVuetify({
  components: {
    VApp,
    VMain,
    VRow,
    VCol,
    VSheet,
    VToolbar,
    VToolbarTitle,
    VToolbarItems,
    VBtn,
    VIcon,
    VMenu,
    VList,
    VListItem,
    VListItemTitle,
    VCard,
    VCardText,
    VCardActions,
    VCalendar,
    VDialog 
  },
  directives: {}, // se in futuro usi v-ripple, v-scroll ecc.
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },theme:{
    defaultTheme:'dark'
  }
})

// App Vue
createApp(App)
  .use(createPinia())
  .use(router)
  .use(vuetify)
  .mount("#app")
