<template>
  <div class="flex min-h-screen flex-col">
    <Navbar viewTitle="Calendario" :titleColor="classColor" :backButton="true" name="Nome" surname="Cognome" :settingsArray="settingsArray"></Navbar>
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat>
            <v-btn
              class="me-4"
              color="grey-darken-2"
              variant="outlined"
              @click="setToday"
            >
              Today
            </v-btn>
            <v-btn
              color="grey-darken-2"
              size="small"
              variant="text"
              icon
              @click="prev"
            >
              <v-icon size="small"> mdi-chevron-left </v-icon>
            </v-btn>
            <v-btn
              color="grey-darken-2"
              size="small"
              variant="text"
              icon
              @click="next"
            >
              <v-icon size="small"> mdi-chevron-right </v-icon>
            </v-btn>
            <v-toolbar-title v-if="calendar">
              {{ calendar.title }}
            </v-toolbar-title>
            <v-menu location="bottom end">
              <template v-slot:activator="{ props }">
                <v-btn color="grey-darken-2" variant="outlined" v-bind="props">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon end> mdi-menu-down </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            :event-color="getEventColor"
            :events="events"
            :type="type"
            color="primary"
            @change="updateRange"
            @click:date="viewDay"
            @click:event="showEvent"
            @click:more="viewDay"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :activator="selectedElement"
            :close-on-content-click="false"
            location="end"
          >
            <v-card color="grey-lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="secondary"
                  variant="text"
                  @click="selectedOpen = false"
                >
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue"
import { VCalendar } from "vuetify/lib/labs/VCalendar";
import { VBtn, VIcon, VToolbar, VSheet } from 'vuetify/components'

const classColor = "text-sky-400 dark:text-sky-500"
import { onMounted, onUnmounted,ref } from 'vue'
//import 'vuetify/styles'

  const calendar = ref()

  const typeToLabel = {
    month: 'Month',
    week: 'Week',
    day: 'Day'
  }
  const colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1']
  const names = ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party']

  const focus = ref('')
  const type = ref('month')
  const selectedEvent = ref({})
  const selectedElement = ref(null)
  const selectedOpen = ref(false)
  const events = ref([])

  let vuetifyStyle=null
  
  onMounted(() => {
    calendar.value.checkChange()
    // creo il tag <link> per vuetify/styles
    vuetifyStyle = document.createElement("link")
    vuetifyStyle.rel = "stylesheet"
    vuetifyStyle.href = "https://cdn.jsdelivr.net/npm/vuetify@3.10.0/dist/vuetify.min.css"
    document.head.appendChild(vuetifyStyle)
  })

onUnmounted(() => {
  // rimuovo il CSS quando esco dalla view
  if (vuetifyStyle && vuetifyStyle.parentNode) {
    vuetifyStyle.parentNode.removeChild(vuetifyStyle)
  }
})

  function viewDay (nativeEvent, { date }) {
    focus.value = date
    type.value = 'day'
  }
  function getEventColor (event) {
    return event.color
  }
  function setToday () {
    focus.value = ''
  }
  function prev () {
    calendar.value.prev()
  }
  function next () {
    calendar.value.next()
  }
  function showEvent (nativeEvent, { event }) {
    const open = () => {
      selectedEvent.value = event
      selectedElement.value = nativeEvent.target
      requestAnimationFrame(() => requestAnimationFrame(() => selectedOpen.value = true))
    }
    if (selectedOpen.value) {
      selectedOpen.value = false
      requestAnimationFrame(() => requestAnimationFrame(() => open()))
    } else {
      open()
    }
    nativeEvent.stopPropagation()
  }
  function updateRange ({ start, end }) {
    const _events = []
    const min = new Date(`${start.date}T00:00:00`)
    const max = new Date(`${end.date}T23:59:59`)
    const days = (max.getTime() - min.getTime()) / 86400000
    const eventCount = rnd(days, days + 20)
    for (let i = 0; i < eventCount; i++) {
      const allDay = rnd(0, 3) === 0
      const firstTimestamp = rnd(min.getTime(), max.getTime())
      const first = new Date(firstTimestamp - (firstTimestamp % 900000))
      const secondTimestamp = rnd(2, allDay ? 288 : 8) * 900000
      const second = new Date(first.getTime() + secondTimestamp)
      _events.push({
        name: names[rnd(0, names.length - 1)],
        start: first,
        end: second,
        color: colors[rnd(0, colors.length - 1)],
        timed: !allDay,
      })
    }
    events.value = _events
  }
  function rnd (a, b) {
    return Math.floor((b - a + 1) * Math.random()) + a
  }
</script>
