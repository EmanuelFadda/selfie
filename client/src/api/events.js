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


async function createEvent(title,created,modified,scheduled,duration,color, repeat_type,repeat_start_date,repeat_finish_date) {
  try {
    const response = await AXIOS.post("/create_event", { title, created, modified, scheduled, duration, color, repeat_type,repeat_start_date,repeat_finish_date })
    return response.data
  } catch (error) {
    console.error("Create event error:", error)
    throw error
  }
}


/*
    "events.$.title": req.body.new_title,
    "events.$.scheduled": req.body.new_scheduled,
    "events.$.duration": req.body.new_duration,
    "events.$.modified":req.body.new_modified,
    "events.$.color":req.body.new_color,
    "events.$.repeat.type": req.body.new_type_rep,
    "events.$.repeat.start_date": req.body.new_start,
    "events.$.repeat.finish_date": req.body.new_finish,
*/
async function editEvent(id,new_title,new_scheduled,new_duration,new_modified , new_color,new_type_rep, new_start,new_finish) {
  try {
    const response = await AXIOS.post("/edit_event", { id, new_title, new_scheduled, new_duration, new_modified , new_color, new_type_rep,new_start,new_finish })
    return response.data
  } catch (error) {
    console.error("Edit event error:", error)
    throw error
  }
}

async function deleteEvent(id) {
  console.log(2000)
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