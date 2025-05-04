const { get_new_image } = require("../../getters")
const { get_objects, edit_object } = require("../general")
const name_obj="Credentials"


async function get_credentials(client, req, res) {
  let fields = ["credentials"]
  get_objects(client, req, res, fields, name_obj)
}

async function set_credentials(client, req, res) {
  const image=get_new_image(
    req.file.buffer.toString("base64"),
    req.file.mimetype
  )

  let set_obj = {
    "credentials.name": req.body.new_name,
    "credentials.surname": req.body.new_surname,
    "credentials.username": req.body.new_username,
    "credentials.email": req.body.new_email,
    "credentials.image": image,
    "credentials.password": req.body.new_password,
    "credentials.birthday": req.body.new_birthday,
    "credentials.login":req.body.new_login
  }
    
  edit_object(client, req, res, set_obj, name_obj, null)
}

module.exports = { get_credentials, set_credentials }
