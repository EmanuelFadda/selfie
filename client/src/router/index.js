import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import LoginView from "@/views/LoginView.vue"
import CalendarView from "@/views/CalendarView.vue"
import CreditsView from "@/views/CreditsView.vue"
import EditLayoutView from "@/views/EditLayoutView.vue"
import CalendarNotificationsView from "@/views/CalendarNotificationsView.vue"
import RegisterView from "@/views/RegisterView.vue"
import NotesView from "@/views/NotesView.vue"
import TomatoView from "@/views/TomatoView.vue"
import NoteReaderView from "@/views/NoteReaderView.vue"
import EditTagsView from "@/views/EditTagsView.vue"

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/:username",
    name: "home",
    component: HomeView,
  },
  {
    path: "/:username/calendar",
    name: "calendar",
    component: CalendarView,
  },
  {
    path: "/:username/credits",
    name: "credits",
    component: CreditsView,
  },
  {
    path: "/:username/edit_layout",
    name: "editLayout",
    component: EditLayoutView,
  },
  {
    path: "/:username/edit_tags",
    name: "editTags",
    component: EditTagsView,
  },
  {
    path: "/:username/calendar/notifications",
    name: "calendarNotifications",
    component: CalendarNotificationsView,
  },
  {
    path: "/:username/notes",
    name: "notes",
    component: NotesView,
  },
  {
    path: "/:username/notes/:id",
    name: "noteReder",
    component: NoteReaderView,
  },
  {
    path: "/:username/tomato",
    name: "tomato",
    component: TomatoView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
