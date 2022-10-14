import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
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
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/cost',
    component: Layout,
    redirect: '/cost/expolorer',
    name: 'CostManagement',
    meta: { title: 'Cost Management', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'expolorer',
        name: 'CostExplorer',
        component: () => import('@/views/cost_explorer/index'),
        meta: { title: 'Cost Explorer', icon: 'table' }
      },
      {
        path: 'budgets',
        name: 'Budgets',
        component: () => import('@/views/budgets/index'),
        meta: { title: 'Budgets', icon: 'tree' }
      },
      {
        path: 'anomaly',
        name: 'AnomalyCostDetection',
        component: () => import('@/views/anomaly_cost/index'),
        meta: { title: 'Anomaly Cost Detection', icon: 'form' }
      }
    ]
  },

  {
    path: '/resources',
    component: Layout,
    redirect: '/resources/ri_overview',
    name: 'Resources',
    meta: {
      title: 'Resources',
      icon: 'nested'
    },
    children: [
      {
        path: 'ri_overview',
        component: () => import('@/views/ri_overview/index'),
        name: 'RIOverview',
        meta: { title: 'RI Overview', icon: 'table' }
      },
      {
        path: 'ri_suggestions',
        component: () => import('@/views/ri_suggestions/index'),
        name: 'RISuggestions',
        meta: { title: 'RI Suggestions', icon: 'table' }
      },
      {
        path: 'ri_utilization',
        component: () => import('@/views/ri_utilization/index'),
        name: 'RIUtilization',
        meta: { title: 'RI Utilization', icon: 'table' }
      },
      {
        path: 'allocated_suggestions',
        component: () => import('@/views/allocated_suggestions/index'),
        name: 'RIResources Suggestions',
        meta: { title: 'Allocated Resources Suggestions', icon: 'tree' }
      },
      {
        path: 'allocated_utilization',
        component: () => import('@/views/allocated_utilization/index'),
        name: 'RIResourcesUtilization',
        meta: { title: 'Allocated Resources Utilization', icon: 'tree' }
      },
      {
        path: 'carbon',
        component: () => import('@/views/carbon/index'),
        name: 'Carbon',
        meta: { title: 'Carbon Emission', icon: 'form' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
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
