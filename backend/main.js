const {MongoClient}=require("mongodb")
const express = require('express')

const functions=require('./api_functions')
const db_url=require("./defaults").DB_URL
const body_parser=require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000

const client=new MongoClient(db_url)

app.use(body_parser.json()) 
app.use(body_parser.urlencoded({ extended: true }))
app.use(cors({ // permette le richieste cross-origin
  origin: "http://localhost:8080", // porta del frontend
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization, token"
}))


// all api actions 
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})


// login
app.post("/login",async (req,res)=> functions.login(client,req,res))

//get_account 
app.get('/get_account', async (req, res) => functions.get_account(client,req,res))

// user

// name,surname,username,email,image,password
app.post('/create_account', async(req,res)=> functions.create_account(client,req,res))

//username, password
app.delete("/delete_account", async(req,res)=>functions.delete_account(client,req,res))

// old_username,new_username,new_password,new_name,new_surname,new_email,new_image
app.post("/edit_account",async(req,res)=>functions.edit_account(client,req,res))

// username,title,content,tag
app.post("/create_note", async(req,res)=>functions.create_note(client,req,res))

// username,id_note
app.delete("/delete_note", async(req,res)=>functions.delete_note(client,req,res))

// username,id_note,new_title,new_content,new_tag
app.post("/edit_note",async(req,res)=>functions.edit_note(client,req,res))

// username,name_tag
app.post("/create_tag", async(req,res)=>functions.create_tag(client,req,res))

// username,old_name,new_name
app.post("/edit_tag", async(req,res)=>functions.edit_tag(client,req,res))

// username,name_tag
app.delete("/delete_tag", async(req,res)=>functions.delete_tag(client,req,res))


// activity
// username,name,expiration
app.post("/create_activity", async(req,res)=>functions.create_activity(client,req,res))
// username,id_activity
app.delete("/delete_activity", async(req,res)=>functions.delete_activity(client,req,res))
// username,id_activity,new_name,new_expiration
app.post("/edit_activity", async(req,res)=>functions.edit_activity(client,req,res))

// tomato
// username,name_tomato,rep_tomato,time_tomato,short_break,long_break
app.post("/create_tomato", async(req,res)=>functions.create_tomato(client,req,res))
// username,id_tomato
app.delete("/delete_tomato", async(req,res)=>functions.delete_tomato(client,req,res))
// username,id_tomato,new_name,new_rep_tomato,new_time_tomato,new_short_break,new_long_break
app.post("/edit_tomato", async(req,res)=>functions.edit_tomato(client,req,res))

// event
// username,title,type_rep,start,finish
app.post("/create_event", async(req,res)=>functions.create_event(client,req,res))
// username,id_event
app.delete("/delete_event", async(req,res)=>functions.delete_event(client,req,res))
// username,id_event,new_title,new_type_rep,new_start,new_finish
app.post("/edit_event", async(req,res)=>functions.edit_event(client,req,res))

// layout
// username,layout
app.post("/edit_layout",async(req,res)=>functions.edit_layout(client,req,res))
