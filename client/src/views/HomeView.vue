<template>
  <div class="flex min-h-screen flex-col">
    <Navbar viewTitle="Selfie" :hideTimeMachine="true" :name="store.user.name" :surname="store.user.surname" :image="store.user.image" :settingsArray="settingsArray"></Navbar>

    <!-- Anteprima oggetti delle note e pomodoro (default piccole) -->
    <div class="ml-5 mr-5 grid h-[calc(100vh-108px)] grid-cols-2 grid-rows-2 gap-4 lg:ml-28 lg:mr-28 lg:h-[calc(100vh-132px)] lg:grid-cols-3 lg:gap-6 xl:gap-7 2xl:gap-8 2xl:ml-36 2xl:mr-36">
      <HomeTopItem v-for="(item, index) in layout.slice(0, 1)" :key="index" :title="item.title" :componentType="item.componentType"  :bgColor="item.bgColor" :bordColor="item.bordColor" :route="item.route" :activityTitle="item.activityTitle" :activityContent="item.activityContent" :eventTitle="item.eventTitle" :eventContent="item.eventContent" class="row-span-2 flex flex-auto flex-col max-sm:col-span-2 lg:col-span-2"></HomeTopItem>
      <HomeBottomItem v-for="(item, index) in layout.slice(1)" :key="index" :title="item.title" :componentType="item.componentType"  :bgColor="item.bgColor" :bordColor="item.bordColor" :route="item.route" :contentTitle="item.contentTitle" :content="item.content"></HomeBottomItem>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue"
import HomeTopItem from "@/components/HomeTopItem.vue"
import HomeBottomItem from "@/components/HomeBottomItem.vue"
import router from "@/router"
import { useMainStore } from "@/store"
import { ref, onMounted } from "vue"
import api from "@/api"
import activities from "@/api/activities"

const store = useMainStore()

const settingsArray = ref([])
const layout = ref([])
const content = ref({})

onMounted(async () => {
  const response_credentials = await api.getCredentials()  

  if (!response_credentials.success) {
    console.log("Error fetching account data")
    router.push("/")
  }

  const user_data = response_credentials.content.credentials

  store.user = user_data

  settingsArray.value = [
    //{ label: "Layout", route: `/${store.user.username}/edit_layout`, icon: ["M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"] },
    { label: "Tags", route:  `/${store.user.username}/edit_tags`, icon: ["M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z", "M6 6h.008v.008H6V6Z"]},
    { label: "Crediti", route: `/${store.user.username}/credits`, icon: ["M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"] },
    { label: "Logout", route: "/", icon: ["M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"] },
  ]

  const response_menu = await api.getMenu()

  if (!response_menu.success) {
    router.push("/")
  }

  const menu_data = response_menu.content.menù

  store.menu.content = menu_data.content
  content.value = store.menu.content
  console.log(content.value)

  const items = {
    calendar: { 
      id: 0, 
      title: "Calendario", 
      route: `/${store.user.username}/calendar`, 
      componentType: "RouterLink", 
      bgColor: "bg-sky-500", 
      bordColor: "border-sky-500", 
      eventTitle: content.value.events.title, 
      eventContent: (() => {
        const startDate = content.value.events.repeat.start_date // YYYY-MM-DD
        const scheduled = content.value.events.scheduled // "HH-MM"
        const duration = content.value.events.duration // in minutes

        // Parse start date and scheduled time
        const [startYear, startMonth, startDay] = startDate.split('-').map(Number)
        const [startHour, startMinute] = scheduled.split(':').map(Number)

        const startDateTime = new Date(startYear, startMonth - 1, startDay, startHour, startMinute)

        // Calculate end date time by adding duration minutes
        const endDateTime = new Date(startDateTime.getTime() + duration * 60000)

        // Format date time as DD-MM-YYYY HH:MM
        const pad = (n) => n.toString().padStart(2, '0')

        const formatDateTime = (dt) => {
          return `${pad(dt.getDate())}-${pad(dt.getMonth() + 1)}-${dt.getFullYear()} ${pad(dt.getHours())}:${pad(dt.getMinutes())}`
        }

        return `Inizio evento: ${formatDateTime(startDateTime)}\nFine evento: ${formatDateTime(endDateTime)}`
      })(),
      activityTitle: content.value.activities.title, 
      activityContent: (() => {
        // expiration is in YYYY-MM-DD
        const exp = content.value.activities.expiration
        if (!exp) return "Data di scadenza: "
        const [yyyy, mm, dd] = exp.split('-')
        return `Data di scadenza: ${dd}-${mm}-${yyyy}`
      })(),
    },
    notes: { id: 1, title: "Note", route: `/${store.user.username}/notes`, componentType: "RouterLink", bgColor: "bg-amber-400", bordColor: "border-amber-400", contentTitle: content.value.notes.title, content: content.value.notes.content},
    tomato: { id: 2, title: "Pomodoro", route: `/${store.user.username}/tomato`, componentType: "RouterLink", bgColor: "bg-red-500", bordColor: "border-red-500", contentTitle: content.value.tomato_sessions.name, content: `Completate: ${content.value.tomato_sessions.done}/${content.value.tomato_sessions.rep_tomato} sessioni`},
  }

  store.menu.layout = menu_data.layout.map((item) => items[item])
  layout.value = store.menu.layout
})
</script>
