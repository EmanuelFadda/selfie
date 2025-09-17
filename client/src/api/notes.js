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

async function getNote(id) {
  try {
    const response = await AXIOS.get("/get_note", { params: { id }})
    return response.data
  } catch (error) {
    console.error("Get note error:", error)
    throw error
  }
}

async function createNote(title, content, tag, created) {
  const modified = created
  try {
    const response = await AXIOS.post("/create_note", { title, content, tag, created, modified })
    return response.data
  } catch (error) {
    console.error("Create note error:", error)
    throw error
  }
}

async function editNote(id, new_title, new_content, new_tag, new_modified) {
  try {
    const response = await AXIOS.post("/edit_note", { id, new_title, new_content, new_tag, new_modified })
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
  getNote,
  createNote,
  editNote,
  deleteNote,
}