const {MongoClient}=require("mongodb")
const express = require('express')
const functions=require('./api_functions')
const db_url=require("./defaults").DB_URL

const app = express()
const port = 3000

const client=new MongoClient(db_url)


// all api actions 
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})


//get_account 
app.get('/get_account/:username/:password', async (req, res) => functions.get_account(client,req,res))

// user
app.post('/create_account/:username/:password/:name/:surname/:email/:image', async(req,res)=> functions.create_account(client,req,res))
app.delete("/delete_account/:username/:password", async(req,res)=>functions.delete_account(client,req,res))
app.post("/modify_account/:old_username/:new_username/:new_password/:new_name/:new_surname/:new_email/:new_image",async(req,res)=>functions.modify_account(client,req,res))

// note
app.post("/create_note/:username/:title/:content/:tags", async(req,res)=>functions.create_note(client,req,res))
app.delete("/delete_note/:username/:id_note", async(req,res)=>functions.delete_note(client,req,res))
app.post("/modify_note/:username/:id_note/:new_title/:new_content/:new_tag",async(req,res)=>functions.modify_note(client,req,res))

// tag
app.post("/create_tag/:username/:name_tag", async(req,res)=>functions.create_tag(client,req,res))
app.post("/modify_tag/:username/:old_name/:new_name", async(req,res)=>functions.modify_tag(client,req,res))
app.delete("/delete_tag/:username/:name_tag", async(req,res)=>functions.delete_tag(client,req,res))


// activity
app.post("/create_activity/:username/:name/:expiration", async(req,res)=>functions.create_activity(client,req,res))
app.delete("/delete_activity/:username/:id_activity", async(req,res)=>functions.delete_activity(client,req,res))
app.post("/modify_activity/:username/:id_activity/:new_name/:new_expiration", async(req,res)=>functions.modify_activity(client,req,res))

// tomato
app.post("/create_tomato/:username/:name_tomato/:rep_tomato/:time_tomato/:short_break/:long_break", async(req,res)=>functions.create_tomato(client,req,res))
app.delete("/delete_tomato/:username/:id_tomato", async(req,res)=>functions.delete_tomato(client,req,res))
app.post("/modify_tomato/:username/:id_tomato/:new_name/:new_rep_tomato/:new_time_tomato/:new_short_break/:new_long_break", async(req,res)=>functions.modify_tomato(client,req,res))
