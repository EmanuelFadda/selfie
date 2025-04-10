const { get_new_tomato } = require("../../getters")
const { create_object,edit_object,delete_object,get_objects } = require("../general")


async function get_tomatoes(client, req, res) {
  let fields = ["tomato_sessions"]
  get_objects(client, req, res, fields, "Tomato sessions")
}

async function create_tomato(client, req, res) {
  new_tomato = get_new_tomato(req.body.name, req.body.rep_tomato, req.body.time_tomato, req.body.time_short_break, req.body.time_long_break)
  create_object(client, req, res, new_tomato.id, { tomato_sessions: new_tomato }, "Tomato")
}
async function delete_tomato(client, req, res) {
  let pull_obj = {}
  let id = req.body.id
  pull_obj["tomato_sessions"] = { id: id }
  delete_object(client, req, res, id, pull_obj, "Tomato")
}
async function edit_tomato(client, req, res) {
  let id = req.body.id
  let set_obj = {
    "tomato_sessions.$.name": req.body.new_name,
    "tomato_sessions.$.rep_tomato": req.body.new_rep_tomato,
    "tomato_sessions.$.time.tomato": req.body.new_time_tomato,
    "tomato_sessions.$.time.short_break": req.body.new_short_break,
    "tomato_sessions.$.time.long_break": req.body.new_long_break,
  }
  let identifier = { key: "tomato_sessions.id", value: id }
  edit_object(client, req, res, id, set_obj, "Tomato", identifier)
}

async function get_tomato(client, req, res) {
  let id = req.body.id
  let fields = ["tomato_sessions.$"]
  let identifier = { key: "tomato_sessions.id", value: id }
  get_objects(client, req, res, fields, "Tomato", identifier)
}

module.exports={get_tomatoes,create_tomato,delete_tomato,edit_tomato,get_tomato}