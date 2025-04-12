const { get_objects, edit_object } = require("../general")

async function get_menù(client, req, res) {
  let fields = ["menù"]
  get_objects(client, req, res, fields, "Menù")
}

async function set_menù_layout(client, req, res) {
  let set_obj = {
    "menù.layout": req.body.layout,
  }
  edit_object(client, req, res, set_obj, "Layout", null)
}

async function set_menù_content_activities(client, req, res) {
  let set_obj = {
    "menù.content.activities": req.body.activities,
  }
  edit_object(client, req, res, set_obj, "Section content activity", null)
}

async function set_menù_content_events(client, req, res) {
  let set_obj = {
    "menù.content.events": req.body.events,
  }
  edit_object(client, req, res, set_obj, "Section content events", null)
}

async function set_menù_content_tomatoes(client, req, res) {
  let set_obj = {
    "menù.content.tomato_sessions": req.body.tomatoes,
  }
  edit_object(client, req, res, set_obj, "Section content tomatoes", null)
}

async function set_menù_content_notes(client, req, res) {
  let set_obj = {
    "menù.content.notes": req.body.notes,
  }
  edit_object(client, req, res, set_obj, "Section content notes", null)
}

module.exports = {
  get_menù,
  set_menù_layout,
  set_menù_content_activities,
  set_menù_content_events,
  set_menù_content_tomatoes,
  set_menù_content_notes,
}
