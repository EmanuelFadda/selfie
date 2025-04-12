const { get_new_event } = require("../../getters")
const { create_object, edit_object, delete_object, get_objects } = require("../general")

async function get_events(client, req, res) {
  let fields = ["events"]
  get_objects(client, req, res, fields, "Events")
}

async function create_event(client, req, res) {
  new_event = get_new_event(req.body.title, req.body.repeat_type, req.body.repeat_start_date, req.body.repeat_finish_date)
  create_object(client, req, res, new_event.id, { events: new_event }, "Event")
}

async function delete_event(client, req, res) {
  let pull_obj = {}
  let id = req.body.id
  pull_obj["events"] = { id: id }
  delete_object(client, req, res, id, pull_obj, "Event")
}

async function edit_event(client, req, res) {
  let id = req.body.id

  let set_obj = {
    "events.$.title": req.body.new_title,
    "events.$.repeat.type": req.body.new_type_rep,
    "events.$.repeat.start_date": req.body.new_start,
    "events.$.repeat.finish_date": req.body.new_finish,
  }
  let identifier = { key: "events.id", value: id }
  edit_object(client, req, res, set_obj, "Event", identifier)
}

async function get_event(client, req, res) {
  let id = req.body.id
  let fields = ["events.$"]
  let identifier = { key: "events.id", value: id }
  get_objects(client, req, res, fields, "Event", identifier)
}
module.exports = { get_events, create_event, delete_event, edit_event, get_event }
