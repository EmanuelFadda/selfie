import { AXIOS } from "./axios"

async function getTags() {
  try {
    const response = await AXIOS.get("/get_tags")
    return response.data
  } catch (error) {
    console.error("Get tags error:", error)
    throw error
  }
}

async function createTag(name, color) {
  try {
    const response = await AXIOS.post("/create_tag", { name, color })
    return response.data
  } catch (error) {
    console.error("Create tag error:", error)
    throw error
  }
}

async function editTag(name, new_name, new_color) {
  try {
    const response = await AXIOS.post("/edit_tag", { name, new_name, new_color })
    return response.data
  } catch (error) {
    console.error("Edit tag error:", error)
    throw error
  }
}

async function deleteTag(name) {
  try {
    const response = await AXIOS.delete("/delete_tag", { data: { name } })
    return response.data
  } catch (error) {
    console.error("Delete tag error:", error)
    throw error
  }
}

export default {
  getTags,
  createTag,
  editTag,
  deleteTag,
}