<template>
  <Navbar viewTitle="Calendario" :titleColor="classColor" :backButton="true" :myButton="aggiungiCalendario" :backRoute="`/${store.user.username}/calendar`"></Navbar>

  <div class="ml-5 mr-5 h-[calc(100vh-108px)] rounded-2xl lg:h-[calc(100vh-132px)] dark:bg-neutral-800">


    <!-- Content -->
    <div class="relative ml-[18px] mr-[18px] pt-5">
        <!-- switch per capire se è evento oppure attività
        
        BISOGNA MODIFICARE NEL CASO NON SIA UN ADD MA UNA MODIFICA, RENDERE LO SWITCH FISSO
        
    -->
        <div class="flex justify-center">
            <span
                @click="isEvent = true"
                class="inline-flex items-center rounded-s-lg px-4 py-1 text-sm font-medium border-2 border-e-0 cursor-pointer"
                :class="isEvent ? 'bg-blue-500 text-blue-300 dark:text-blue-400 border-blue-500' : 'bg-neutral-800 text-neutral-300 border-neutral-700'"
            >
                Evento
            </span>
            <span
                @click="isEvent = false"
                class="inline-flex items-center rounded-e-lg px-4 py-1 text-sm font-medium border-2 border-s-0 cursor-pointer"
                :class="!isEvent ? 'bg-blue-500 text-blue-300 dark:text-blue-400 border-blue-500' : 'bg-neutral-800 text-neutral-300 border-neutral-700'"
            >
                Attività
            </span>
        </div>


        <div v-if="isEvent">
            <!-- evento -->
            <!-- Title -->
            <div class="relative ml-[18px] mr-[18px] pt-5">
            <input v-model="formEvent.title" name="title" id="title" class="peer block w-full appearance-none rounded-xl border-2 border-neutral-700 bg-neutral-800 p-2.5 pl-3.5 pr-3.5 text-xl font-semibold outline-0" placeholder="" />
            <label for="title" class="pear-focus:text-neutral-300 absolute start-1 top-2 z-10 mt-2.5 origin-[0] -translate-y-3 translate-x-1.5 scale-75 transform rounded-xl bg-neutral-800 px-2 text-xl font-medium duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-3 peer-focus:translate-x-1.5 peer-focus:scale-75 peer-focus:px-2">Titolo</label>
            </div>

            <div class="relative ml-[18px] mr-[18px] pt-5">
            <input step="300" v-model="formEvent.start_datetime" name="start_event" id="start_event" type="datetime-local" class="peer block w-full appearance-none rounded-xl border-2 border-neutral-700 bg-neutral-800 p-2.5 text-sm font-semibold text-neutral-200 outline-0"/>
            <label for="start_event" class="absolute start-1 top-2 z-10 mt-2.5 origin-[0] -translate-y-3 translate-x-1.5 scale-75 transform rounded-xl bg-neutral-800 px-2 text-sm font-medium duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-3 peer-focus:translate-x-1.5 peer-focus:scale-75 peer-focus:px-2">    Inizio evento</label>
            </div>

            <div class="relative ml-[18px] mr-[18px] pt-5">
            <input step="300" v-model="formEvent.end_datetime" name="end_event" id="end_event" type="datetime-local" class="peer block w-full appearance-none rounded-xl border-2 border-neutral-700 bg-neutral-800 p-2.5 text-sm font-semibold text-neutral-200 outline-0" />
            <label for="end_event" class="absolute start-1 top-2 z-10 mt-2.5 origin-[0] -translate-y-3 translate-x-1.5 scale-75 transform rounded-xl bg-neutral-800 px-2 text-sm font-medium duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-3 peer-focus:translate-x-1.5 peer-focus:scale-75 peer-focus:px-2">
                Fine evento
            </label>
            </div>

            <div class="relative ml-[18px] mr-[18px] pt-5">
            <input  v-model="formEvent.color" type="color" id="color-event" class="peer block w-16 h-10 rounded-xl border-2 border-neutral-700 bg-neutral-800 cursor-pointer" />
            <label for="color-event" class="absolute start-1 top-2 z-10 mt-2.5 origin-[0] -translate-y-3 translate-x-1.5 scale-75 transform bg-neutral-800 px-2 text-sm font-medium duration-300 peer-focus:top-2 peer-focus:-translate-y-3 peer-focus:translate-x-1.5 peer-focus:scale-75 peer-focus:px-2 text-neutral-300">
                Colore
            </label>
            </div>


            <div class="relative ml-[18px] mr-[18px] pt-5">
                <select v-model="formEvent.repeat_type" id="repeat-type"  class="peer block w-full appearance-none rounded-xl border-2 border-neutral-700 bg-neutral-800 p-2.5 text-sm font-semibold text-neutral-200 outline-0">
                    <option value="0">Nessuna</option>
                    <option value="1">Giornaliera</option>
                    <option value="2">Settimanale</option>
                    <option value="3">Mensile</option>
                    <option value="4">Annuale</option>
                </select>
                <label for="repeat-type" class="absolute start-1 top-2 z-10 mt-2.5 origin-[0] -translate-y-3 translate-x-1.5 scale-75 transform rounded-xl bg-neutral-800 px-2 text-sm font-medium duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-3 peer-focus:translate-x-1.5 peer-focus:scale-75 peer-focus:px-2">
                    Ripetizione
                </label>
            </div>

            <div class="relative ml-[18px] mr-[18px] pt-5">
            <input  :disabled="formEvent.repeat_type==0" v-model="formEvent.end_repeat_date" name="end_event" id="end_repeat_event" type="datetime" class="peer block w-full appearance-none rounded-xl border-2 border-neutral-700 bg-neutral-800 p-2.5 text-sm font-semibold text-neutral-200 outline-0" />
            <label for="end_repeat_event" class="absolute start-1 top-2 z-10 mt-2.5 origin-[0] -translate-y-3 translate-x-1.5 scale-75 transform rounded-xl bg-neutral-800 px-2 text-sm font-medium duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-3 peer-focus:translate-x-1.5 peer-focus:scale-75 peer-focus:px-2">
                Si ripete fino
            </label>
            </div>

        </div>
        <div v-else>
            <!-- attività-->
            <div class="relative ml-[18px] mr-[18px] pt-5">
            <input v-model="formActivity.title" name="title" id="title" class="peer block w-full appearance-none rounded-xl border-2 border-neutral-700 bg-neutral-800 p-2.5 pl-3.5 pr-3.5 text-xl font-semibold outline-0" placeholder="" />
            <label for="title" class="pear-focus:text-neutral-300 absolute start-1 top-2 z-10 mt-2.5 origin-[0] -translate-y-3 translate-x-1.5 scale-75 transform rounded-xl bg-neutral-800 px-2 text-xl font-medium duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-3 peer-focus:translate-x-1.5 peer-focus:scale-75 peer-focus:px-2">Titolo</label>
            </div>

            <div class="relative ml-[18px] mr-[18px] pt-5">
            <input v-model="formActivity.expiration" name="start_event" id="start_event" type="date" class="peer block w-full appearance-none rounded-xl border-2 border-neutral-700 bg-neutral-800 p-2.5 text-sm font-semibold text-neutral-200 outline-0"/>
            <label for="start_event" class="absolute start-1 top-2 z-10 mt-2.5 origin-[0] -translate-y-3 translate-x-1.5 scale-75 transform rounded-xl bg-neutral-800 px-2 text-sm font-medium duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-3 peer-focus:translate-x-1.5 peer-focus:scale-75 peer-focus:px-2"> Data di scadenza</label>
            </div>

            <div class="relative ml-[18px] mr-[18px] pt-5">
            <input v-model="formActivity.color" type="color" id="color-event" class="peer block w-16 h-10 rounded-xl border-2 border-neutral-700 bg-neutral-800 cursor-pointer" />
            <label for="color-event" class="absolute start-1 top-2 z-10 mt-2.5 origin-[0] -translate-y-3 translate-x-1.5 scale-75 transform bg-neutral-800 px-2 text-sm font-medium duration-300 peer-focus:top-2 peer-focus:-translate-y-3 peer-focus:translate-x-1.5 peer-focus:scale-75 peer-focus:px-2 text-neutral-300">
                Colore
            </label>
            </div>
        </div>

    </div>
    


  </div>
