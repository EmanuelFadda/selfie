// file with all the functions called in the main.js


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
    let new_user={
      name:req.params.name,
      surname:req.params.surname,
      username:req.params.username,
      email: req.params.email,
      image:req.params.image,
      password:req.params.password,
      notes:[],
      activities:[],
      events:[],
      tags:[
          {
              id:1,
              name:"School"
          },
          {
              id:2,
              name: "Gym"
          },
          {
              id:3,
              name: "Hobby"
          }
      ],
      tomatoes:[
          {
              id:1,
              name:"tomato1",
              time:{
                  work:15,
                  short_break:5,
                  long_break:15
              }
          }
      ]
  }
    // connecting with db
    await client.connect()
    const db=client.db("user")
    const collection=db.collection('user')
    
    collection.insertOne(new_user)
    res.send("User created")
  }catch(error){
    res.send(error)
  }


}


module.exports={login,register}


