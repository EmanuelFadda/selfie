import { AXIOS } from "./axios"

async function getTomatoes() {
  try {
    const response = await AXIOS.get("/get_tomatoes")
    return response.data
  } catch (error) {
    console.error("Get notes error:", error)
    throw error
  }
}

async function createTomato(name, rep_tomato, time_tomato, time_short_break, time_long_break) {
  try {
    const response = await AXIOS.post("/create_tomato", {name, rep_tomato, time_tomato, time_short_break, time_long_break})
    return response.data
  } catch (error) {
    console.error("Create note error: ", error)
    throw error
  }
}

async function editTomato(id, new_name, new_rep_tomato, new_time_tomato, new_time_short_break, new_time_long_break) {
  try {
    const response = await AXIOS.post("/edit_tomato", {id, new_name, new_rep_tomato, new_time_tomato, new_time_short_break, new_time_long_break})
    return response.data
  } catch (error) { 
    console.error("Edit note error: ", error)
    throw error
  }
}

async function deleteTomato(id) {
  try {
    const response = await AXIOS.delete("/delete_tomato", {data: {id}})
    return response.data
  } catch (error) {
    console.error("Delete note error: ", error)
    throw error
  }
}

async function getTomato() {
  try {
    const response = await AXIOS.get("/get_tomato")
    return response.data
  } catch (error) {
    console.error("Get notes error: ", error)
    throw error
  }
}

export default {
  getTomatoes,
  createTomato,
  editTomato,
  deleteTomato,
  getTomato,
}
