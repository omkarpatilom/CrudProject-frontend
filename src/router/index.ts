import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import viewVue from '@/views/Student/view.vue'
import Create from '@/views/Student/Create.vue'
import StudentEdit from '@/views/Student/Edit.vue'
import LoginVue from '@/views/Authontication/Login.vue'
import RegisterVue from '@/views/Authontication/Register.vue'
import HomepageVue from '@/views/User/HomePage.vue'
import NavBar from '@/components/NavBar.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path: "/",
    component: NavBar, 
   
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/student',
      name: 'student',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: viewVue
    },
    {
      path: '/student/create',
      name: 'Create',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Create
    },
    {
      path: '/Students/:id/edit',
      name: 'StudentEdit',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: StudentEdit
    },
    {
      path: '/login',
      name: 'loginUser',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LoginVue
    },
    {
      path: '/Register',
      name: 'RegisterUser',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: RegisterVue
    },
    {
      path: '/Home',
      name: 'HomePage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: HomepageVue
    },
  ]
})

export default router
