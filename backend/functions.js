// file with all the functions called in the main.js
const DB_NAME='user'
const COLLECTION_NAME='user'
const DEFAULT_FIRST_NOTE_TITLE="Benvenuto"
const DEFAULT_FIRST_NOTE_CONTENT="Heylaaaa!!! Qui puoi organizzare la tua vita universitaria facilmente! \nScrivi una nota, inserisci al calendario eventi o attività, oppure usa il timer pomodoro. \n Have fun and keep working :)\n\n... dagli sviluppatori di Selfie"
const DEFAULT_TAGS=["Hobby","Gym","Study"]
const { ObjectId } = require("mongodb")

function db_connection(client){
  client.connect()
  const db=client.db(DB_NAME)
  let collection=db.collection(COLLECTION_NAME)
  return collection
}

function get_new_user(name,surname,username,email,image,password){
  let new_user={
    name:name,
    surname:surname,
    username:username,
    email: email,
    image:image,
    password:password,
    notes:[get_new_note( DEFAULT_FIRST_NOTE_TITLE , DEFAULT_FIRST_NOTE_CONTENT , "Study" )],
    activities:[],
    events:[],
    tags:DEFAULT_TAGS,
    tomato_sessions:[
      { 
        id:new ObjectId().toString(),
        name:"tomato1",
        tomato_rep:3,
        time:{
            work:15,
            short_break:5,
            long_break:15
          }
        }
      ]
   }
   //new_user.tomato_sessions.forEach(e=>e["id"]=new ObjectId().toString())
   return new_user 
}

function get_time_now(){ return new Date(Date.now())}

function get_new_note(title,content,tag){

  today=get_time_now()

  let new_note={
    id: new ObjectId().toString(),
    title:title,
    date_creation: today,
    date_last_modifiy:today,
    content:content,
    tag:tag
  }
  return new_note
}
// il codice necessita di refactoring... 

async function login(client,req,res) {
  try{
    // connecting with db
    collection=await db_connection(client)
    
    //creating a query
    let query={
      $and:[
        {username: req.params.username},
        {password:req.params.password}
      ]
    }

    //searching for result
    const result= await collection.find(query).toArray()

    res.send(result)
  } catch(error){
    res.send(error)
  }
}

async function register(client,req,res){
  try{
    // connecting with db
    collection=await db_connection(client)
    new_user=get_new_user(req.params.name,req.params.surname,req.params.username,req.params.email,req.params.image,req.params.password)
    collection.insertOne(new_user)
    res.send("User created")
  }catch(error){
    res.send("error")
  }


}

async function delete_account(client,req,res){
    try{
      collection=await db_connection(client)
      
      collection.deleteOne({username:req.params.username,password:req.params.password})
      // TODO :controllare nel caso in cui l'utente non esista
      res.send("User was deleted")
    }catch(error){
      res.send(error)
    }
    
}

// gestire parametri facoltativi, come i tag
async function create_note(client,req,res){
  try{
    new_note=get_new_note(req.params.title,req.params.content,req.params.id_tag)

    collection=await db_connection(client)

    collection.updateOne(
      { username: req.params.username },
      { $push: { notes: new_note } }
   )
   res.send("created a new note")  
  }catch(error){
    res.send("error")
  }
}

async function create_tag(client,req,res){
  try{
    collection=await db_connection(client)

    collection.updateOne(
      { username: req.params.username },
      { $push: { tags: req.params.name_tag } }
   )

    res.send("Tag was created")
  }catch(error){
    res.send("error")
  }
}

async function modify_tag(client,req,res){
  try{
    collection=await db_connection(client)

    collection.updateOne(
      { username: req.params.username, tags: req.params.old_name},
      { $set: { "tags.$" : req.params.new_name }}
   )

    res.send("Tag was modified")
  }catch(error){
    res.send("error")
  }
}

async function delete_tag(client,req,res){
  try{
    collection=await db_connection(client)
    collection.updateOne(
      { username: req.params.username},
      { $pull: { tags : req.params.name_tag  }}
   )

    res.send("Tag was modified")
  }catch(error){
    res.send("error")
  }
    
}
// :username/:id_note
async function delete_note(client,req,res){

  try{
    collection=await db_connection(client)
    collection.updateOne(
      { username: req.params.username},
      { $pull: { notes: { id : req.params.id_note}}}
    )

    res.send("Note was deleted")
  }catch(error){
    res.send("error")
  }
    
}


module.exports={
  login,
  register,
  delete_account,
  create_note,
  create_tag,
  modify_tag,
  delete_tag,
  delete_note
}


