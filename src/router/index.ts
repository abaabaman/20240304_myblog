import { createRouter, createWebHashHistory } from 'vue-router'
import BlogView from '../views/BlogView/index.vue'
import FormulaView from '../views/FormulaView/index.vue'
import GameView from '../views/GameView.vue'
import ToDoListView from '../views/ToDoListView/index.vue'
import MoreView from '../views/MoreView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/blog'
    },
    {
      path: '/blog',
      name: 'blog',
      meta: {
        title: '包包博客'
      },
      component: BlogView
    },
    {
      path: '/formula',
      name: 'formula',
      meta: {
        title: '包包炼金屋'
      },
      component: FormulaView
    },
    {
      path: '/game',
      name: 'game',
      meta: {
        title: '键盘操作'
      },
      component: GameView
    },
    {
      path: '/todoList',
      name: 'todoList',
      meta: {
        title: '写点什么'
      },
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
});


export default router
