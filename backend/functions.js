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







module.exports={login}


