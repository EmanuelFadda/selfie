const { get_new_activity } = require("../../getters")
const { create_object, edit_object, delete_object, get_objects } = require("../general")
const name_obj="Activity"

async function get_activities(client, req, res) {
  let fields = ["activities"]
  get_objects(client, req, res, fields, "Activities")
}

async function create_activity(client, req, res) {
  let b=req.body
  let new_activity = get_new_activity(b.name, b.expiration,b.created,b.modified,b.color,b.id_tomato)
  create_object(client, req, res, { activities: new_activity }, name_obj)
}
async function delete_activity(client, req, res) {
  let pull_obj = {}
  let id = req.body.id
  pull_obj["activities"] = { id: id }
  delete_object(client, req, res, pull_obj, name_obj)
}
async function edit_activity(client, req, res) {
  let id = req.body.id
  let set_obj = {
    "activities.$.name": req.body.new_name,
    "activities.$.expiration": req.body.new_expiration,
    "activities.$.modified":req.body.new_modified,
    "activities.$.color":req.body.new_color,
    "activities.$.id_tomato": req.body.id_tomato,
    "activities.$.done": req.body.new_done,
  }
  let identifier = { key: "activities.id", value: id }
  edit_object(client, req, res, set_obj, name_obj, identifier)
}

async function get_activity(client, req, res) {
  let id = req.body.id
  let fields = ["activities.$"]
  let identifier = { key: "activities.id", value: id }
  get_objects(client, req, res, fields, name_obj, identifier)
}

module.exports = { get_activities, delete_activity, edit_activity, create_activity, get_activity }
