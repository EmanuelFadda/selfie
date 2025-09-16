import user from "./user"
import notes from "./notes"
import tags from "./tags"
import tomatoes from "./tomatoes"

class API {
  constructor() {
    Object.assign(this, {
      ...user,
      ...notes,
      ...tags,
      ...tomatoes,
    })
  }
}

export default new API()