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
    let msg
    if(result[0]!=null){
      msg=getters.get_query_response(true,result[0],`User ${req.body.username} was found`)
    }else{
      msg=getters.get_query_response(true,null,`User ${req.body.username} was not found`)
    }
    res.send(msg)
  } catch(error){
    msg=getters.get_query_response(false,null,`error`)
    res.send(msg)
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
    msg=getters.get_query_response(true,null,`User ${req.body.username} was created`)
    res.send(msg)
  } catch(error){
    msg=getters.get_query_response(false,null,`error`)
    res.send(msg)
  }
}
async function delete_account(client,req,res){
  try{
    collection=await getters.get_db_collection(client)  
    collection.deleteOne({username:req.body.username,password:req.body.password})

    msg=getters.get_query_response(true,null,`User ${req.body.username} was deleted`)
    res.send(msg)
  } catch(error){
    msg=getters.get_query_response(false,null,`error`)
    res.send(msg)
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

   msg=getters.get_query_response(true,null,`User ${req.body.new_username} was modified`)
   res.send(msg)
 } catch(error){
   msg=getters.get_query_response(false,null,`error`)
   res.send(msg)
 }
}

async function create_note(client,req,res){
  try{
    new_note=getters.get_new_note(req.body.title,req.body.content,req.body.tag)

    collection=await getters.get_db_collection(client)

    collection.updateOne(
      { username: req.body.username },
      { $push: { notes: new_note } }
   )
    msg=getters.get_query_response(true,null,`Note ${new_note.id} was created`)
    res.send(msg)
  } catch(error){
    msg=getters.get_query_response(false,null,`error`)
    res.send(msg)
  }
}
async function delete_note(client,req,res){

  try{
    collection=await getters.get_db_collection(client)
    collection.updateOne(
      { username: req.body.username},
      { $pull: { notes: { id : req.body.id_note}}}
    )

    msg=getters.get_query_response(true,null,`Note ${req.body.id_note} was deleted`)
    res.send(msg)
  } catch(error){
    msg=getters.get_query_response(false,null,`error`)
    res.send(msg)
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

   msg=getters.get_query_response(true,null,`Note ${req.body.id_note} was modified`)
   res.send(msg)
  }catch(error){
    msg=getters.get_query_response(false,null,`error`)
    res.send(msg)
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
   msg=getters.get_query_response(true,null,`Activity ${new_activity.id} was created`)
   res.send(msg) 
  }catch(error){
    msg=getters.get_query_response(false,null,`error`)
    res.send(msg)
  }
}
async function delete_activity(client,req,res){
  try{
    collection=await getters.get_db_collection(client)
    collection.updateOne(
      { username: req.body.username},
      { $pull: { activities: { id : req.body.id_activity}}}
    )

    msg=getters.get_query_response(true,null,`Activity ${req.body.id_note} was deleted`)
    res.send(msg)
  }catch(error){
    msg=getters.get_query_response(false,null,`error`)
    res.send(msg)
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
   msg=getters.get_query_response(true,null,`Activity ${req.body.id_activity} was modified`)
   res.send(msg)
  }catch(error){
    msg=getters.get_query_response(false,null,`error`)
    res.send(msg)
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
   msg=getters.get_query_response(true,null,`Tomato ${new_tomato.id} was created`)
   res.send(msg) 
  }catch(error){
    msg=getters.get_query_response(false,null,`error`)
    res.send(msg)
  }
}
async function delete_tomato(client,req,res){
  try{
    collection=await getters.get_db_collection(client)
    collection.updateOne(
      { username: req.body.username},
      { $pull: { tomato_sessions: { id : req.body.id_tomato}}}
    )

    msg=getters.get_query_response(true,null,`Tomato ${req.body.id_tomato} was deleted`)
    res.send(msg) 
  }catch(error){
    msg=getters.get_query_response(false,null,`error`)
    res.send(msg)
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
   msg=getters.get_query_response(true,null,`Tomato ${req.body.id_tomato} was modified`)
   res.send(msg) 
  }catch(error){
    msg=getters.get_query_response(false,null,`error`)
    res.send(msg)
  }
}
async function create_event(client,req,res){
  try{
    new_event=getters.get_new_event(
      req.body.title,
      req.body.type_rep,
      req.body.start,
      req.body.finish
    )

    collection=await getters.get_db_collection(client)

    collection.updateOne(
      { username: req.body.username },
      { $push: { events: new_event } }
   )
   msg=getters.get_query_response(true,null,`Event ${new_event.id} was created`)
   res.send(msg) 
  }catch(error){
    msg=getters.get_query_response(false,null,`error`)
    res.send(msg)
}
}
async function delete_event(client,req,res){
  try{
    collection=await getters.get_db_collection(client)
    collection.updateOne(
      { username: req.body.username},
      { $pull: { events: { id : req.body.id_event}}}
    )

    msg=getters.get_query_response(true,null,`Event ${req.body.id_event} was deleted`)
    res.send(msg) 
  }catch(error){
    msg=getters.get_query_response(false,null,`error`)
    res.send(msg)
  }
}
async function modify_event(client,req,res){
  try{
    collection=await getters.get_db_collection(client)
    collection.updateOne(
      { username: req.body.username, "events.id": req.body.id_event},
      { $set: {
          "events.$.title" : req.body.new_title,
          "events.$.repeat.type":req.body.new_type_rep,
          "events.$.repeat.start_date":req.body.new_start,
          "events.$.repeat.finish_date":req.body.new_finish,
        }
      }
   )
   msg=getters.get_query_response(true,null,`Event ${req.body.id_event} was modified`)
   res.send(msg) 
  }catch(error){
    msg=getters.get_query_response(false,null,`error`)
    res.send(msg)
  }
}

