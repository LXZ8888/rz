import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/approvals',
    component: Layout,
    children: [
      {
        path: '',
        name: 'approvals',
        component: () => import('@/views/approvals/index'),
        meta: { title: '审批', icon: 'tree-table' }
      }
    ]
  },
  {
    path: '/departments',
    component: Layout,
    children: [
      {
        path: '',
        name: 'departments',
        component: () => import('@/views/departments/index'),
        meta: { title: '组织架构', icon: 'tree' }
      }
    ]
  },
  {
    path: '/employees',
    component: Layout,
    children: [
      {
        path: '',
        name: 'employees',
        component: () => import('@/views/employees1/index'),
        meta: { title: '员工', icon: 'people' }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    children: [
      {
        path: '',
        name: 'permission',
        component: () => import('@/views/permission/index'),
        meta: { title: '权限管理', icon: 'lock' }
      }
    ]
  },
  {
    path: '/attendances',
    component: Layout,
    children: [
      {
        path: '',
        name: 'attendances',
        component: () => import('@/views/attendances/index'),
        meta: { title: '考勤', icon: 'tree-table' }
      }
    ]
  },
  {
    path: '/salarys',
    component: Layout,
    children: [
      {
        path: '',
        name: 'salarys',
        component: () => import('@/views/salarys/index'),
        meta: { title: '工资', icon: 'money' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    children: [
      {
        path: '',
        name: 'setting',
        component: () => import('@/views/setting/index'),
        meta: { title: '公司设置', icon: 'setting' }
      }
    ]
  },
  {
    path: '/social',
    component: Layout,
    children: [
      {
        path: '',
        name: 'social',
        component: () => import('@/views/social/index'),
        meta: { title: '社保', icon: 'table' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
