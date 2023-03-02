import Vue from 'vue'
import Router from 'vue-router'
import i18n from '@/lang'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'
// 其他路由规则
export const otherRoutes = [
  {
    path: '/approvals',
    component: Layout,
    meta: {
      name: 'approvals'
    },
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
    meta: {
      name: 'departments'
    },
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
    meta: {
      name: 'employees'
    },
    children: [
      {
        path: '',
        name: 'employees',
        component: () => import('@/views/employees1/index'),
        meta: { title: '员工', icon: 'people' }
      },
      {
        path: 'import',
        name: 'import',
        component: () => import('@/views/employees1/import.vue'),
        hidden: true
        // 不在菜单中显示
      },
      {
        path: 'detail/:id',
        name: 'Detail',
        component: () => import('@/views/employees1/detail.vue'),
        hidden: true
        // 不在菜单中显示
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    meta: {
      name: 'permissions'
    },
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
    meta: {
      name: 'attendances'
    },
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
    meta: {
      name: 'salarys'
    },
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
    meta: {
      name: 'settings'
    },
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
    meta: {
      name: 'social_securitys'
    },
    children: [
      {
        path: '',
        name: 'social',
        component: () => import('@/views/social/index'),
        meta: { title: '社保', icon: 'table' }
      }
    ]
  }
]
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
        meta: { title: i18n.t('route.dashboard'), icon: 'dashboard' }
      }
    ]
  }

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
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
