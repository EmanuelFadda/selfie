import { AXIOS } from "./axios"

async function getNotes() {
  try {
    const response = await AXIOS.get("/get_notes")
    return response.data
  } catch (error) {
    console.error("Get notes error:", error)
    throw error
  }
}

async function createNote(title, content, tag) {
  try {
    const response = await AXIOS.post("/create_note", { title, content, tag })
    return response.data
  } catch (error) {
    console.error("Create note error:", error)
    throw error
  }
}

async function editNote(id, new_title, new_content, new_tag) {
  try {
    const response = await AXIOS.post("/login", { id, new_title, new_content, new_tag })
    return response.data
  } catch (error) {
    console.error("Edit note error:", error)
    throw error
  }
}

async function deleteNote(id) {
  try {
    const response = await AXIOS.delete("/delete_note", { data: { id }})
    return response.data
  } catch (error) {
    console.error("Delete note error:", error)
    throw error
  }
}

export default {
  getNotes,
  createNote,
  editNote,
  deleteNote,
}