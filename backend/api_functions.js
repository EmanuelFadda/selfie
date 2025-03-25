// file with all the functions called in the main.js
const getters=require('./getters')

async function get_account(client,req,res) {
  try{
    // connecting with db
    collection=await getters.get_db_collection(client)
    
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
async function create_account(client,req,res){
  try{
    // connecting with db
    collection=await getters.get_db_collection(client)
    new_user=getters.get_new_user(
      req.params.name,
      req.params.surname,
      req.params.username,
      req.params.email,
      req.params.image,
      req.params.password
    )
    collection.insertOne(new_user)
    res.send("User created")
  }catch(error){
    res.send("error")
  }
}
async function delete_account(client,req,res){
    try{
      collection=await getters.get_db_collection(client)
      
      collection.deleteOne({username:req.params.username,password:req.params.password})
      // TODO :controllare nel caso in cui l'utente non esista
      res.send("User was deleted")
    }catch(error){
      res.send(error)
    }
    
}
async function modify_account(client,req,res){
  try{
    collection=await getters.get_db_collection(client)

    collection.updateOne(
      { username: req.params.old_username},
      { $set: {
          name: req.params.new_name,
          surname: req.params.new_surname,
          username: req.params.new_username,
          email: req.params.new_email,
          image: req.params.new_image,
          password: req.params.new_password,
        }
      }
   )

    res.send("User was modified")
  }catch(error){
    res.send("error")
  }
}

async function create_note(client,req,res){
  try{
    new_note=getters.get_new_note(req.params.title,req.params.content,req.params.id_tag)

    collection=await getters.get_db_collection(client)

    collection.updateOne(
      { username: req.params.username },
      { $push: { notes: new_note } }
   )
   res.send("created a new note")  
  }catch(error){
    res.send("error")
  }
}
async function delete_note(client,req,res){

  try{
    collection=await getters.get_db_collection(client)
    collection.updateOne(
      { username: req.params.username},
      { $pull: { notes: { id : req.params.id_note}}}
    )

    res.send("Note was deleted")
  }catch(error){
    res.send("error")
  }
    
}
async function modify_note(client,req,res){
  try{
    collection=await getters.get_db_collection(client)

    collection.updateOne(
      { username: req.params.username, "notes.id": req.params.id_note},
      { $set: {
        "notes.$.title" : req.params.new_title,
        "notes.$.content":req.params.new_content,
        "notes.$.tag":req.params.new_tag,
        "notes.$.date_last_modify":getters.get_time_now()
        }
      }
   )

    res.send("Note was modified")
  }catch(error){
    res.send("error")
  }
}
async function create_activity(client,req,res){
  try{
    new_activity=getters.get_new_activity(req.params.name,req.params.expiration)

    collection=await getters.get_db_collection(client)

    collection.updateOne(
      { username: req.params.username },
      { $push: { activities: new_activity } }
   )
   res.send("created a new activity")  
  }catch(error){
    res.send("error")
  }
}
async function delete_activity(client,req,res){
  try{
    collection=await getters.get_db_collection(client)
    collection.updateOne(
      { username: req.params.username},
      { $pull: { activities: { id : req.params.id_activity}}}
    )

    res.send("Activity was deleted")
  }catch(error){
    res.send("error")
  }
}
async function modify_activity(client,req,res){
  try{
    collection=await getters.get_db_collection(client)

    collection.updateOne(
      { username: req.params.username, "activities.id": req.params.id_activity},
      { $set: {
        "activities.$.name" : req.params.new_name,
        "activities.$.expiration":req.params.new_expiration,
        }
      }
   )
    res.send("Activity was modified")
  }catch(error){
    res.send("error")
  }
}
async function create_tomato(client,req,res){
  try{
    let p=req.params
    new_tomato=getters.get_new_tomato(p.name_tomato,p.rep_tomato,p.time_tomato,p.short_break,p.long_break)

    collection=await getters.get_db_collection(client)

    collection.updateOne(
      { username: p.username },
      { $push: { tomato_sessions: new_tomato } }
   )
   res.send("created a new tomato")  
  }catch(error){
    res.send("error")
  }
}
async function delete_tomato(client,req,res){
  try{
    collection=await getters.get_db_collection(client)
    collection.updateOne(
      { username: req.params.username},
      { $pull: { tomato_sessions: { id : req.params.id_tomato}}}
    )

    res.send("Tomato was deleted")
  }catch(error){
    res.send("error")
  }
}
async function modify_tomato(client,req,res){
  try{
    collection=await getters.get_db_collection(client)
    console.log(1)
    collection.updateOne(
      { username: req.params.username, "tomato_sessions.id": req.params.id_tomato},
      { $set: {
          "tomato_sessions.$.name" : req.params.new_name,
          "tomato_sessions.$.rep_tomato":req.params.new_rep_tomato,
          "tomato_sessions.$.time.tomato":req.params.new_time_tomato,
          "tomato_sessions.$.time.short_break":req.params.new_short_break,
          "tomato_sessions.$.time.long_break":req.params.new_long_break
        }
      }
   )
    res.send("Tomato session was modified")
  }catch(error){
    res.send("error")
  }
}
async function create_event(client,req,res){}
async function delete_event(client,req,res){}
async function modify_event(client,req,res){}

async function create_tag(client,req,res){
  try{
    collection=await getters.get_db_collection(client)

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
    collection=await getters.get_db_collection(client)

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
    collection=await getters.get_db_collection(client)
    collection.updateOne(
      { username: req.params.username},
      { $pull: { tags : req.params.name_tag  }}
   )

    res.send("Tag was deleted")
  }catch(error){
    res.send("error")
  }
    
}

module.exports={
  get_account,create_account,delete_account,modify_account,
  create_note,delete_note,modify_note,
  create_tag,modify_tag,delete_tag,
  create_activity,delete_activity,modify_activity,
  create_tomato,delete_tomato,modify_tomato
}


