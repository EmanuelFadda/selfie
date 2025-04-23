import { AXIOS } from "./axios"

async function login(username, password) {
  try {
    const response = await AXIOS.post("/login", { username, password })
    return response.data
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

async function getCredentials() {
  try {
    const response = await AXIOS.get("/get_credentials")
    return response.data
  } catch (error) {
    console.error("Get credentials error:", error)
    throw error
  }
}

async function getMenu() {
  try {
    const response = await AXIOS.get("/get_menu")
    return response.data
  } catch (error) {
    console.error("Get menu error:", error)
    throw error
  }
}

async function create_account(name, surname, password, email, image, username, birthday) {
  try {
    const response = await AXIOS.post("/create_account", { name, surname, password, email, image, birthday, username })
    return response.data
  } catch (error) {
    console.error("Create account error:", error)
    throw error
  }
}

export default {
  login,
  getCredentials,
  getMenu,
  create_account,
}
