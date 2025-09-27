import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import LoginView from "@/views/LoginView.vue"
import CalendarView from "@/views/CalendarView.vue"
import CreditsView from "@/views/CreditsView.vue"
import EditLayoutView from "@/views/EditLayoutView.vue"
import RegisterView from "@/views/RegisterView.vue"
import NotesView from "@/views/NotesView.vue"
import TomatoView from "@/views/TomatoView.vue"
import NoteReaderView from "@/views/NoteReaderView.vue"
import EditTagsView from "@/views/EditTagsView.vue"
import CallbackView from "@/views/CallbackView.vue"
import CalendarReaderView from "@/views/CalendarReaderView.vue"
import CreateTomatoView from "@/views/CreateTomatoView.vue"

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
  {
    path: "/:username/tomato/:id",
    name: "tomatoEdit",
    component: CreateTomatoView,
  },
  {
    path:"/callback",
    name: "callback",
    component: CallbackView,
  },
  { 
    path: "/:username/calendar/:id",
    name: "calendarReader",
    component: CalendarReaderView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
