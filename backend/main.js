const { MongoClient } = require("mongodb")
const express = require("express")

const db_url = require("./defaults").DB_URL
const body_parser = require("body-parser")
const cors = require("cors")
const { login, get_account, create_account, delete_account, edit_account, edit_layout } = require("./api_functions/account")
const { get_notes, create_note, delete_note, edit_note } = require("./api_functions/objects/note")
const { create_tag, edit_tag, delete_tag,get_tags } = require("./api_functions/objects/tag")
const { create_activity, delete_activity, edit_activity, get_activities } = require("./api_functions/objects/activity")
const { create_tomato, delete_tomato, edit_tomato, get_tomato_sessions } = require("./api_functions/objects/tomato")
const { create_event, delete_event, edit_event, get_events } = require("./api_functions/objects/event")

const app = express()
const port = 3000

const client = new MongoClient(db_url)

app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: true }))
app.use(
  cors({
    // permette le richieste cross-origin
    origin: "http://localhost:8080", // porta del frontend
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization, token",
  })
)

// all api actions
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

//user
app.post("/login", async (req, res) => login(client, req, res))
app.get("/get_account", async (req, res) => get_account(client, req, res))
app.post("/create_account", async (req, res) => create_account(client, req, res))
app.delete("/delete_account", async (req, res) => delete_account(client, req, res))
app.post("/edit_account", async (req, res) => edit_account(client, req, res))
app.post("/edit_layout", async (req, res) => edit_layout(client, req, res))

app.get("/get_notes", async (req, res) => get_notes(client, req, res))
app.post("/create_note", async (req, res) => create_note(client, req, res))
app.delete("/delete_note", async (req, res) => delete_note(client, req, res))
app.post("/edit_note", async (req, res) => edit_note(client, req, res))

app.get("/get_tags", async (req, res) => get_tags(client, req, res))
app.post("/create_tag", async (req, res) => create_tag(client, req, res))
app.post("/edit_tag", async (req, res) => edit_tag(client, req, res))
app.delete("/delete_tag", async (req, res) => delete_tag(client, req, res))
// activity
app.post("/create_activity", async (req, res) => create_activity(client, req, res))
app.delete("/delete_activity", async (req, res) => delete_activity(client, req, res))
app.post("/edit_activity", async (req, res) => edit_activity(client, req, res))
app.get("/get_activities", async (req, res) => get_activities(client, req, res))

// tomato
app.post("/create_tomato", async (req, res) => create_tomato(client, req, res))
app.delete("/delete_tomato", async (req, res) => delete_tomato(client, req, res))
app.post("/edit_tomato", async (req, res) => edit_tomato(client, req, res))
app.get("/get_tomato_sessions", async (req, res) => get_tomato_sessions(client, req, res))

// event
app.post("/create_event", async (req, res) => create_event(client, req, res))
app.delete("/delete_event", async (req, res) => delete_event(client, req, res))
app.post("/edit_event", async (req, res) => edit_event(client, req, res))
app.get("/get_events", async (req, res) => get_events(client, req, res))
