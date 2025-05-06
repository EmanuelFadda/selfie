const { MongoClient } = require("mongodb")
const express = require("express")
const db_url = require("./defaults").DB_URL
const body_parser = require("body-parser")
const cors = require("cors")
const multer=require("multer")

const file_size=5000*1024 //2MB
const upload=multer(
  {
    storage:multer.memoryStorage(),
    limits: { fileSize: file_size  }
  }
)

const { login, create_account, delete_account } = require("./api_functions/account")
const { get_notes, create_note, delete_note, edit_note, get_note } = require("./api_functions/objects/note")
const { create_tag, edit_tag, delete_tag, get_tags, get_tag } = require("./api_functions/objects/tag")
const { create_activity, delete_activity, edit_activity, get_activities, get_activity } = require("./api_functions/objects/activity")
const { create_tomato, delete_tomato, edit_tomato, get_tomatoes, get_tomato } = require("./api_functions/objects/tomato")
const { create_event, delete_event, edit_event, get_events, get_event } = require("./api_functions/objects/event")
const { get_credentials, set_credentials } = require("./api_functions/objects/credentials")
const { get_menù, set_menù_content_events, set_menù_content_activities, set_menù_content_tomatoes, set_menù_layout, set_menù_content_notes } = require("./api_functions/objects/menù")

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

// Account
app.post("/login", async (req, res) => login(client, req, res))
app.post("/create_account", upload.single("image") , async (req, res) => create_account(client, req, res))
app.delete("/delete_account", async (req, res) => delete_account(client, req, res))

// Credentials
app.get("/get_credentials", async (req, res) => get_credentials(client, req, res))
app.post("/set_credentials",upload.single("new_image"), async (req, res) => set_credentials(client, req, res))

// Menù
app.get("/get_menu", async (req, res) => get_menù(client, req, res))
app.post("/set_menu/layout", async (req, res) => set_menù_layout(client, req, res))
app.post("/set_menu/content/events", async (req, res) => set_menù_content_events(client, req, res))
app.post("/set_menu/content/activities", async (req, res) => set_menù_content_activities(client, req, res))
app.post("/set_menu/content/tomatoes", async (req, res) => set_menù_content_tomatoes(client, req, res))
app.post("/set_menu/content/notes", async (req, res) => set_menù_content_notes(client, req, res))

// Note
app.get("/get_notes", async (req, res) => get_notes(client, req, res))
app.get("/get_note", async (req, res) => get_note(client, req, res))
app.post("/create_note", async (req, res) => create_note(client, req, res))
app.delete("/delete_note", async (req, res) => delete_note(client, req, res))
app.post("/edit_note", async (req, res) => edit_note(client, req, res))

// Tag
app.get("/get_tags", async (req, res) => get_tags(client, req, res))
app.post("/create_tag", async (req, res) => create_tag(client, req, res))
app.post("/edit_tag", async (req, res) => edit_tag(client, req, res))
app.delete("/delete_tag", async (req, res) => delete_tag(client, req, res))
app.get("/get_tag", async (req, res) => get_tag(client, req, res))

// Activity
app.post("/create_activity", async (req, res) => create_activity(client, req, res))
app.delete("/delete_activity", async (req, res) => delete_activity(client, req, res))
app.post("/edit_activity", async (req, res) => edit_activity(client, req, res))
app.get("/get_activities", async (req, res) => get_activities(client, req, res))
app.get("/get_activity", async (req, res) => get_activity(client, req, res))

// Tomato
app.post("/create_tomato", async (req, res) => create_tomato(client, req, res))
app.delete("/delete_tomato", async (req, res) => delete_tomato(client, req, res))
app.post("/edit_tomato", async (req, res) => edit_tomato(client, req, res))
app.get("/get_tomatoes", async (req, res) => get_tomatoes(client, req, res))
app.get("/get_tomato", async (req, res) => get_tomato(client, req, res))

// Event
app.post("/create_event", async (req, res) => create_event(client, req, res))
app.delete("/delete_event", async (req, res) => delete_event(client, req, res))
app.post("/edit_event", async (req, res) => edit_event(client, req, res))
app.get("/get_events", async (req, res) => get_events(client, req, res))
app.get("/get_event", async (req, res) => get_event(client, req, res))
