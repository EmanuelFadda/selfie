const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const defaults = require("./defaults");

function get_db_collection(client) {
  client.connect();
  const db = client.db(defaults.DB_NAME);
  let collection = db.collection(defaults.COLLECTION_NAME);
  return collection;
}

function get_new_user(name,surname,username,email,image,password,birthday,login) {
  let default_tags = [];
  for (let i = 0; i < defaults.TAGS_NAMES.length; i++) {
    default_tags[i] = get_new_tag(
      defaults.TAGS_NAMES[i],
      defaults.TAGS_COLORS[i]
    );
  }
  let default_note = get_new_note(
    defaults.NOTE_TITLE,
    get_time_now(),
    get_time_now(),
    defaults.NOTE_CONTENT,
    defaults.NOTE_TAG
  );
  let default_tomato = get_new_tomato(
    defaults.TOMATO_NAME,
    get_time_now(),
    get_time_now(),
    defaults.TOMATO_REP,
    defaults.TOMATO_TIME,
    defaults.TOMATO_SHORT_BREAK,
    defaults.TOMATO_LONG_BREAK
  );
  let menù = get_new_menù(defaults.LAYOUT, default_note, default_tomato);
  let credentials = get_new_credentials(
    name,
    surname,
    username,
    email,
    image,
    password,
    birthday,
    login
  );

  let new_user = {
    credentials: credentials,
    menù: menù,
    notes: [default_note],
    activities: [],
    events: [],
    tags: default_tags,
    tomato_sessions: [default_tomato],
  };
  return new_user;
}

function get_new_credentials(name,surname,username,email,image,password,birthday,login) {
  let credentials = {
    name: name,
    surname: surname,
    username: username,
    email: email,
    image: image,
    password: password,
    birthday: birthday,
    login: login, // modo in cui si fa l'accesso , 0= selfie , 1=google
  };
  return credentials;
}

function get_new_menù(layout, default_note, default_tomato) {
  let menù = {
    layout: layout,
    content: {
      activities: [],
      events: [],
      notes: [default_note],
      tomato_sessions: [default_tomato],
    },
  };
  return menù;
}
function get_new_tag(name, color) {
  let new_tag = {
    name: name,
    color: color,
  };
  return new_tag;
}

function get_new_note(title,created,modified, content, tag) {
  let new_note = {
    id: new ObjectId().toString(),
    title: title,
    created: created,
    modified: modified,
    content: content,
    tag: tag,
  };
  return new_note;
}

function get_new_activity(title,expiration,created,modified,color,id_tomato) {
  let new_activity = {
    id: new ObjectId().toString(),
    title: title,
    expiration: expiration,
    created: created,
    modified:modified,
    color: color,
    id_tomato: id_tomato,  //id pomodoro a cui è associato
    done: false,
  };
  return new_activity;
}

function get_new_tomato(name,created,modified,rep_tomato,time_tomato,short_break,long_break) {
  new_tomato = {
    id: new ObjectId().toString(),
    name: name,
    created:created,
    modified:modified,
    rep_tomato: rep_tomato,
    time: {
      tomato: time_tomato,
      short_break: short_break,
      long_break: long_break,
    },
  };
  return new_tomato;
}

function get_new_event(title, created, modified, scheduled, duration, color, type_rep, start, finish) {
  let new_event = {
    id: new ObjectId().toString(),
    title: title,
    created: created,
    modified:modified,
    scheduled: scheduled, //ora di inzio
    duration: duration,   // durata dell'evento
    color: color,
    repeat: {
      type: type_rep,
      start_date: start,
      finish_date: finish,
    },
  };
  return new_event;
}

function get_query_response(success, content, message) {
  let response = {
    success: success,
    content: content,
    message: message,
  };
  return response;
}

function get_token(id) {
  let token = jwt.sign(
    {
      id: id,
    },
    defaults.SECRET_KEY
  );
  return token;
}

function verify_session(header) {
  let token = header["token"];
  let id_user = null;
  jwt.verify(token, defaults.SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log("Something goes wrong");
    } else {
      id_user = decoded.id;
    }
  });
  return id_user;
}

function get_time_now() {
  return new Date(Date.now());
}
function get_new_image(base64, mimetype) {
  return `data:${mimetype};base64,${base64}`;
}
module.exports = {
  get_db_collection,
  get_new_activity,
  get_new_note,
  get_new_tomato,
  get_new_user,
  get_time_now,
  get_new_event,
  get_query_response,
  get_token,
  verify_session,
  get_new_tag,
  get_new_image,
};
