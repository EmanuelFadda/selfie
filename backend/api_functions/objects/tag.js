const { get_new_tag } = require("../../getters")
const { create_object, edit_object, delete_object, get_objects } = require("../general")
const name_obj="Tag"
async function create_tag(client, req, res) {
  new_tag = get_new_tag(req.body.name, req.body.color)
  create_object(client, req, res, { tags: new_tag }, name_obj)
}

async function edit_tag(client, req, res) {
  let name = req.body.name

  let set_obj = { "tags.$.name": req.body.new_name, "tags.$.color": req.body.new_color }
  let identifier = { key: "tags.name", value: name }

  edit_object(client, req, res, set_obj, name_obj, identifier)
}

async function delete_tag(client, req, res) {
  let pull_obj = {}
  let name = req.body.name
  pull_obj["tags"] = { name: name }
  delete_object(client, req, res, pull_obj, name_obj)
}
async function get_tags(client, req, res) {
  let fields = ["tags"]
  get_objects(client, req, res, fields, name_obj)
}

async function get_tag(client, req, res) {
  let name = req.body.name
  let fields = ["tags.$"]
  let identifier = { key: "tags.name", value: name }
  get_objects(client, req, res, fields, name_obj, identifier)
}
module.exports = { create_tag, delete_tag, edit_tag, get_tags, get_tag }
