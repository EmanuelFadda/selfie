import user from "./user"
import notes from "./notes"
import tags from "./tags"
import tomatoes from "./tomatoes"
import activities from "./activities"
import events from "./events"

class API {
  constructor() {
    Object.assign(this, {
      ...user,
      ...notes,
      ...tags,
      ...tomatoes,
      ...activities,
      ...events
    })
  }
}

export default new API()