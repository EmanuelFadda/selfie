// about database and collection
const DB_NAME='user'
const COLLECTION_NAME='user'
const DB_URL="mongodb://localhost:27017/"

// about default tags
const TAGS=["Hobby","Gym","Study"]

// about default note
const NOTE_TITLE="Benvenuto"
const NOTE_CONTENT="Heylaaaa!!! Qui puoi organizzare la tua vita universitaria facilmente! \nScrivi una nota, inserisci al calendario eventi o attività, oppure usa il timer pomodoro. \n Have fun and keep working :)\n\n... dagli sviluppatori di Selfie"
const NOTE_TAG="Study"

// about default tomato
const TOMATO_NAME="Standard"
const TOMATO_REP=3
const TOMATO_TIME=15
const TOMATO_SHORT_BREAK=5
const TOMATO_LONG_BREAK=15

module.exports={
    DB_URL,
    DB_NAME,
    COLLECTION_NAME,
    NOTE_CONTENT,
    NOTE_TITLE,
    NOTE_TAG,
    TOMATO_NAME,
    TOMATO_REP,
    TOMATO_SHORT_BREAK,
    TOMATO_TIME,
    TOMATO_LONG_BREAK,
    TAGS
}