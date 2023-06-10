import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{auth:true}
  },
  {
    path: '/user/:id',
    name: 'user',
    component: () => import('../views/OtherUserProfileView.vue'),
    meta:{auth:true}
  },
  {
    path: '/userByTech/:id',
    name: 'userByTech',
    component: () => import('../views/UserByTechView.vue'),
    meta:{auth:true}
  },
  {
    path: '/userByDesignation/:id',
    name: 'userByDesignation',
    component: () => import('../views/UserByDesignationView.vue'),
    meta:{auth:true}
  },
  {
    path: '/userByName/:searchTerm',
    name: 'userByName',
    component: () => import('../views/UserByNameView.vue'),
    meta:{auth:true}
  },
  {
    path: '/editProfile',
    name: 'editProfile',
    component: () => import('../views/ProfileEditView.vue'),
    meta:{auth:true}
  },
  {
    path: '/user',
    name: 'userAdmin',
    component: () => import('../views/UserAdminView.vue'),
    meta:{auth:true,admin:true}
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    meta:{auth:true}
  },
  {
    path: '/designation',
    name: 'designation',
    component: () => import('../views/DesignationView.vue'),
    meta:{auth:true,admin:true}
  },
  {
    path: '/salary',
    name: 'salary',
    component: () => import('../views/SalaryAdminView.vue'),
    meta:{auth:true,admin:true}
  },
  {
    path: '/salary/:date',
    name: 'salaryByDate',
    component: () => import('../views/SalaryAdminView.vue'),
    meta:{auth:true,admin:true}
  },
  {
    path: '/technology',
    name: 'technology',
    component: () => import('../views/TechnologyView.vue'),
    meta:{auth:true,admin:true}
  },
  {
    path: '/assetstype',
    name: 'assetstype',
    component: () => import('../views/AssetsTypeView.vue'),
    meta:{auth:true,admin:true}
  },
  {
    path: '/assets',
    name: 'assets',
    component: () => import('../views/AssetsAdminView'),
    meta:{auth:true,admin:true}
  },
  {
    path: '/assetsByType/:id',
    name: 'assetsByType',
    component: () => import('../views/AssetsAdminByTypeView'),
    meta:{auth:true}
  },
  {
    path: '/addassets',
    name: 'addassets',
    component: () => import('../views/AssetManageView.vue'),
    meta:{auth:true}
  },
  {
    path: '/editassets/:AssetId',
    name: 'editassets',
    component: () => import('../views/AssetManageView.vue'),
    meta:{auth:true}
  },
  {
    path: '/userAssets',
    name: 'userAssets',
    component: () => import('../views/UserAssetsView.vue'),
    meta:{auth:true}
  },
  {
    path: '/userLeaves',
    name: 'userLeaves',
    component: () => import('../views/UserLeavesView.vue'),
    meta:{auth:true}
  },
  {
    path: '/userSalary',
    name: 'userSalary',
    component: () => import('../views/UserSalaryView.vue'),
    meta:{auth:true}
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue'),
    meta:{auth:false}
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/SigninView.vue'),
    meta:{auth:false}
  },
  {
    path: '/forgetPassword/:id',
    name: 'forgetPassword',
    component: () => import('../views/ForgetPasswordView.vue'),
    meta:{auth:false}
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to,from,next)=>{
  if(to.meta.auth && !localStorage.getItem('token')){
    next('/signin')
  }else if(!to.meta.auth && localStorage.getItem('token')){
    next('/')
  }else if(to.meta.admin && store.getters.getUserState.user.role !='admin'){
    next('/')
  }else{
    next();
  }
});
export default router
