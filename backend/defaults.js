env = require("dotenv").config()
// about database and collection
const DB_NAME = process.env.DB_NAME
const COLLECTION_NAME = process.env.COLLECTION_NAME
const DB_URL = process.env.DB_URL
const SECRET_KEY = process.env.SECRET_KEY

// about default tags
const TAGS_NAMES = ["Hobby", "Gym", "Study"]
const TAGS_COLORS = ["red", "blue", "yellow"]

// about default note
const NOTE_TITLE = "Benvenuto"
const NOTE_CONTENT = "Heylaaaa!!! Qui puoi organizzare la tua vita universitaria facilmente! \nScrivi una nota, inserisci al calendario eventi o attività, oppure usa il timer pomodoro. \n Have fun and keep working :)\n\n... dagli sviluppatori di Selfie"
const NOTE_TAG = "Study"

// about default tomato
const TOMATO_NAME = "Standard"
const TOMATO_DONE = 0
const TOMATO_REP = 4
const TOMATO_TIME = 15
const TOMATO_SHORT_BREAK = 5
const TOMATO_LONG_BREAK = 15

// about default activity
const ACTIVITY_TITLE= "Sessione di studio"
const ACTIVITY_COLOR="red"
const ACTIVITY_ID_TOMATO=null

// about default event
const EVENT_TITLE="Benvenuto! Ecco il tuo primo evento 🎉"
const EVENT_DURATION=30
const EVENT_SCHEDULED="10:00"
const EVENT_COLOR="green"
const EVENT_TYPE_REP=0

// about default layout
const LAYOUT = ["calendar", "notes", "tomato"]

module.exports = {
  DB_URL,
  DB_NAME,
  COLLECTION_NAME,
  NOTE_CONTENT,
  NOTE_TITLE,
  NOTE_TAG,
  ACTIVITY_TITLE,
  ACTIVITY_COLOR,
  ACTIVITY_ID_TOMATO,
  EVENT_TITLE,
  EVENT_DURATION,
  EVENT_SCHEDULED,
  EVENT_COLOR,
  EVENT_TYPE_REP,
  TOMATO_NAME,
  TOMATO_DONE,
  TOMATO_REP,
  TOMATO_SHORT_BREAK,
  TOMATO_TIME,
  TOMATO_LONG_BREAK,
  TAGS_NAMES,
  TAGS_COLORS,
  LAYOUT,
  SECRET_KEY,
}