async function create_tag(client,req,res){
  try{
    collection=await getters.get_db_collection(client)

    collection.updateOne(
      { username: req.body.username },
      { $push: { tags: req.body.name_tag } }
   )

   msg=getters.get_query_response(true,null,`Tag ${req.body.name_tag} was created`)
   res.send(msg) 
  }catch(error){
    msg=getters.get_query_response(false,null,`error`)
    res.send(msg)
  }
}
async function modify_tag(client,req,res){
  try{
    collection=await getters.get_db_collection(client)

    collection.updateOne(
      { username: req.body.username, tags: req.body.old_name},
      { $set: { "tags.$" : req.body.new_name }}
   )

   msg=getters.get_query_response(true,null,`Tag ${req.body.old_name} was changed to ${req.body.new_name}`)
   res.send(msg) 
  }catch(error){
    msg=getters.get_query_response(false,null,`error`)
    res.send(msg)
  }
}
async function delete_tag(client,req,res){
  try{
    collection=await getters.get_db_collection(client)
    collection.updateOne(
      { username: req.body.username},
      { $pull: { tags : req.body.name_tag  }}
   )

   msg=getters.get_query_response(true,null,`Tag ${req.body.name_tag} was deleted`)
   res.send(msg) 
  }catch(error){
    msg=getters.get_query_response(false,null,`error`)
    res.send(msg)
  }
    
}

async function modify_display(client,req,res){
  try{
    collection=await getters.get_db_collection(client)

    collection.updateOne(
      { username: req.body.username},
      { $set: { "display" : req.body.display }}
   )

   msg=getters.get_query_response(true,null,`Display was changed to ${req.body.display}`)
   res.send(msg) 
  }catch(error){
    msg=getters.get_query_response(false,null,`error`)
    res.send(msg)
  }
}


module.exports={
  get_account,create_account,delete_account,modify_account,
  create_note,delete_note,modify_note,
  create_tag,modify_tag,delete_tag,
  create_activity,delete_activity,modify_activity,
  create_tomato,delete_tomato,modify_tomato,
  create_event,modify_event,delete_event,
  modify_display
}


