# Selfie API documentation

> Questa documentazione è stata aggiornata il 12/04/2025, quindi non terrà conto delle modifiche fatte dai commit successivi




## Funzionamento delle chiamate in selfie_api

### Parametri delle chiamate
Tutti i parametri sono presenti nel body di una qualsiasi richiesta HTTP, mentre per identificare su quale utente si faranno le richieste si necessita del token che viene rilasciato dalla funzione "/login" (ovviamente questa non necessita di autenticazione). Il token verrà posto nell'header della chiamata HTTP. Quindi:

Per ogni chiamata ci saranno i seguenti parametri:

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

> *Il messaggio della richiesta attualmente identifica se la richiesta è andata a buon fine o no, non specifica la causa dell'errore.

## Struttura degli oggetti principali del progetto
### Account

```
# Struttura JSON dell'utente

{
    credentials: Object,        // Credenziali dell'utente, guarda "Credentials"
    menù: Object                // Gestione della schermata principale, guarda "Menù"
    notes: Array,               // Lista delle note, guarda "Notes"
    activities: Array,          // Lista delle attività, guarda "Activities"
    events: Array,              // Lista degli eventi, guarda "Events"
    tags: Array,                // Lista dei tag, guarda "Tags"
    tomato_sessions: Array      // Lista delle sessioni pomodoro, guarda "Tomato sessions"
}
```

#### POST /login
Funzione che permette l'ottenimento del token di accesso. Questo token permette l'utilizzo di tutte le altre funzioni dell'API. Il token ha durata infinita. 

##### Parametri:

- Body : username, password 
- Header : none
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
### Credentials
Oggetto dell'utente che identifica le sue credenziali. Queste vengono inserite per la prima volta nella registrazione. 

I campi per l'accesso dell'utente sono l'username e la sua password

```
credentials {
    name: String,                       // Nome 
    surname: String,                    // Cognome 
    username: String,                   // Username
    email: String,                      // Email
    image: String,                      // Immagine profilo
    password: String                    // Password
}
```
#### GET /get_credentials
Restituisce le credenziali dell'utente loggato
##### Parametri:

- Body : none
- Header : token
---
#### POST /set_credentials
Modifica le credenziali dell'utente loggato
##### Parametri:

- Body : new_name,new_surname,new_username,new_email,new_image,new_password,new_birthday
- Header : token
---

### Menù
Oggetto dell'utente a cui fa riferimento la schermata principale dell'applicazione web di selfie per la visualizzazione in anterprima dei contenuti.

```
menù {
    layout: Array,              // Layout della schermata principale 
    content: {                  // Contenuto di questa sezione dipenderà dall'applicazione web 
        activities  
        events 
        notes 
        tomato_sessions 
    }
}

```
> Per questioni di riutilizzabilità del backend, questo non impone nè il tipo dei parametri nè cosa mettere all'interno dei vari parametri del content. 

#### Layout
E' un array di stringhe che rappresenta il modo in cui verranno disposte le figure nella home dell'utente, ogni posizione nell'array indica una posizione precisa.
```
# Esempio del parametro layout:

["calendar", "notes", "tomato"]
```
#### Content
Il contenuto di content dipende dalle scelte implementative del menù principale del client. Il frontend gestisce cosa mettere in base alle necessità, questo per garantire una flessibilità nell'utilizzo dell'API. 

Nel nostro progetto selfie teniamo nei singoli campi:
- "activities" e "events" sarà il contenuto della sezione "calendar" del layout:
    - "events" : terrà tutti gli eventi degli ultimi giorni
    - "activities" : terrà un massimo di 5 attività , con priorità quelle già scadute 
- "tomato_sessions" sarà il contenuto della sezione "tomato" del layout, e terrà l'ultimo pomodoro (ovvero l'ultimo creato)
- "notes", sarà il contenuto di "notes" del layout, e terrà l'ultima nota creata



#### GET /get_menu
Restituisce il menù dell'utente loggato
##### Parametri:

- Body : none
- Header : token
---
#### POST /set_menu/layout
Modifica il layout dell'utente loggato
##### Parametri:

- Body : new_layout
- Header : token
---
#### POST /set_menu/content/activities
Modifica il content nella sezione "activities" dell'utente loggato
##### Parametri:

- Body : new_activities
- Header : token
---
#### POST /set_menu/content/events
Modifica il content nella sezione "events" dell'utente loggato
##### Parametri:

- Body : new_events
- Header : token
---
#### POST /set_menu/content/tomatoes
Modifica il content nella sezione "tomato_sessions" dell'utente loggato
##### Parametri:

- Body : new_tomatoes
- Header : token
---
#### POST /set_menu/content/notes
Modifica il content nella sezione "notes" dell'utente loggato
##### Parametri:

- Body : new_notes
- Header : token
---

### Notes 
E' l'array che contiene l'insieme di note dell'utente. Al momento della registrazione l'utente avrà la sua prima nota di benvenuto.

