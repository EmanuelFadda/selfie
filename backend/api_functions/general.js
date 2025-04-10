const { get_query_response,  get_db_collection, verify_session } = require("../getters")
const { ObjectId } = require("mongodb")

//funzione generale per la creazione di note,attività,pomodori,eventi,tag
async function create_object(client, req, res, create_obj, push_obj, name_obj) {
  try {
    // ottieni l'id dell'utente dal token
    let id_user = await verify_session(req.headers)
    collection = await get_db_collection(client)

    // si creano gli oggetti per la creazione della query
    let object_id_user = ObjectId.createFromHexString(id_user)

    // modifiche al database
    await collection.updateOne({ _id: object_id_user }, { $push: push_obj })

    // invio del risultato
    msg = get_query_response(true, null, `${name_obj} ${create_obj} was created`)
    res.send(msg)
  } catch (error) {
    msg = get_query_response(false, null, `error`)
    res.send(msg)
  }
}


async function delete_object(client, req, res, delete_obj, pull_obj, name_obj) {
  try {
    // ottieni l'id dell'utente dal token
    let id_user = await verify_session(req.headers)
    collection = await get_db_collection(client)

    // creazione degli oggetti per la creazione della query
    let object_id_user = ObjectId.createFromHexString(id_user)

    // eliminazione dell'oggetto
    await collection.updateOne({ _id: object_id_user }, { $pull: pull_obj })
    msg = get_query_response(true, null, `${name_obj} ${delete_obj} was deleted`)
    res.send(msg)
  } catch (error) {
    msg = get_query_response(false, null, `error`)
    res.send(msg)
  }
}

/**
 *
 * @param {*} client
 * @param {*} req
 * @param {*} res
 * @param {*} edit_obj
 * @param {*} set_obj oggetto set per costruire la query nella sezione "set"
 * @param {*} name_obj indica il tipo dell'oggetto
 * @param {*} identifier indica qual'è l'oggetto dell'array da modificare
 */
async function edit_object(client, req, res, edit_obj, set_obj, name_obj, identifier) {
  try {
    // ottieni l'id dell'utente dal token
    let id_user = await verify_session(req.headers)
    collection = await get_db_collection(client)

    // si creano gli oggetti per la creazione della query
    let object_id_user = ObjectId.createFromHexString(id_user)

    search = {}
    search["_id"] = object_id_user
    search[identifier.key] = identifier.value

    await collection.updateOne(search, { $set: set_obj })

    msg = get_query_response(true, null, `${name_obj} ${edit_obj} was edited`)
    res.send(msg)
  } catch (error) {
    msg = get_query_response(false, null, `error`)
    res.send(msg)
  }
}

async function get_objects(client, req, res, fields, name_obj, identifier) {
  try {
    // ottieni l'id dell'utente dal token
    let id_user = verify_session(req.headers)
    collection = await get_db_collection(client)

    // si creano gli oggetti per la creazione della query
    let object_id_user = ObjectId.createFromHexString(id_user)

    search = {}
    search["_id"] = object_id_user

    // passaggio per fare in modo che venga ricercato un solo oggetto
    // nel caso in cui ce ne sia bisogno
    if(identifier!=null){
      search[identifier.key] = identifier.value
    }
    
    // per filtrare i parametri da ottenere
    let projection = {}
    fields.forEach((element) => {
      projection[element] = 1
    })

    console.log(search, { projection: projection })
    let objects = await collection.findOne(search, { projection: projection })
    console.log(objects)
    msg = get_query_response(true, objects, `${name_obj} were found in ${id_user}`)
    res.send(msg)
  } catch (error) {
    msg = get_query_response(false, null, `error`)
    res.send(msg)
  }
}



module.exports={
  create_object,delete_object,edit_object,get_objects
}