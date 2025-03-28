# Progetto selfie 

Questo è il progetto del corso di Tecnologie Web della laurea di Informatica dell'Università di Bologna :

La repository comprende :
- client  (vue.js)
- backend  (express.js)
- db_databse (dati usati per importare il database MongoDB in locale)

# How to:

## Runnare il client

    cd client
    npm run serve
    

## Runnare il backend

    cd backend 
    node main.js

## Importare il database MongoDB in locale, e runnarlo (usando MongoDB Compass)

1. Installa MongoDB Compass
2. Apri MongoDB Compass
3. Vai nella sezione in alto a sx "Connections"
4. Vai in "Import saved Connections"
5. Inserisci il file "compass-connections.json"
6. Fai partire la connessione (ora il server funzionerà in locale nella porta )

### Per verificare che il database funzioni:
Vai nel browser e cerca localhost:27017, dovrebbe restituire il seguente messaggio:
    
>It looks like you are trying to access MongoDB over HTTP on the native driver port.

# Default json structure

> I parametri segnati con "^" sono ancora da definire 

> I campi di tipo Date non sono ancora standardizzati

    # User (documents) 
        {
            _id: ObjectID
            name: String,
            surname: String,
            username: String,
            email: String,
            display: Array,
            image: String ^,
            password: String,
            notes: Array,
            activities: Array,
            events: Array,
            tags: Array,
            tomato_sessions: Array
        }


    # Activity
        {
            id: String,
            name: String,
            expiration: Date,
            created: Date
        }


    # Event ^
        {
            id: String,
            title: String,
            created: Date
            repeat: {
                type: Int**
                start_date: Date
                finish_date: Date
            }  
        }
        ** 0=not repeat , 1=day, 2=week, 3=month, 4=year


    # Tomato
        { 
            id: String,
            name: String,
            tomato_rep: Int
            time:{
                tomato: Int,
                short_break: Int,
                long_break: Int,
            }
        }


    # Note 
        {
            id: String,
            title: String,
            date_creation: Date ,
            date_last_modifiy: Date,
            content: String ^,
            tag: String
        }