</template>

<script setup>

/*

{
evento

    title: title,
    scheduled: scheduled, //ora di inzio
    duration: duration,   // durata dell'evento
    color: color,
    repeat: {
      type: type_rep,
      start_date: start,
      finish_date: finish,
    

attività:

    title: title,
    expiration: expiration,
    color: color,
  };
*/ 


import Navbar from "@/components/Navbar.vue"
import { useMainStore } from "@/store"
import { useRoute } from "vue-router"
import router from "@/router"
import { ref, onMounted, onUnmounted } from "vue"
import api from "@/api"

const store = useMainStore()
const route = useRoute()

const classColor = "text-blue-300 dark:text-blue-400"
const isEvent=ref(true)
const formEvent=ref({})
const formActivity= ref({})



function getNow() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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

// bottone che ti permette sia di aggiungere se siamo "/username/new" oppure la crea "/username/idNota"
const aggiungiCalendario = {
  exist: true,
  paths: ["m4.5 12.75 6 6 9-13.5"],
  function: async () => { 
    if (route.params.id === "new") {
      if(isEvent.value==true){
        alert("isEvent",isEvent.value)
        // si crea un evento
        // title,created,modified,scheduled,duration,color, repeat_type,repeat_start_date,repeat_finish_date

        // dall'input datetime dobbiamo ricavare orario,durata e giorni

        // inizio e fine della ripetizione 
        const repeat_start_date=formEvent.value.start_datetime.split("T")[0];
        const repeat_end_date= formEvent.value.repeat_type==0 ? repeat_start_date : formEvent.value.end_datetime.split("T")[0]
        
        // orario
        const scheduled = formEvent.value.start_datetime.split("T")[1];



        //durata in minuti 
        const start = new Date(formEvent.value.start_datetime);
        const end = new Date(formEvent.value.end_datetime);

        const diffMs = end - start;
        const diffMinutes = Math.floor(diffMs / (1000 * 60));

        console.log("millisecondi",diffMs)
        console.log("diff minuti",diffMinutes)

        // DA MODIFICARE LE DATE PER LA TIMEMACHINE
        console.log([
          formEvent.value.title,
          getNow(),
          getNow(),
          scheduled,
          diffMinutes,
          formEvent.value.color,
          formEvent.value.repeat_type,
          repeat_start_date, repeat_end_date]
        )

        await api.createEvent(
          formEvent.value.title,
          getNow(),
          getNow(),
          scheduled,
          diffMinutes,
          formEvent.value.color,
          formEvent.value.repeat_type,
          repeat_start_date, repeat_end_date
        )

      }else{
        // si crea una attività
        // title,expiration,created,modified,color,id_tomato
        await api.createActivity(formActivity.value.title,formActivity.value.expiration,getNow(),getNow(),formActivity.value.color,null)

      }
    } else {
     // await api.editNote(currentNote.value.id, currentNote.value.title, currentNote.value.content, selected.value, new Date().toISOString())
    }

    // refresh
    store.events=[]
    store.activities=[]
    router.go(-1)
  },
}

