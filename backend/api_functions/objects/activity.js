const { get_new_activity } = require("../../getters")
const { create_object, edit_object, delete_object, get_objects } = require("../general")

async function get_activities(client, req, res) {
  let fields = ["activities"]
  get_objects(client, req, res, fields, "Activities")
}

async function create_activity(client, req, res) {
  let new_activity = get_new_activity(req.body.name, req.body.expiration)
  create_object(client, req, res, new_activity.id, { activities: new_activity }, "Activity")
}
async function delete_activity(client, req, res) {
  let pull_obj = {}
  let id = req.body.id
  pull_obj["activities"] = { id: id }
  delete_object(client, req, res, id, pull_obj, "Activity")
}
async function edit_activity(client, req, res) {
  let id = req.body.id
  let set_obj = {
    "activities.$.name": req.body.new_name,
    "activities.$.expiration": req.body.new_expiration,
    "activities.$.done": req.body.new_done,
  }
  let identifier = { key: "activities.id", value: id }
  edit_object(client, req, res, set_obj, "Activity", identifier)
}

async function get_activity(client, req, res) {
  let id = req.body.id
  let fields = ["activities.$"]
  let identifier = { key: "activities.id", value: id }
  get_objects(client, req, res, fields, "Activity", identifier)
}

module.exports = { get_activities, delete_activity, edit_activity, create_activity, get_activity }
