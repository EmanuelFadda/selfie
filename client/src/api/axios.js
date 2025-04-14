import axios from "axios"

const API_URL = "http://localhost:3000"

const AXIOS = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

AXIOS.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers["token"] = token
  }

  return config
})

export { AXIOS }