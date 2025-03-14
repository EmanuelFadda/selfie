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
    
    It looks like you are trying to access MongoDB over HTTP on the native driver port.