import { AXIOS } from "./axios"

async function getMenu() {
  try {
    const response = await AXIOS.get("/get_menu/")
    return response.data
  } catch (error) {
    console.error("Get menu error:", error)
    throw error
  }
}

async function setMenuLayout(newLayout) {
  try {
    const response = await AXIOS.post("/set_menu/layout", { new_layout: newLayout })
    return response.data
  } catch (error) {
    console.error("Set menu layout error:", error)
    throw error
  }
}

async function setMenuContentActivities(newActivities) {
  try {
    const response = await AXIOS.post("/set_menu/content/activities", { new_activities: newActivities })
    return response.data
  } catch (error) {
    console.error("Set menu content activities error:", error)
    throw error
  }
}

async function setMenuContentEvents(newEvents) {
  try {
    const response = await AXIOS.post("/set_menu/content/events", { new_events: newEvents })
    return response.data
  } catch (error) {
    console.error("Set menu content events error:", error)
    throw error
  }
}

async function setMenuContentTomatoes(newTomatoes) {
  try {
    const response = await AXIOS.post("/set_menu/content/tomatoes", { new_tomatoes: newTomatoes })
    return response.data
  } catch (error) {
    console.error("Set menu content tomatoes error:", error)
    throw error
  }
}

async function setMenuContentNotes(newNotes) {
  try {
    const response = await AXIOS.post("/set_menu/content/notes", {  new_notes: newNotes })
    return response.data
  } catch (error) {
    console.error("Set menu content notes error:", error)
    throw error
  }
}

export default {
  getMenu,
  setMenuLayout,
  setMenuContentActivities,
  setMenuContentEvents,
  setMenuContentTomatoes,
  setMenuContentNotes,
}

  