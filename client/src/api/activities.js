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

async function editActivity(id,new_title,new_scheduled,new_duration,new_modified , new_color,new_type_rep, new_start,new_finish) {
  try {
    const response = await AXIOS.post("/edit_event", { id,new_title,new_scheduled,new_duration,new_modified , new_color,new_type_rep, new_start,new_finish})
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