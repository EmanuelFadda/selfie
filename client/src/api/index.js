import user from "./user"
import notes from "./notes"
import tags from "./tags"

class API {
  constructor() {
    Object.assign(this, {
      ...user,
      ...notes,
      ...tags,
    })
  }
}

export default new API()