import { AXIOS } from "./axios"

async function getEvents() {
  try {
    const response = await AXIOS.get("/get_events")
    return response.data
  } catch (error) {
    console.error("Get events error:", error)
    throw error
  }
}

async function createEvent(title,repeat_type,repeat_start_date,repeat_finish_date) {
  try {
    const response = await AXIOS.post("/create_event", { title, repeat_type,repeat_start_date,repeat_finish_date })
    return response.data
  } catch (error) {
    console.error("Create event error:", error)
    throw error
  }
}

async function editEvent(id,new_title, new_type_rep, new_start,new_finish) {
  try {
    const response = await AXIOS.post("/edit_event", { id, new_title, new_type_rep,new_start,new_finish })
    return response.data
  } catch (error) {
    console.error("Edit event error:", error)
    throw error
  }
}

async function deleteEvent(id) {
  try {
    const response = await AXIOS.delete("/delete_event",  {id})
    return response.data
  } catch (error) {
    console.error("Delete event error:", error)
    throw error
  }
}

export default {
  getEvents,
  createEvent,
  editEvent,
  deleteEvent,
}