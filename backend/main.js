const {MongoClient, ObjectId}=require("mongodb")
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

// checks if exist an account with the same username
app.get('exist/:username/', async (req, res) => {
  //fai la query
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
app.post("/create_note/:username/:title/:content/:tags", async(req,res)=>functions.create_note(client,req,res))



// modify a note



// delete a note (da finire)
app.delete("/delete_note/:username/:id_note", async(req,res)=>{ 
  try{
    await client.connect()
    const db=client.db("user")
    const collection=db.collection('user')
    console.log(req.params.id_note)
    collection.updateOne(
      {username: req.params.username},
      {$pull: { notes : { _id: ObjectId(req.params.id_note)} }}
    )

    res.send("Notes was deleted")
  }catch(error){
    res.send("error")
  }
})

// create a tag
app.post("/create_tag/:username/:name_tag", async(req,res)=>functions.create_tag(client,req,res))

// modify a tag

// delete a tag

// create an activity

// modify an activity

// delete an activity

// pensare al pomodoro e agli eventi

