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

//getting the data of user 
app.get('/login/:email/:password', async (req, res) => functions.login(client,req,res))
