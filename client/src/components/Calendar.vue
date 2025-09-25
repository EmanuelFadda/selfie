<template>

<v-sheet>
  <v-toolbar >
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
      <v-icon > mdi-chevron-right </v-icon>
    </v-btn>
    <v-toolbar-title v-if="calendar">
        {{ calendar.title }} 
    </v-toolbar-title>
        <v-icon-btn icon="mdi-calendar"
      class="border-0"
      color="grey-darken-2"
      variant="outlined"
      @click="setToday"
    />

    <v-menu >
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


  <!-- date picker ... -->


</v-sheet>


<v-sheet>
  <!-- calendario -->
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

  <!-- modal che esce quando clicchi l'evento -->
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

</template>

<script setup>
import { VCalendar } from "vuetify/lib/labs/VCalendar";
import { VBtn, VIcon, VToolbar, VSheet } from 'vuetify/components'
import { nextTick } from "vue";
import { VIconBtn } from 'vuetify/labs/VIconBtn'
import { onMounted, onUnmounted,ref } from 'vue'
import api from "@/api"

const store=useMainStore()
import { useMainStore } from "@/store";

const calendar = ref()
const focus = ref('')
const type = ref('week')
const selectedEvent = ref({})
const selectedElement = ref(null)
const selectedOpen = ref(false)
let events = ref([])
let vuetifyStyle=null


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



// ottiene tutti gli eventi e le attività dell'utente dal database
async function refresh_calendar(){
  let response_activities= await api.getActivities()
  let response_events= await api.getEvents()

  store.activities= (response_activities.success) ? response_activities.content.activities : null
  console.log(store.activities)
  
  store.events= (response_events.success) ? response_events.content.events : null

}

async function updateRange ({ start, end }) {

  events.value=[]
  console.log("before",events.value)
  await refresh_calendar()
  let all_items=[] 
   
  await nextTick() 
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
          // RICORDA: DA GESTIRE IL CASO IN CUI L'ATTIVITA' SIA TUTTO IL GIORNO 
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

  console.log(1, start_date,end_date)
   if(store.activities!=null){
      console.log("aaaaaaaa")
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
          console.log(2,activity.start,activity.end)
          all_items.push(activity)
        }
      });

   }
 
   console.log(all_items)
   events.value = [...all_items]
   


  /*

  */

}

// per far capire alla view successiva che tipo di oggetto sto modificando -> store.editCalendarObj="event" ||  "activity"
</script>

