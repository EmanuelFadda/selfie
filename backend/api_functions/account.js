const { get_token, get_query_response,  get_db_collection, get_new_user } = require("../getters")
const { get_objects } = require("./general")

async function login(client, req, res) {
  // restituisce il token con cui fare le query
  try {
    // connecting with db
    collection = await get_db_collection(client)

    //creating a query
    let query = {
      $and: [{ username: req.body.username }, { password: req.body.password }],
    }

    //searching for result
    let result = await collection.find(query, { _id: 1 }).toArray()
    user = result[0]
    let msg
    if (user != null) {
      // il server invia il token jwt al client,il client da adesso in poi dovrà usare questo
      // per autenticarsi
      let token = get_token(user._id)
      msg = get_query_response(true, token, `Successful login`)
    } else {
      msg = get_query_response(true, null, `User not found`)
    }
    res.send(msg)
  } catch (error) {
    msg = get_query_response(false, null, `error`)
    res.send(msg)
  }
}

async function create_account(client, req, res) {
  try {
    // connecting with db
    collection = await get_db_collection(client)
    new_user = get_new_user(req.body.name, req.body.surname, req.body.username, req.body.email, req.body.image, req.body.password)
    collection.insertOne(new_user)
    msg = get_query_response(true, null, `User ${req.body.username} was created`)
    res.send(msg)
  } catch (error) {
    msg = get_query_response(false, null, `error`)
    res.send(msg)
  }
}
async function delete_account(client, req, res) {
  try {
    collection = await get_db_collection(client)

    collection.deleteOne({ username: req.body.username, password: req.body.password })

    msg = get_query_response(true, null, `User ${req.body.username} was deleted`)
    res.send(msg)
  } catch (error) {
    msg = get_query_response(false, null, `error`)
    res.send(msg)
  }
}
async function edit_account(client, req, res) {
  try {
    collection = await get_db_collection(client)

    collection.updateOne(
      { username: req.body.old_username },
      {
        $set: {
          name: req.body.new_name,
          surname: req.body.new_surname,
          username: req.body.new_username,
          email: req.body.new_email,
          image: new Binary(req.body.new_image),
          password: req.body.new_password,
        },
      }
    )

    msg = get_query_response(true, null, `User ${req.body.new_username} was modified`)
    res.send(msg)
  } catch (error) {
    msg = get_query_response(false, null, `error`)
    res.send(msg)
  }
}

async function get_account(client, req, res) {
  let fields = ["name", "surname", "username", "email", "image", "layout", "tags"]
  get_objects(client, req, res, fields, "Information")
}

async function edit_layout(client, req, res) {}


module.exports={login,create_account,delete_account,edit_account,get_account,edit_layout}