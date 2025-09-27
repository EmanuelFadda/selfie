import { AXIOS } from "./axios"

async function getActivities() {
  try {
    const response = await AXIOS.get("/get_activities")
    return response.data
  } catch (error) {
    console.error("Get activities error:", error)
    throw error
  }
}

async function createActivity(title,expiration,created,modified,color,id_tomato) {
  try {
    const response = await AXIOS.post("/create_activity", { title,expiration,created,modified,color,id_tomato})
    return response.data
  } catch (error) {
    console.error("Create activity error:", error)
    throw error
  }
}
/*

  let set_obj = {
    "activities.$.title": req.body.new_title,
    "activities.$.expiration": req.body.new_expiration,
    "activities.$.modified":req.body.new_modified,
    "activities.$.color":req.body.new_color,
    "activities.$.id_tomato": req.body.new_id_tomato,
    "activities.$.done": req.body.new_done,
  }
*/
async function editActivity(id,new_title,new_expiration,new_modified , new_color,new_id_tomato, new_done) {
  try {
    console.log("nell'api:",id,new_title,new_expiration,new_modified , new_color,new_id_tomato, new_done)
    const response = await AXIOS.post("/edit_activity", { id,new_title,new_expiration,new_modified , new_color,new_id_tomato,new_done})
    return response.data
  } catch (error) {
    console.error("Edit activity error:", error)
    throw error
  }
}

async function deleteActivity(id) {
  try {
    const response = await AXIOS.delete("/delete_event",  {id})
    return response.data
  } catch (error) {
    console.error("Delete activity error:", error)
    throw error
  }
}

export default {
  getActivities,
  createActivity,
  editActivity,
  deleteActivity,
}