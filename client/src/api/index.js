import user from "./user"
import notes from "./notes"
import tags from "./tags"
import tomatoes from "./tomatoes"
import activities from "./activities"
import events from "./events"
import menu from "./menu"

class API {
  constructor() {
    Object.assign(this, {
      ...user,
      ...notes,
      ...tags,
      ...tomatoes,
      ...activities,
      ...events,
      ...menu,
    })
  }
}

export default new API()