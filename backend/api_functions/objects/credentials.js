const { get_objects, edit_object } = require("../general")
const name_obj="Credentials"


async function get_credentials(client, req, res) {
  let fields = ["credentials"]
  get_objects(client, req, res, fields, name_obj)
}

async function set_credentials(client, req, res) {
  let set_obj = {
    "credentials.name": req.body.new_name,
    "credentials.surname": req.body.new_surname,
    "credentials.username": req.body.new_username,
    "credentials.email": req.body.new_email,
    "credentials.image": req.body.new_image,
    "credentials.password": req.body.new_password,
    "credentials.birthday": req.body.new_birthday,
  }
  edit_object(client, req, res, set_obj, name_obj, null)
}

module.exports = { get_credentials, set_credentials }
