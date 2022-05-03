import { createRouter, createWebHistory } from "vue-router"
import Aisde from "./module/Aside"
import type {
  RouteRecordRaw,
  RouteLocationNormalized,
  NavigationGuardNext,
} from "vue-router"
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/find",
  },
  ...Aisde,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    if (to.meta.title) {
      document.title = to.meta.title as string
    }
    next()
  }
)
export default router
