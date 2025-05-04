<template>
  <div>
    <div ref="googleBtn"></div>
  </div>
</template>

<script setup>
import router from "@/router"
import { onMounted, ref } from "vue"
import { useMainStore } from "@/store"


defineOptions({
  name: "GoogleSignIn",
})
const googleBtn = ref(null)
const store=useMainStore()

function handleCredentialResponse(response) {
  // salva nello store il risultato della risposta
  store.callback_token=response.credential
  router.push({ name: "callback" })
}

// carica lo script
function loadGoogleScript(callback) {
  const script = document.createElement("script")
  script.src = "https://accounts.google.com/gsi/client"
  script.async = true
  script.defer = true
  // quando viene caricato fa partire la funzione
  script.onload = callback
  document.head.appendChild(script)
}


// inizializza il bottone google
function initializeGoogleSignIn() {
  google.accounts.id.initialize({
    client_id: "434666439825-1jqh3avedfbb64stvn86fveeuai2jjc9.apps.googleusercontent.com",
    callback: handleCredentialResponse,
    ux_mode: "popup",
    auto_select: false,
  })

  google.accounts.id.renderButton(googleBtn.value, {
    type: "standard",
    theme: "filled_black",
    size: "medium",
    text: "continue_with",
    shape: "rectangular",
    logo_alignment: "left",
  })

  // Se vuoi mostrare il prompt automatico:
  // google.accounts.id.prompt();
}

// se lo script è stato caricato, inizializza il bottone, se no ricarica lo script google e inizializza il bottone
onMounted(() => {
  if (window.google && window.google.accounts) {
    initializeGoogleSignIn()
  } else {
    loadGoogleScript(initializeGoogleSignIn)
  }
})
</script>
