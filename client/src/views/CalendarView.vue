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
import api from "@/api"

const calendar = ref()

const typeToLabel = {
  month: 'Month',
  week: 'Week',
  day: 'Day'
}

const focus = ref('')
const type = ref('month')
const selectedEvent = ref({})
const selectedElement = ref(null)
const selectedOpen = ref(false)
const events = ref([])
let vuetifyStyle=null

//let response_activities
let response_events

// ottiene tutti gli eventi e le attività dell'utente dal database
async function refresh_calendar(){
  //response_activities= await api.getActivities()

  response_events= await api.getEvents()
}

onMounted(async () => {
  calendar.value.checkChange()
  // creo il tag <link> per vuetify/styles
  vuetifyStyle = document.createElement("link")
  vuetifyStyle.rel = "stylesheet"
  vuetifyStyle.href = "https://cdn.jsdelivr.net/npm/vuetify@3.10.0/dist/vuetify.min.css"
  document.head.appendChild(vuetifyStyle)
  await refresh_calendar()
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

function getStartEndDate(data, scheduled, durataMinuti) {
  // scheduled atteso come "HH:MM"
  const [hour, minute] = scheduled.split(':').map(Number);

  // creo la data di inizio in UTC
  const start = new Date(Date.UTC(
    data.getFullYear(),
    data.getMonth(), // già 0-based
    data.getDate(),
    hour,
    minute
  ));

  // aggiungo la durata in minuti
  const end = new Date(start.getTime() + durataMinuti * 60 * 1000);

  return { start, end };
}


function getNextDate(x,repeat_type){
  if (repeat_type == 1) {
    x.setDate(x.getDate() + 1)
  } else if (repeat_type == 2) {
    x.setDate(x.getDate() + 7)
  } else if (repeat_type == 3) {
    x.setMonth(x.getMonth() + 1)
  } else if (repeat_type == 4) {
    x.setFullYear(x.getFullYear() + 1)              
  }
  return x
}

function calendarObjToUTCDate(obj) {
  return new Date(Date.UTC(
    obj.year,
    obj.month - 1, // nei costruttori JS i mesi partono da 0
    obj.day,
    obj.hour || 0,
    obj.minute || 0
  ))
}


async function updateRange ({ start, end }) {
  events.value=null
  let _events = []

  const start_date = calendarObjToUTCDate(start) //obj -> Date
  const end_date = calendarObjToUTCDate(end)

  console.log(1,start_date,end_date) 
  await refresh_calendar()
  if(response_events.success){

    response_events.content.events.forEach(e => {

      // devo controllare questa variabile
      let eventStartDate=new Date(e.repeat.start_date)  //string -> Date 
      let eventEndDate=new Date(e.repeat.finish_date)
 
      let isInRange= (eventStartDate <= end_date) && (eventEndDate >= start_date)

      if(isInRange){
        let x_date=eventStartDate // Date
        console.log(x_date)
        while(x_date>=eventStartDate && x_date<=eventEndDate){
          console.log(x_date,e.scheduled,e.duration)
          let h=getStartEndDate(x_date,e.scheduled,e.duration)
          console.log(2,h)
          let event={
            id: e.id,
            name: e.title,
            created: e.created,
            modified: e.modified,
            start: h.start,
            end: h.end,
            duration:e.duration, 
            color: e.color,  
            timed: true,
            repeat:e.repeat
          }
          // RICORDA: DA GESTIRE IL CASO IN CUI L'ATTIVITA' SIA TUTTO IL GIORNO 
          _events.push(event)
          // 0=not repeat , 1=day, 2=week, 3=month, 4=year
          if(e.repeat.type!=0){
            let y=getNextDate(x_date,e.repeat.type)  
            x_date=y
          }else{
            break;
          }


       }
      }
    });
    events.value = _events
  
    _events = []
  } 

  // if(response_events.value.sucess){

  // }


  /*

  */

}

</script>