Ecco il contenuto di una singola nota:
```
{
    id: String,                     // Id con cui verrà identificata la nota
    title: String,                  // Titolo della nota
    date_creation: Date,            // Data della creazione della nota
    date_last_modify: Date,         // Data dell'ultima modifica
    content: String,                // Contenuto della nota
    tag: Object                     // Nome del tag 
}
```
> Le note avranno solo un singolo tag

> Essendo che l'id è generato in maniera casuale, questo si distinguerà ogni volta che si creerà una nota, dando la possibilità di implementare funzioni come la duplicazione delle note.

#### GET /get_notes
Restituisce tutte le note dell'utente loggato

##### Parametri:
- Body : none
- Header : token
--- 
#### GET /get_note
Restituisce la nota identificata dall'id,  dell'utente loggato

##### Parametri:
- Body : id
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
---
### Activities 
E' l'array che conterrà l'insieme delle attività dell'utente. Le attività sono delle occorrenze che indicano le cose che vanno svolte entro un determinata data, segnata dal campo "expiration". Per indicare che un attività è stata svolta o no viene utilizzato il campo "done"
```
{
    id: String,             // Identificativo dell'attività
    name: String,           // Nome dell'attività
    expiration: Date,       // Data di scadenza
    created: Date,          // Data di creazione
    done: Boolean,          // Variabile per indicare se è stata svolta o no
} 
```
#### GET /get_activities
Restituisce tutte le attività dell'utente loggato
##### Parametri:

- Body : none
- Header : token
--- 
#### GET /get_activity
Restituisce una singola attività dato l'id, dell'account dell'utente loggato
##### Parametri:

- Body : id
- Header : token
--- 
#### POST /create_activity
Crea un attività nell'account dell'utente loggato
##### Parametri:
- Body : name, expiration
- Header : token
--- 
#### DELETE /delete_activity
Elimina l'attività identificata dal parametro id, dell'account dell'utente loggato
##### Parametri:
- Body : id
- Header : token
--- 
#### POST /edit_activity
Modifica l'attività identifica dal parametro id, dell'account dell'utente loggato
##### Parametri:
- Body : id, new_name, changed, new_expiration, new_done
- Header : token
--- 

### Events
E' l'array che conterrà l'insieme di eventi dell'utente. Gli eventi sono delle occorrenze che indicano degli impegni nel calendario, questi possono essere ripetuti per giorno,mese,settimana e anno. 

```
{
    id: String,                 // Id con cui verrà identificato l'evento
    title: String,              // Titolo della nota
    created: Date,              // Data di creazione
    repeat: {                   
      type: Integer,            // 0=not repeat , 1=day, 2=week, 3=month, 4=year
      start_date: Date,         // Data inizio ripetizione
      finish_date: Date,        // Data fine ripetizione
    },
  }
```
#### GET /get_events
Restituisce tutti gli eventi dell'utente loggato
##### Parametri:

- Body : none
- Header : token
---
#### GET /get_event
Restituisce uno specifico evento dato l'id, dell'account dell'utente loggato
##### Parametri:

- Body : id
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
### Tags
E' l'array che conterrà l'insieme dei tag dell'utente. Servono per raggruppare le note dell'utente in categorie. L'utente alla registrazione avrà 3 tag iniziali.

Ecco il contenuto del tag
```
{
    name: String,       // Nome identificativo del tag
    color: String,      // Colore del tag
}
```
> I tag non avendo l'id a differenza degli altri oggetti, devono avere nomi diversi

#### GET /get_tags
Restituisce tutti i tag dell'utente, dell'account dell'utente loggato
##### Parametri:

- Body : none
- Header : token
--- 
#### GET /get_tag
Restituisce un singolo tag dato il nome, dell'account dell'utente loggato
##### Parametri:
- Body : name
- Header : token
--- 
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
### Tomato sessions
E' l'array che conterrà l'insieme delle sessioni di studio con il metodo del pomodoro. 

Il metodo del pomodoro è una tecnica di studio che consiste nella suddivisione del tempo nel seguente modo:

Dato :
- rep_tomato = numero di pomodori
- tomato = tempo pomodoro
- short_break = tempo pausa breve
- long_break =  tempo pausa lunga

In sequenza avvengono:
1) tomato + short_break per (rep_tomato-1) volte
2) tomato 
3) long_break  

Quindi il tempo totale sarà 

$$
(\text{tomato} + \text{short\_break}) \times (\text{rep\_tomato} - 1) + \text{tomato} + \text{long\_break}
$$

```
{
    id: String,                 // Identificativo della sessione 
    name: String,               // Nome della sessione
    rep_tomato: Integer,        // Numero di pomodori
    time: {
      tomato: Integer,          // Tempo del pomodoro
      short_break: Integer,     // Tempo della pausa breve
      long_break: Integer       // Tempo della pausa lunga
    }
  }

```

#### GET /get_tomatoes
Restituisce tutte le sessioni pomodoro dell'account dell'utente loggato
##### Parametri:

- Body : none
- Header : token
---
#### GET /get_tomato
Restituisce una  sessione pomodoro dato l'id,  dell'account dell'utente loggato
##### Parametri:

- Body : id
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


### Layout

#### POST /edit_layout (deprecato)
Modifica il layout dell'utente loggato

##### Parametri
- Body: layout  
- Header : token
---
