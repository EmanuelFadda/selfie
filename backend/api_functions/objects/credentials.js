const { get_objects } = require("../general")

async function get_credentials(client,req,res){
    let fields = ["credentials"]
    get_objects(client, req, res, fields, "Credentials")
}

async function set_credentials(){

}

module.exports={get_credentials,set_credentials}