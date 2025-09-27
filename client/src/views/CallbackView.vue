<template>connecting...</template>

<script setup>
import { ref, onMounted } from "vue"
import { useMainStore } from "@/store"
import api from "@/api"
import router from "@/router"
import { onBeforeRouteLeave } from "vue-router"

const store = useMainStore()
const token = ref("")

function decodeJWT(token) {
  const base64Url = token.split(".")[1]
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
  const payload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(""),
  )

  return JSON.parse(payload)
}

onMounted(() => {
  token.value = store.callback_token
  let decode = decodeJWT(token.value)
  google_login(decode)
})

onBeforeRouteLeave(() => {
  store.$reset()
})

async function google_login(decode) {
  const object_query = {
    "credentials.email": decode.email,
    "credentials.login": "1",
  }

  const response = await api.login(object_query)
 
  if (response.content != null) {
    localStorage.setItem("token", response.content)

    router.push(`/${decode.given_name + decode.family_name}`)
  } else {
    // si creano tutti i parametri da spedire alla creazione dell'account

    store.name = decode.given_name
    store.surname = decode.family_name
    store.email = decode.email
    store.username = decode.given_name + decode.family_name

    // scarica l'immagine da google 
    const response=await fetch(decode.picture)
    const imageBlob= await response.blob()
    const img= URL.createObjectURL(imageBlob)
    
    store.image = img
    store.login = 1

    router.push({ path: "/register", query: { type: 1 } })
  }
}




</script>

<!-- 

Perchè è stata creata questa view?
Google necessità di avere una route a cui indirizzare i dati di risposta, se no non può passare i dati,  e si tende a inserire una route di callback "/callback" 
Da qui in poi si gestiscono le risposte :

-> se l'utente esiste, si logga
-> se non esiste, si fa nella pagina di registrazione dove si potrà completare la creazione dell'account

-->
