const { get_objects } = require("../general")

async function get_menù(client,req,res){
    let fields = ["menù"]
    get_objects(client, req, res, fields, "Menù")
}


async function set_menù_layout(){}
async function set_menù_content_activity(){}
async function set_menù_content_events(){}
async function set_menù_content_tomato(){}

module.exports={get_menù}