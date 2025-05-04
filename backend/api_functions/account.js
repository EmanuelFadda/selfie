const {
  get_token,
  get_query_response,
  get_db_collection,
  get_new_user,
  verify_session,
  get_new_image,
} = require("../getters");

const { ObjectId } = require("mongodb");

async function login(client, req, res) {
  // restituisce il token con cui fare le query
  try {
    let login_credentials=req.body
    let user= await search_account(client,login_credentials)

    let msg;
    if (user != null) {
      // il server invia il token jwt al client,il client da adesso in poi dovrà usare questo
      // per autenticarsi
      let token = get_token(user._id);
      msg = get_query_response(true, token, `Successful login`);
    } else {
      msg = get_query_response(true, null, `User not found`);
    }
    res.send(msg);
  } catch (error) {
    msg = get_query_response(false, null, `error`);
    res.send(msg);
  }
}



// funzione generalizzata per la ricerca dell'account
async function search_account(client,login_credentials){
  // connecting with db
  collection = await get_db_collection(client);
  //searching for result
  let result = await collection.find(login_credentials, { projection: { _id: 1 } }).toArray();
  console.log(result)
  user = result[0];
  return user
}



async function create_account(client, req, res) {
  // ricordarsi cosa passare al server in immagine
  try {
    // connecting with db
    collection = await get_db_collection(client);

    let image = null;

    if (req.file) {
      image = get_new_image(
        req.file.buffer.toString("base64"),
        req.file.mimetype
      );
    }

    new_user = get_new_user(
      req.body.name,
      req.body.surname,
      req.body.username,
      req.body.email,
      image,
      req.body.password,
      req.body.birthday,
      req.body.login
    );

    collection.insertOne(new_user);

    msg = get_query_response(
      true,
      null,
      `User ${req.body.username} was created`
    );

    res.send(msg);
  } catch (error) {
    msg = get_query_response(false, null, `error`);
    res.send(msg);
  }
}
async function delete_account(client, req, res) {
  try {
    // ottieni l'id dell'utente dal token
    let id_user = await verify_session(req.headers);
    collection = await get_db_collection(client);
    // creazione degli oggetti per la creazione della query
    let object_id_user = ObjectId.createFromHexString(id_user);
    await collection.deleteOne({ _id: object_id_user });
    msg = get_query_response(true, null, `User ${id_user} was deleted`);
    res.send(msg);
  } catch (error) {
    msg = get_query_response(false, null, `error`);
    res.send(msg);
  }
}

module.exports = { login, create_account, delete_account };
