import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NoteView from '../views/NoteView.vue'
import GameView from '../views/GameView.vue'
import ToDoListView from '../views/ToDoListView.vue'
import MoreView from '../views/MoreView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/note',
      name: 'ndte',
      component: NoteView
    },
    {
      path: '/game',
      name: 'game',
      component: GameView
    },
    {
      path: '/ToDoList',
      name: 'toDoList',
      component: ToDoListView
    },
    {
      path: '/empty',
      name: 'empty',
      component: MoreView
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
