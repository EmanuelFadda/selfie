<template>
  <v-sheet class="fill-height d-flex flex-column">
    <v-toolbar>
      <v-btn
        color="grey-darken-2"
        variant="text"
        icon
        @click="prev"
      >
        <v-icon> mdi-chevron-left </v-icon>
      </v-btn>
      <v-btn
        color="grey-darken-2"
        variant="text"
        icon
        @click="next"
      >
        <v-icon> mdi-chevron-right </v-icon>
      </v-btn>
      <v-toolbar-title v-if="calendar">
        {{ calendar.title }}
      </v-toolbar-title>
      <v-icon-btn
        icon="mdi-calendar"
        class="border-0"
        color="grey-darken-2"
        variant="outlined"
        @click="setToday"
      />
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn size="small" color="grey-darken-2 border-0" variant="outlined" v-bind="props">
            <span>{{ typeToLabel[type] }}</span>
            <v-icon size="small" end> mdi-menu-down </v-icon>
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

    <v-sheet class="flex-grow-1 d-flex" style="min-height: 0;">
    <v-calendar
      locale="it"
      ref="calendar"
      class="flex-grow-1"
      style="height: 100%;"
      theme="dark"
      v-model="focus"
      :event-color="getEventColor"
      :events="events"
      :type="type"
      color="primary"
      :weekdays="[1,2,3,4,5,6,0]"    
      :first-day-of-week="1"          
      @change="updateRange"
      @click:date="viewDay"
      @click:event="showEvent"
      @click:more="viewDay"
      :key="calendarKey"
      :show-current-time="true"
    />

    </v-sheet>

    <!-- il dialog può restare qui o dentro lo stesso v-sheet, non influisce sull'altezza -->
    <v-dialog v-model="selectedOpen" max-width="500px">
      <v-card class="dark:bg-neutral-800 border border-neutral-700 rounded-2xl shadow-lg text-neutral-200">
        <v-toolbar
          :color="selectedEvent?.color || 'blue'"
          dark
          class="rounded-t-2xl"
          density="comfortable"
        >
          <v-toolbar-title class="text-lg font-semibold">
            {{ selectedEvent?.name || 'Evento' }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon variant="text" @click="selectedOpen = false; selectetEvent=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text class="p-4 text-neutral-300 space-y-1">
          <template v-if="selectedEvent">
            <div v-if="selectedEvent.id"><span class="font-semibold">ID:</span> {{ selectedEvent.id }}</div>
            <div v-if="selectedEvent.type"><span class="font-semibold">Tipo:</span> {{ selectedEvent.type }}</div>
            <div v-if="selectedEvent.created"><span class="font-semibold">Creato:</span> {{ new Date(selectedEvent.created).toLocaleString() }}</div>
            <div v-if="selectedEvent.modified"><span class="font-semibold">Modificato:</span> {{ new Date(selectedEvent.modified).toLocaleString() }}</div>
            <div v-if="selectedEvent.start"><span class="font-semibold">Inizio:</span> {{ new Date(selectedEvent.start).toLocaleString() }}</div>
            <div v-if="selectedEvent.end"><span class="font-semibold">Fine:</span> {{ new Date(selectedEvent.end).toLocaleString() }}</div>
            <div v-if="selectedEvent.duration"><span class="font-semibold">Durata:</span> {{ selectedEvent.duration }} minuti</div>
            <div v-if="selectedEvent.color">
              <span class="font-semibold">Colore:</span>
              <span :style="{ backgroundColor: selectedEvent.color }" class="inline-block w-4 h-4 rounded-full ml-1 align-middle"></span>
            </div>
            <div v-if="selectedEvent.timed !== undefined"><span class="font-semibold">Timed:</span> {{ selectedEvent.timed ? 'Sì' : 'No' }}</div>
            <div v-if="selectedEvent.repeat">
              <span class="font-semibold">Ripetizione:</span> {{ selectedEvent.repeat.type }} ({{ selectedEvent.repeat.start_date }} → {{ selectedEvent.repeat.finish_date }})
            </div>
            <div v-if="selectedEvent.id_tomato"><span class="font-semibold">ID Tomato:</span> {{ selectedEvent.id_tomato }}</div>
            <div v-if="selectedEvent.done !== undefined"><span class="font-semibold">Completato:</span> {{ selectedEvent.done ? 'Sì' : 'No' }}</div>
          </template>
          <p v-else class="italic text-neutral-500">Nessun dettaglio disponibile</p>
        </v-card-text>

        <v-card-actions class="flex justify-end px-4 pb-3">
          <v-btn variant="text" class="text-blue-400 hover:bg-neutral-700 rounded-xl" @click="editEvent(selectedEvent)" :disabled="!selectedEvent">
            <v-icon start>mdi-pencil</v-icon> Modifica
          </v-btn>
          <v-btn variant="text" class="text-red-400 hover:bg-neutral-700 rounded-xl" @click="deleteEvent(selectedEvent)" :disabled="!selectedEvent">
            <v-icon start>mdi-delete</v-icon> Elimina
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>


<script setup>
import { VCalendar } from "vuetify/lib/labs/VCalendar";
import { VBtn, VIcon, VToolbar, VSheet, VDialog,VCardActions } from 'vuetify/components'
import { nextTick } from "vue";
import { VIconBtn } from 'vuetify/labs/VIconBtn'
import { onMounted, onUnmounted,ref } from 'vue'
import api from "@/api"
import router from "@/router";
import { useRoute } from 'vue-router';
import { useMainStore } from "@/store";


const route = useRoute()
 
const store=useMainStore()

const calendar = ref()
const focus = ref('')
const type = ref('month')
const selectedEvent = ref(null)
const selectedElement = ref(null)
const selectedOpen = ref(false)
let events = ref([])
let vuetifyStyle=null
let calendarKey=ref(0)

const typeToLabel = {
  month: 'Month',
  week: 'Week',
  day: 'Day'
}
onMounted(async () => {
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

function getStartEndDate(date, scheduled, durationMinutes) {
  const [hour, minute] = scheduled.split(":").map(Number);
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute);
  const end = new Date(start.getTime() + durationMinutes * 60000);
  return { start, end };
}


function getNextDate(date, repeatType) {
  const newDate = new Date(date); // copia per evitare side-effect
  if (repeatType === 1) newDate.setDate(newDate.getDate() + 1);
  else if (repeatType === 2) newDate.setDate(newDate.getDate() + 7);
  else if (repeatType === 3) newDate.setMonth(newDate.getMonth() + 1);
  else if (repeatType === 4) newDate.setFullYear(newDate.getFullYear() + 1);
  return newDate;
}
// ottiene tutti gli eventi e le attività dell'utente dal database
async function refresh_calendar(){
  let response_activities= await api.getActivities()
  let response_events= await api.getEvents()
  store.activities= (response_activities.success) ? response_activities.content.activities : null
  store.events= (response_events.success) ? response_events.content.events : null
 
  await api.setMenuContentActivities(store.activities)
  await api.setMenuContentEvents(store.events)
}

async function updateRange ({ start, end }) {

  events.value=[]
  console.log("before",events.value)
  await refresh_calendar()
  let all_items=[] 
   
  let start_date = new Date(start.year, start.month - 1, start.day, 0, 0, 0, 0) //obj -> Date
  let end_date = new Date(end.year, end.month - 1, end.day, 23, 59, 59, 999)


  // eventi
  if(store.events!=null){

    store.events.forEach(e => {
      // devo controllare questa variabile
      let eventStartDate=new Date(e.repeat.start_date)  //string -> Date 
      let eventEndDate=new Date(e.repeat.finish_date)
 
      let isInRange= (eventStartDate <= end_date) && (eventEndDate >= start_date)
      //  PROBLEMA DO DUPLICAZIONE DI EVENTI 
      if(isInRange){
        let x_date=eventStartDate // Date
        while(x_date<=end_date && x_date<=eventEndDate){
          let h=getStartEndDate(x_date,e.scheduled,e.duration) 
          let event={
            type:"event",
            id:e.id,
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
          all_items.push(event)
          // 0=not repeat , 1=day, 2=week, 3=month, 4=year
          if(e.repeat.type!=0){
            let y=getNextDate(new Date(x_date),e.repeat.type)  
            x_date=y
          }else{
            break;
          }
       }
      }
    }); 
  }  

  //  PROBLEMA NELLA CONCEZIONE DEGLI ORARI: IL RANGE START-END CONTROLLA ALLE 2:00:O0
  // NOI VOGLIAMO IL RANGE

   if(store.activities!=null){
      store.activities.forEach(a => {
        let activityStartDate=new Date(a.expiration)  //string -> Date 
        if(activityStartDate>=start_date && activityStartDate<=end_date){

          let activity={
            type:"activity",
            id: a.id,
            name: a.title,
            created: a.created,
            modified: a.modified,
            start: activityStartDate,
            color: a.color,  
            id_tomato:a.id_tomato,
            done: a.done
          }
          all_items.push(activity)
        }
      });

   }
 
   console.log(all_items) 
   events.value = [...all_items]
   await nextTick()
   calendar.value.checkChange()
}

function editEvent(){
  let event=selectedEvent.value
  
  if(event && event.id){
    store.editCalendarObj=event.type
    console.log("stato editCalendarObj in calendarVue",store.editCalendarObj)
    router.push({
      name: "calendarReader",
      params: {
        username: route.params.username, 
        id: event.id
      }})

    // fino a qui ci passa
    console.log("fino a qui ci arriva")
  }else{
    console.log("not a valid event")
  }
}

async function deleteEvent(){
  //robo di sicurezza per eliminare 
  let event=selectedEvent.value
  console.log(event)
  if(event && event.id){
    console.log(event.type)

    let response=null
    if(event.type=="event"){
      response=await api.deleteEvent(event.id) 
    }else if(event.type=="activity"){
      response= await api.deleteActivity(event.id)
    }else{
      console.log("not a valid object")
    }
    await refresh_calendar()
    calendarKey.value++

  }else{
    console.log("not a valid object")
  }

  selectedOpen.value=false

}
</script>

