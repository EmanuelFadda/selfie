// file with all the functions called in the main.js

const { ObjectId } = require("mongodb")



// il codice necessita di refactoring... 

async function login(client,req,res) {
  try{
    // getting credentials in the login form 
    let user_credentials={
        username: req.params.username,
        password:req.params.password  
    }

    // connecting with db
    await client.connect()
    const db=client.db("user")
    const collection=db.collection('user')
    
    //creating a query
    let query={
      $and:[
        {username:user_credentials.username},
        {password:user_credentials.password}
      ]
    }

    let options={
      projection:{
        _id:0,
        password:0
      }
    }

    //searching for result
    const result= await collection.find(query,options).toArray()

    res.send(result)
  } catch(error){
    res.send(error)
  }
}




async function register(client,req,res){
  try{
    
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let new_user={
      name:req.params.name,
      surname:req.params.surname,
      username:req.params.username,
      email: req.params.email,
      image:req.params.image,
      password:req.params.password,
      notes:[
        {
          title: "Benvenuto !!!",
          date_creation:today,
          date_last_modify:today,
          content:'Heylaaaa!!! Qui puoi organizzare la tua vita universitaria facilmente! \nScrivi una nota, inserisci al calendario eventi o attività, oppure usa il timer pomodoro. \n Have fun and keep working :)\n\n... dagli sviluppatori di Selfie',
          tags: []
      }
    ],
      activities:[],
      events:[],
      tags:["Hobby","Gym","Study"],
      tomatoes:[
        { 
          name:"tomato1",
          time:{
              work:15,
              short_break:5,
              long_break:15
          }
        }
      ]
   }
   new_user.notes.forEach(e=>e["_id"]=new ObjectId())
   new_user.tomatoes.forEach(e=>e["_id"]=new ObjectId())

    // connecting with db
    await client.connect()
    const db=client.db("user")
    const collection=db.collection('user')
    
    collection.insertOne(new_user)
    res.send("User created")
  }catch(error){
    res.send("error")
  }


}



async function delete_account(client,req,res){
    try{
      await client.connect()
      const db=client.db("user")
      const collection=db.collection('user')
      
      collection.deleteOne({username:req.params.username})
      // TODO :controllare nel caso in cui l'utente non esista
      res.send("User was deleted")
    }catch(error){
      res.send(error)
    }
    
}

async function create_note(client,req,res){
  try{
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed)
    let new_note={
      _id:new ObjectId(),
      title:req.params.title,
      date_creation: today,
      date_last_modifiy:today,
      content:req.params.content,
      id_tag:req.params.id_tag
    }
    await client.connect()
    const db=client.db("user")
    const collection=db.collection('user')

    collection.updateOne(
      { username: req.params.username },
      { $push: { notes: new_note } }
   )
   res.send("created a new note")  
  }catch(error){
    res.send("error")
  }
}


module.exports={
  login,
  register,
  delete_account,
  create_note
}


