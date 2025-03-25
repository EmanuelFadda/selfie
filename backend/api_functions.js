// file with all the functions called in the main.js
const getters=require('./getters')
// capire perchè non va il codice 
async function login(client,req,res) {
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

async function register(client,req,res){
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

// gestire parametri facoltativi, come i tag
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
// :username/:id_note
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


