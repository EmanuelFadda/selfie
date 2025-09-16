const { get_new_event } = require("../../getters")
const { create_object, edit_object, delete_object, get_objects } = require("../general")
const name_obj="Event"

async function get_events(client, req, res) {
  let fields = ["events"]
  get_objects(client, req, res, fields, "Events")
}

async function create_event(client, req, res) {
  b=req.body
  new_event = get_new_event(b.title , b.created , b.modified , b.scheduled , b.duration , b.color, b.repeat_type, b.repeat_start_date, b.repeat_finish_date)
  create_object(client, req, res, { events: new_event }, name_obj)
}

async function delete_event(client, req, res) {
  let pull_obj = {}
  let id = req.body.id
  pull_obj["events"] = { id: id }
  delete_object(client, req, res, pull_obj, name_obj)
}

async function edit_event(client, req, res) {
  let id = req.body.id

  let set_obj = {
    "events.$.title": req.body.new_title,
    "events.$.scheduled": req.body.new_scheduled,
    "events.$.duration": req.body.new_duration,
    "events.$.modified":req.body.new_modified,
    "events.$.color":req.body.new_color,
    "events.$.repeat.type": req.body.new_type_rep,
    "events.$.repeat.start_date": req.body.new_start,
    "events.$.repeat.finish_date": req.body.new_finish,
  }
  
  let identifier = { key: "events.id", value: id }
  edit_object(client, req, res, set_obj, name_obj, identifier)
}

async function get_event(client, req, res) {
  let id = req.body.id
  let fields = ["events.$"]
  let identifier = { key: "events.id", value: id }
  get_objects(client, req, res, fields, name_obj, identifier)
}
module.exports = { get_events, create_event, delete_event, edit_event, get_event }
