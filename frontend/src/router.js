import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './pages/Dashboard.vue'
import ExecuteAgent from './pages/ExecuteAgent.vue'

/**
 * Configuration du router Vue Router
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard des Agents',
    },
  },
  {
    path: '/agent/:name',
    name: 'ExecuteAgent',
    component: ExecuteAgent,
    props: true,
    meta: {
      title: 'Exécution Agent',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router
