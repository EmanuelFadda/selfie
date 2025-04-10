const { get_new_note, get_time_now } = require("../../getters")
const { create_object, edit_object, delete_object, get_objects } = require("../general")

async function create_note(client, req, res) {
  new_note = get_new_note(req.body.title, req.body.content, req.body.tag)
  create_object(client, req, res, new_note.id, { notes: new_note }, "Note")
}
async function delete_note(client, req, res) {
  let pull_obj = {}
  let id = req.body.id
  pull_obj["notes"] = { id: id }
  delete_object(client, req, res, id, pull_obj, "Note")
}
async function edit_note(client, req, res) {
  let id = req.body.id
  let set_obj = {
    "notes.$.title": req.body.new_title,
    "notes.$.content": req.body.new_content,
    "notes.$.tag": req.body.new_tag,
    "notes.$.date_last_modify": get_time_now(),
  }

  let identifier = { key: "notes.id", value: id }
  edit_object(client, req, res, id, set_obj, "Note", identifier)
}
async function get_notes(client, req, res) {
  let fields = ["notes"]
  get_objects(client, req, res, fields, "Notes")
}

async function get_note(client, req, res) {
  let id = req.body.id
  let fields = ["notes.$"]
  let identifier = { key: "notes.id", value: id }
  get_objects(client, req, res, fields, "Notes", identifier)
}

module.exports = { create_note, delete_note, edit_note, get_notes, get_note }