onUnmounted(()=>{
    store.editCalendarObj=null

})


onMounted(async () => {
  if (route.params.id === "new") {
    // caso in cui devi creare un evento

   formEvent.value={
    title:"Nuovo evento",
    start_datetime: getNow(),
    end_datetime:getNow(),
    color:"green",
    repeat_type:0,
    end_repeat_date:getToday()

   }

   formActivity.value={
    title:"Nuova attività",
    expiration:getToday(),
    color: "red"
   }

  } else {      
    // caso in cui ne devi modificare uno: verifichi se sia un evento o un'attività
    if(store.editCalendarObj="event"){
        const e = store.events.find(e => e.id === route.params.id);

        // bisogna ottenere il tempo di fine 
        let start,end=getStartEndDate(new Date(e.repeat.start_date),e.scheduled,e.duration)
        formEvent.value={
            title: e.title,
            start_datetime:start,
            end_datetime:end,
            color:e.color,
            repeat_type:0,
            repeat_end_date
        }
    }else if(store.editCalendarObj="activity"){
        const a = store.activities.find(a => a.id === route.params.id);

        formActivity.value={
          title:a.title,
          expiration:a.expiration,
          color:a.color
        }

    }

  }

})


</script>

<style scoped>


::-webkit-scrollbar {
  height:0px;
}
</style>
