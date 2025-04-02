// file with all the functions called in the main.js
const getters = require("./getters")
const { ObjectId, Binary } = require("mongodb")

//funzione generale per la creazione di note,attività,pomodori,eventi,tag
async function create_object(client, req, res, create_obj, push_obj, name_obj) {
  try {
    // ottieni l'id dell'utente dal token
    let id_user = getters.verify_session(req.headers)
    collection = await getters.get_db_collection(client)

    // si creano gli oggetti per la creazione della query                                 push_obj={ field_obj : object }
    let object_id_user = ObjectId.createFromHexString(id_user)

    // modifiche al database
    collection.updateOne({ _id: object_id_user }, { $push: push_obj })

    // invio del risultato
    msg = getters.get_query_response(true, null, `${name_obj} ${create_obj} was created`)
    res.send(msg)
  } catch (error) {
    msg = getters.get_query_response(false, null, `error`)
    res.send(msg)
  }
}

// delete_obj è l'identificativo dell'oggetto da eliminare
// (id o nome tag)
// pull_obj è l'oggetto usato per indicare in quale campo
// rimuovere l'oggetto identificato
async function delete_object(client, req, res, delete_obj, pull_obj, name_obj) {
  try {
    // ottieni l'id dell'utente dal token
    let id_user = getters.verify_session(req.headers)
    collection = await getters.get_db_collection(client)

    // creazione degli oggetti per la creazione della query
    let object_id_user = ObjectId.createFromHexString(id_user)

    // eliminazione dell'oggetto
    collection.updateOne({ _id: object_id_user }, { $pull: pull_obj })
    msg = getters.get_query_response(true, null, `${name_obj} ${delete_obj} was deleted`)
    res.send(msg)
  } catch (error) {
    msg = getters.get_query_response(false, null, `error`)
    res.send(msg)
  }
}

async function edit_object(client, req, res, edit_obj, set_obj, name_obj, identifier) {
  try {
    // ottieni l'id dell'utente dal token
    let id_user = getters.verify_session(req.headers)
    collection = await getters.get_db_collection(client)

    // si creano gli oggetti per la creazione della query
    let object_id_user = ObjectId.createFromHexString(id_user)

    search = {}
    search["_id"] = object_id_user
    search[identifier.key] = identifier.value

    collection.updateOne(search, { $set: set_obj })

    msg = getters.get_query_response(true, null, `${name_obj} ${edit_obj} was edited`)
    res.send(msg)
  } catch (error) {
    msg = getters.get_query_response(false, null, `error`)
    res.send(msg)
  }
}

async function login(client, req, res) {
  // restituisce il token con cui fare le query
  try {
    // connecting with db
    collection = await getters.get_db_collection(client)

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
      let token = getters.get_token(user._id)
      msg = getters.get_query_response(true, token, `Successful login`)
    } else {
      msg = getters.get_query_response(true, null, `User not found`)
    }
    res.send(msg)
  } catch (error) {
    msg = getters.get_query_response(false, null, `error`)
    res.send(msg)
  }
}

async function get_account(client, req, res) {
  try {
    // connecting with db
    collection = await getters.get_db_collection(client)

    let id_user = getters.verify_session(req.headers)
    if (id_user != null) {
      //creating a query
      objectid = ObjectId.createFromHexString(id_user)
      let user = await collection.findOne({ _id: objectid })
      msg = getters.get_query_response(true, user, `User ${user.username} was found`)
      res.send(msg)
    } else {
      msg = getters.get_query_response(false, null, `Invalid session`)
      res.send(msg)
    }
  } catch (error) {
    msg = getters.get_query_response(false, null, `error`)
    res.send(msg)
  }
}
async function create_account(client, req, res) {
  try {
    // connecting with db
    collection = await getters.get_db_collection(client)
    new_user = getters.get_new_user(req.body.name, req.body.surname, req.body.username, req.body.email, req.body.image, req.body.password)
    collection.insertOne(new_user)
    msg = getters.get_query_response(true, null, `User ${req.body.username} was created`)
    res.send(msg)
  } catch (error) {
    msg = getters.get_query_response(false, null, `error`)
    res.send(msg)
  }
}
async function delete_account(client, req, res) {
  try {
    collection = await getters.get_db_collection(client)

    collection.deleteOne({ username: req.body.username, password: req.body.password })

    msg = getters.get_query_response(true, null, `User ${req.body.username} was deleted`)
    res.send(msg)
  } catch (error) {
    msg = getters.get_query_response(false, null, `error`)
    res.send(msg)
  }
}
async function edit_account(client, req, res) {
  try {
    collection = await getters.get_db_collection(client)

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

    msg = getters.get_query_response(true, null, `User ${req.body.new_username} was modified`)
    res.send(msg)
  } catch (error) {
    msg = getters.get_query_response(false, null, `error`)
    res.send(msg)
  }
}

async function create_note(client, req, res) {
  new_note = getters.get_new_note(req.body.title, req.body.content, req.body.tag)
  create_object(client, req, res, new_note.id, { notes: new_note }, "Note")
}

