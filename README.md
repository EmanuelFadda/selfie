# Progetto selfie 

Questo è il progetto del corso di Tecnologie Web della laurea di Informatica dell'Università di Bologna :

La repository comprende :
- client  (vue.js)
- backend  (express.js)


# How to:

## Runnare il client

    cd client
    npm run serve
    

## Runnare il backend

    cd backend 
    node main.js


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
            layout: Array,
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