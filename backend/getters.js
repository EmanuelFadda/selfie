const { ObjectId } = require("mongodb")
const defaults=require("./defaults")

function get_db_collection(client){
    client.connect()
    const db=client.db(defaults.DB_NAME)
    let collection=db.collection(defaults.COLLECTION_NAME)
    return collection
}

function get_new_user(name,surname,username,email,image,password){
  let new_user={
    name:name,
    surname:surname,
    username:username,
    email: email,
    image:image,
    password:password,
    layout:defaults.LAYOUT,
    notes:[
        get_new_note( 
            defaults.NOTE_TITLE , 
            defaults.NOTE_CONTENT , 
            defaults.NOTE_TAG 
        )
    ],
    activities:[],
    events:[],
    tags:defaults.TAGS,
    tomato_sessions:[
        get_new_tomato(
            defaults.TOMATO_NAME,
            defaults.TOMATO_REP,
            defaults.TOMATO_TIME,
            defaults.TOMATO_SHORT_BREAK,
            defaults.TOMATO_LONG_BREAK
        )]
   }
   return new_user 
}

function get_time_now(){ 
    return new Date(Date.now())
}

function get_new_note(title,content,tag){
  today=get_time_now()
  let new_note={
    id: new ObjectId().toString(),
    title:title,
    date_creation: today,
    date_last_modifiy:today,
    content:content,
    tag:tag
  }
  return new_note
}

function get_new_activity(name,expiration){
  today=get_time_now()
  let new_activity={
    id: new ObjectId().toString(),
    name:name,
    expiration:expiration,
    created:today
  }
  return new_activity
}  

function get_new_tomato(name,rep_tomato,time_tomato,short_break,long_break){
  new_tomato={ 
    id:new ObjectId().toString(),
    name:name,
    rep_tomato:rep_tomato,
    time:{
        tomato:time_tomato,
        short_break:short_break,
        long_break:long_break,
    }
  }
  return new_tomato
}

function get_new_event(title,type_rep,start,finish){
  today=get_time_now()
  let new_event={
    id: new ObjectId().toString(),
    title: title,
    created: today,
    repeat: {
        type:type_rep,
        start_date:start,
        finish_date:finish
    }
  }
  return new_event
}

function get_query_response(success,content,message){
  let response={ 
    "success":success,
    "content":content,
    "message": message
  }
  return response 
}
module.exports={
    get_db_collection,
    get_new_activity,
    get_new_note,
    get_new_tomato,
    get_new_user,
    get_time_now,
    get_new_event,
    get_query_response
}