async function delete_note(client, req, res) {
  let pull_obj = {}
  pull_obj["notes"] = { id: req.body.id_note }
  delete_object(client, req, res, req.body.id_note, pull_obj, "Note")
}

async function edit_note(client, req, res) {
  let set_obj = {
    "notes.$.title": req.body.new_title,
    "notes.$.content": req.body.new_content,
    "notes.$.tag": req.body.new_tag,
    "notes.$.date_last_modify": getters.get_time_now(),
  }

  let identifier = { key: "notes.id", value: req.body.id_note }
  edit_object(client, req, res, req.body.id_note, set_obj, "Note", identifier)
}
async function create_activity(client, req, res) {
  new_activity = getters.get_new_activity(req.body.name, req.body.expiration)
  create_object(client, req, res, new_activity.id, { activities: new_activity }, "Activity")
}
async function delete_activity(client, req, res) {
  let pull_obj = {}
  pull_obj["activities"] = { id: req.body.id_activity }
  delete_object(client, req, res, req.body.id_activity, pull_obj, "Activity")
}
async function edit_activity(client, req, res) {
  let set_obj = { "activities.$.name": req.body.new_name, "activities.$.expiration": req.body.new_expiration, "activities.$.done": req.body.new_done }
  let identifier = { key: "activities.id", value: req.body.id_activity }
  edit_object(client, req, res, req.body.id_activity, set_obj, "Activity", identifier)
}
async function create_tomato(client, req, res) {
  new_tomato = getters.get_new_tomato(req.body.name_tomato, req.body.rep_tomato, req.body.time_tomato, req.body.short_break, req.body.long_break)
  create_object(client, req, res, new_tomato.id, { tomato_sessions: new_tomato }, "Tomato")
}
async function delete_tomato(client, req, res) {
  let pull_obj = {}
  pull_obj["tomato_sessions"] = { id: req.body.id_tomato }
  delete_object(client, req, res, req.body.id_tomato, pull_obj, "Tomato")
}
async function edit_tomato(client, req, res) {
  let set_obj = { "tomato_sessions.$.name": req.body.new_name, "tomato_sessions.$.rep_tomato": req.body.new_rep_tomato, "tomato_sessions.$.time.tomato": req.body.new_time_tomato, "tomato_sessions.$.time.short_break": req.body.new_short_break, "tomato_sessions.$.time.long_break": req.body.new_long_break }
  let identifier = { key: "tomato_sessions.id", value: req.body.id_tomato }
  edit_object(client, req, res, req.body.id_tomato, set_obj, "Tomato", identifier)
}
async function create_event(client, req, res) {
  new_event = getters.get_new_event(req.body.title, req.body.type_rep, req.body.start, req.body.finish)
  create_object(client, req, res, new_event.id, { events: new_event }, "Event")
}

async function delete_event(client, req, res) {
  let pull_obj = {}
  pull_obj["events"] = { id: req.body.id_event }
  delete_object(client, req, res, req.body.id_event, pull_obj, "Event")
}

async function edit_event(client, req, res) {
  let set_obj = { "events.$.title": req.body.new_title, "events.$.repeat.type": req.body.new_type_rep, "events.$.repeat.start_date": req.body.new_start, "events.$.repeat.finish_date": req.body.new_finish }
  let identifier = { key: "events.id", value: req.body.id_event }
  edit_object(client, req, res, req.body.id_event, set_obj, "Event", identifier)
}

async function create_tag(client, req, res) {
  new_tag = getters.get_new_tag(req.body.name, req.body.color)
  create_object(client, req, res, new_tag.name, { tags: new_tag }, "Tag")
}

async function edit_tag(client, req, res) {
  let set_obj = { "tags.$.name": req.body.new_name, "tags.$.color": req.body.new_color }
  let identifier = { key: "tags.name", value: req.body.old_name }

  edit_object(client, req, res, req.body.old_name, set_obj, "Tag", identifier)
}

async function delete_tag(client, req, res) {
  let pull_obj = {}
  pull_obj["tags"] = { name: req.body.name_tag }
  delete_object(client, req, res, req.body.name_tag, pull_obj, "Tag")
}
async function edit_layout(client, req, res) {
  try {
    collection = await getters.get_db_collection(client)

    collection.updateOne({ username: req.body.username }, { $set: { layout: req.body.layout } })

    msg = getters.get_query_response(true, null, `Layout was changed to ${req.body.layout}`)
    res.send(msg)
  } catch (error) {
    msg = getters.get_query_response(false, null, `error`)
    res.send(msg)
  }
}

module.exports = {
  get_account,
  create_account,
  delete_account,
  edit_account,
  create_note,
  delete_note,
  edit_note,
  create_tag,
  edit_tag,
  delete_tag,
  create_activity,
  delete_activity,
  edit_activity,
  create_tomato,
  delete_tomato,
  edit_tomato,
  create_event,
  edit_event,
  delete_event,
  edit_layout,
  login,
}
