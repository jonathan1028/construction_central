import Vue from 'vue'
import Router from 'vue-router'

// Public Pages
import PublicLayout from '../components/public/PublicLayout'
import Home from '@/components/public/Home'

// Login Pages
import LoginLayout from '../components/public/LoginLayout'
import LoginPage from '../components/public/LoginPage'
import SignupPage from '../components/public/SignupPage'

// import OrganizationSignUpPage from '../components/public/OrganizationSignUpPage'
// import store from '../store/index'

// Organization Console
// import OrganizationConsoleLayout from '../components/organizationConsole/OrganizationConsoleLayout'
// import OrganizationProfilePage from '../components/organizationConsole/pages/OrganizationProfilePage'
// import MyOpportunitiesPage from '../components/organizationConsole/pages/MyOpportunitiesPage'
// import MyVolunteersPage from '../components/organizationConsole/pages/MyVolunteersPage'
// import OpportunityPage from '../components/organizationConsole/pages/OpportunityPage'

// User Console
import ConsoleLayout from '../components/console/ConsoleLayout'
import DashboardPage from '../components/console/Dashboard'
// import UserConsoleLayout from '../components/userConsole/UserConsoleLayout'
// import FeedPage from '../components/userConsole/pages/FeedPage'
// import ProfilePage from '../components/userConsole/pages/ProfilePage'
// import NotificationsPage from '../components/userConsole/pages/NotificationsPage'

// Admin Console
// import AdminLayout from '../components/adminConsole/AdminLayout'
// import AdminDashboardPage from '../components/adminConsole/pages/AdminDashboardPage'
// import AdminUsersPage from '../components/adminConsole/pages/AdminUsersPage'
// import AdminOrgsPage from '../components/adminConsole/pages/AdminOrgsPage'
// import AdminOpportunitiesPage from '../components/adminConsole/pages/AdminOpportunitiesPage'
// import AdminMedallionsPage from '../components/adminConsole/pages/AdminMedallionsPage'
// import AdminResponsesPage from '../components/adminConsole/pages/AdminResponsesPage'
// import UserUpdate from '../components/adminConsole/modules/UserUpdate'
// import UserRead from '../components/adminConsole/modules/UserRead'
// import NewUsers from '../components/adminConsole/modules/NewUsers'
// // import { GC_USER_ID } from '../constants/settings'
// import UsersMedallionsTable from '../components/adminConsole/modules/UsersMedallionsTable'


Vue.use(Router)

const router = new Router({
  routes: [
  // ======================================= Public Pages =============================================
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/',
      component: PublicLayout,
      children: [
        {
          path: '/',
          redirect: '/home'
        },
        {
          path: '/home',
          name: 'Home',
          component: Home,
          meta: {
            requiresAuth: false
          }
        }
      ]
    },
    // ======================================= Login/Signup Pages =============================================
    {
      path: '/',
      component: LoginLayout,
      children: [
        {
          path: '/login',
          name: 'Login',
          component: LoginPage,
          meta: {
            requiresAuth: false
          }
        },
        {
          path: '/signup',
          name: 'Signup',
          component: SignupPage,
          meta: {
            requiresAuth: false
          }
        }
      ]
    },
    // ======================================= User Console Pages =============================================
    {
      path: '/',
      component: ConsoleLayout,
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: DashboardPage,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
  ],
  // set mode to ‘history’ to remove the hash from the URLs
  mode: 'history'
})

// Need to add funcationality to default to a protected route if requiresAuth has not been set on a route
router.beforeEach((to, from, next) => {
  if (localStorage.USER_ID) {
    console.log('User is Authenticated from router')
  }

  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !localStorage.USER_ID) {
    next('login')
  } else {
    next()
  }
})

export default router