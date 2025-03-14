const {MongoClient}=require("mongodb")
const express = require('express')
const functions=require('./functions')

const app = express()
const port = 3000
url_db="mongodb://localhost:27017/"
const client=new MongoClient(url_db)

// all api actions 


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

//login 
app.get('/login/:username/:password', async (req, res) => functions.login(client,req,res))

// create account, use this function after checking if there is another user with the same username 
app.post('/register/:username/:password/:name/:surname/:email/:image', async(req,res)=> functions.register(client,req,res))

// modify account
app.put("/modify_account/:username/:password/:name/:surname/:email/:image",async(req,res)=> {

})
// delete an account
app.delete("/delete_account/:username", async(req,res)=>functions.delete_account(client,req,res))

// create note

// modify a note

// delete a note

// create a tag

// modify a tag

// delete a tag

// create an activity

// modify an activity

// delete an activity

// pensare al pomodoro e agli eventi

