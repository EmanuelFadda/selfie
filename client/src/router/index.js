import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import LoginView from "../views/LoginView.vue"
import CalendarView from "../views/CalendarView.vue"
import CreditsView from "../views/CreditsView.vue"
import ModifyLayoutView from "../views/ModifyLayoutView.vue"
import CalendarNotificationsView from "../views/CalendarNotificationsView.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/login",
    name: "login",
    component: LoginView
  },
  {
    path: "/calendar",
    name: "calendar",
    component: CalendarView
  },
  {
    path: "/credits",
    name: "credits",
    component: CreditsView
  },
  {
    path: "/modifylayout",
    name: "modifyLayout",
    component: ModifyLayoutView
  },
  {
    path: "/calendar/notifications",
    name: "calendarNotifications",
    component: CalendarNotificationsView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
