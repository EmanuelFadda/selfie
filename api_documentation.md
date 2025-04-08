# Selfie API documentation

> Questa documentazione è stata aggiornata il 08/04/2025, quindi non terrà conto delle modifiche fatte dai commit successivi

## Funzionamento delle chiamate in selfie_api

### Parametri delle chiamate
Tutti i parametri sono presenti nel body di una qualsiasi richiesta HTTP, mentre per identificare su quale utente si faranno le richieste si necessita del token che viene rilasciato dalla funzione "/login" (ovviamente questa non necessita di autenticazione). Il token verrà posto nell'header della chiamata HTTP. Quindi:

Per ogni chiamata all'API:

- nell'header -> token (se è richiesta l'autenticazione)
- nel body -> i parametri delle varie funzioni

###  Struttura dei messaggi di risposta dell'api:
Le risposte dell'api hanno generalmente 3 parametri: 

Prendiamo come esempio la funzione : /edit_tag
```
{
    "success": true/false                   // Successo della richiesta
    "content": null                         // Contenuto della richiesta
    "message": "Tag new was edited"         // Messaggio della richiesta*
}
```

> *Il messaggio della richiesta attualmente identifica se la richiesta è andata a buon fine o no, non ne specifica la causa.

## Struttura degli oggetti principali del progetto
### Account

```
# Struttura JSON dell'utente

{
    name: String
    surname: String,
    username: String,
    email: String,
    image: String,              // Immagine del profilo
    password: String,                       
    layout: Array,              // Gestione del layout, guarda "Layout"
    notes: Array,               // Lista delle note, guarda "Note"
    activities: Array,          // Lista delle attività, guarda "Attività"
    events: Array,              // Lista degli eventi, guarda "Eventi"
    tags: Array,                // Lista dei tag, guarda "Tags"
    tomato_sessions: Array      // Lista delle sessioni pomodoro, guarda "Tomato sessions"
}
```

### Layout
E' un array di stringhe che rappresento il modo in cui verranno disposte le figure nella home dell'utente, ogni posizione nell'array indica una posizione precisa.
```
# Esempio del parametro layout:

["calendar", "notes", "tomato"]
```
> La posizione in alto verrà occupata dal calendario , 

.................
## Funzioni API

### Account
#### POST /login
Funzione che permette l'ottenimento del token di accesso. Questo token permette l'utilizzo di tutte le altre funzioni dell'API. Il token ha durata infinita. 

##### Parametri:

- Body : username, password 
- Header : none
---
#### GET /get_account
Funzione che viene usata per ottenere alcune informazioni dell'utente

##### Parametri:

- Body : none
- Header : token
--- 
#### POST /create_account
Funzione che crea l'account

##### Parametri:

- Body : name,surname,username,email,image,password
- Header : token
--- 
#### DELETE /delete_account
Funzione che elimina l'account dell'utente loggato

##### Parametri:

- Body : none
- Header : token
--- 
#### POST /edit_account
Funzione che modifica l'account dell'utente loggato
##### Parametri:
- Body : old_username, new_name, new_surname, new_username, new_email,new_image, new_password
- Header : token
--- 
### Note

#### GET /get_notes
Restituisce tutte le note dell'utente loggato

##### Parametri:
- Body : none
- Header : token
--- 
#### POST /create_note
Crea una nota nell'account dell'utente loggato
##### Parametri:
- Body : title,content,tag
- Header : token
--- 
#### DELETE /delete_note
Elimina la nota identificata con l'id dell'utente loggato
##### Parametri:
- Body : id
- Header : token
--- 
#### POST /edit_note
Modifica la nota identificata con l'id dell'utente loggato
##### Parametri:
- Body : id,new_title,new_content,new_tag
- Header : token
--- 
### Tags
#### POST /create_tag
Crea un tag nell'account dell'utente loggato
##### Parametri:
- Body : name,color
- Header : token
--- 
#### POST /edit_tag
Modifica il tag identificato dal parametro "name", dell'account dell'utente loggato
##### Parametri:
- Body : name,new_name,new_color
- Header : token
---
#### DELETE /delete_tag
Elimina il tag identificato dal parametri "name", dell'account dell'utente loggato
##### Parametri:
- Body : name
- Header : token
--- 
### Attività
#### GET /get_activities
Restituisce tutte le attività dell'utente loggato
##### Parametri:

- Body : none
- Header : token
--- 
#### POST /create_activity
Crea un attività nell'account dell'utente loggato
##### Parametri:
- Body : name, expiration
- Header : token
--- 
#### DELETE /delete_activity
Elimina l'attività identificata dal parametro id, dell'utente loggato
##### Parametri:
- Body : id
- Header : token
--- 
#### POST /edit_activity
Modifica l'attività identifica dal parametro id, dell'utente loggato
##### Parametri:
- Body : id, new_name, changed, new_expiration, new_done
- Header : token
--- 

### Sessioni pomodoro
#### GET /get_tomato_sessions
Restituisce tutte le sessioni pomodoro dell'utente loggato
##### Parametri:

- Body : none
- Header : token
---
#### POST /create_tomato
Crea una sessione pomodoro nell'account dell'utente loggato
##### Parametri:
- Body : name, rep_tomato, time_tomato, time_short_break, time_long_break
- Header : token
--- 
#### DELETE /delete_tomato
Elimina la sessione pomodoro identificata dal parametro id, dell'utente loggato
##### Parametri:
- Body : id
- Header : token
--- 
#### POST /edit_tomato
Modifica la sessione pomodoro identifica dal parametro id, dell'utente loggato
##### Parametri:
- Body :id, new_name, new_rep_tomato, new_time_tomato, new_short_break,new_long_break
- Header : token
---

### Eventi
#### GET /get_events
Restituisce tutti gli eventi dell'utente loggato
##### Parametri:

- Body : none
- Header : token
---
#### POST /create_event
Crea un evento nell'account dell'utente loggato
##### Parametri:
- Body : title, repeat_type, repeat_start_date, repeat_finish_date
- Header : token
--- 
#### DELETE /delete_event
Elimina l'evento identificato dal parametro id, dell'utente loggato
##### Parametri:
- Body : id
- Header : token
--- 
#### POST /edit_event
Modifica l'evento identifico dal parametro id, dell'utente loggato
##### Parametri:
- Body: id, new_title, new_repeat_type, new_repeat_start_date, new_repeat_finish_date
- Header : token
---

### Layout

#### POST /edit_layout (deprecato)
Modifica il layout dell'utente loggato

##### Parametri
- Body: username,layout  
- Header : token
---
