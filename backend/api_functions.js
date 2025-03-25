// file with all the functions called in the main.js
const getters=require('./getters')

async function get_account(client,req,res) {
  try{
    // connecting with db
    collection=await getters.get_db_collection(client)

    //creating a query
    let query={
      $and:[
        {username: req.body.username},
        {password:req.body.password}
      ]
    }

    //searching for result
    const result= await collection.find(query).toArray()
    console.log(result)
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
      req.body.name,
      req.body.surname,
      req.body.username,
      req.body.email,
      req.body.image,
      req.body.password
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
      
      collection.deleteOne({username:req.body.username,password:req.body.password})

      res.send("User was deleted")
    }catch(error){
      res.send(error)
    }
    
}
async function modify_account(client,req,res){
  try{
    collection=await getters.get_db_collection(client)

    collection.updateOne(
      { username: req.body.old_username},
      { $set: {
          name: req.body.new_name,
          surname: req.body.new_surname,
          username: req.body.new_username,
          email: req.body.new_email,
          image: req.body.new_image,
          password: req.body.new_password,
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
    new_note=getters.get_new_note(req.body.title,req.body.content,req.body.id_tag)

    collection=await getters.get_db_collection(client)

    collection.updateOne(
      { username: req.body.username },
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
      { username: req.body.username},
      { $pull: { notes: { id : req.body.id_note}}}
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
      { username: req.body.username, "notes.id": req.body.id_note},
      { $set: {
        "notes.$.title" : req.body.new_title,
        "notes.$.content":req.body.new_content,
        "notes.$.tag":req.body.new_tag,
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
    new_activity=getters.get_new_activity(req.body.name,req.body.expiration)

    collection=await getters.get_db_collection(client)

    collection.updateOne(
      { username: req.body.username },
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
      { username: req.body.username},
      { $pull: { activities: { id : req.body.id_activity}}}
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
      { username: req.body.username, "activities.id": req.body.id_activity},
      { $set: {
        "activities.$.name" : req.body.new_name,
        "activities.$.expiration":req.body.new_expiration,
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
    let p=req.body
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
      { username: req.body.username},
      { $pull: { tomato_sessions: { id : req.body.id_tomato}}}
    )

    res.send("Tomato was deleted")
  }catch(error){
    res.send("error")
  }
}
async function modify_tomato(client,req,res){
  try{
    collection=await getters.get_db_collection(client)

    collection.updateOne(
      { username: req.body.username, "tomato_sessions.id": req.body.id_tomato},
      { $set: {
          "tomato_sessions.$.name" : req.body.new_name,
          "tomato_sessions.$.rep_tomato":req.body.new_rep_tomato,
          "tomato_sessions.$.time.tomato":req.body.new_time_tomato,
          "tomato_sessions.$.time.short_break":req.body.new_short_break,
          "tomato_sessions.$.time.long_break":req.body.new_long_break
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
      { username: req.body.username },
      { $push: { tags: req.body.name_tag } }
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
      { username: req.body.username, tags: req.body.old_name},
      { $set: { "tags.$" : req.body.new_name }}
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
      { username: req.body.username},
      { $pull: { tags : req.body.name_tag  }}
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


