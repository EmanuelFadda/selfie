const { get_new_note, get_time_now } = require("../../getters")
const { create_object, edit_object, delete_object, get_objects } = require("../general")
const name_obj="Note"

async function create_note(client, req, res) {
  let b=req.body
  new_note = get_new_note(b.title, b.created, b.modified, b.content, b.tag)
  create_object(client, req, res, { notes: new_note }, name_obj)
}
async function delete_note(client, req, res) {
  let pull_obj = {}
  let id = req.body.id
  pull_obj["notes"] = { id: id }
  delete_object(client, req, res, pull_obj, name_obj)
}
async function edit_note(client, req, res) {
  let id = req.body.id
  let set_obj = {
    "notes.$.title": req.body.new_title,
    "notes.$.modified": req.body.new_modified,
    "notes.$.content": req.body.new_content,
    "notes.$.tag": req.body.new_tag,
  }
  
  let identifier = { key: "notes.id", value: id }
  console.log(identifier)
  edit_object(client, req, res, set_obj, name_obj, identifier)
}
async function get_notes(client, req, res) {
  let fields = ["notes"]
  get_objects(client, req, res, fields, "Notes")
}

async function get_note(client, req, res) {
  let id = req.body.id
  let fields = ["notes.$"]
  let identifier = { key: "notes.id", value: id }
  get_objects(client, req, res, fields, name_obj, identifier)
}

module.exports = { create_note, delete_note, edit_note, get_notes, get_note }
