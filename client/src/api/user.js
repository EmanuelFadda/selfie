import { AXIOS } from "./axios"

async function login(object_query) {
  try {
    const response = await AXIOS.post("/login", object_query)
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

async function create_account(name, surname, password, email, image, username, birthday, login) {
  try {
    const response = await AXIOS.post("/create_account", 
      { name, surname, password, email, image, birthday, username, login },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    return response.data
  } catch (error) {
    console.error("Create account error:", error)
    throw error
  }
}

export default {
  login,
  getCredentials,
  create_account,
}
