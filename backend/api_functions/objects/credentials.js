const { get_objects, edit_object } = require("../general")
const name_obj="Credentials"


async function get_credentials(client, req, res) {
  let fields = ["credentials"]
  get_objects(client, req, res, fields, name_obj)
}

async function set_credentials(client, req, res) {
  let set_obj = {
    "credentials.name": req.body.name,
    "credentials.surname": req.body.surname,
    "credentials.username": req.body.username,
    "credentials.email": req.body.email,
    "credentials.image": req.body.image,
    "credentials.password": req.body.password,
    "credentials.birthday": req.body.birthday,
  }
  edit_object(client, req, res, set_obj, name_obj, null)
}

module.exports = { get_credentials, set_credentials }
