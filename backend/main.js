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




// create account

// modify account

// delete an account

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

