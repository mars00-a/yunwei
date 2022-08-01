import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

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
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
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
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'Documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'Guide', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  },

  // 字典表
  {
    path: '/opdict',
    component: Layout,
    redirect: '/opdict/object',
    meta: { title: '字典表', icon: 'link' },
    children: [
      {
        path: 'object',
        name: 'ObjectPage',
        meta: { title: '检测对象', icon: 'link' },
        component: () => import('@/views/opdict/object')
      },
      {
        path: 'opcid',
        name: 'OpcidPage',
        meta: { title: '运维事件', icon: 'link' },
        component: () => import('@/views/opdict/opcid')
      },
      {
        path: 'service',
        name: 'ServicePage',
        meta: { title: '服务类型', icon: 'link' },
        component: () => import('@/views/opdict/service')
      },
      {
        path: 'signal',
        name: 'SignalPage',
        meta: { title: '运维指标', icon: 'link' },
        component: () => import('@/views/opdict/signal')
      },
      {
        path: 'status',
        name: 'StatusPage',
        meta: { title: '运维状态', icon: 'link' },
        component: () => import('@/views/opdict/status')
      }
    ]
  },
  // 服务器台账
  {
    path: '/serverLedger',
    component: Layout,
    redirect: '/serverLedger/customer_maintain',
    meta: { title: '服务器台账', icon: 'link' },
    children: [
      {
        path: 'customer_maintain',
        name: 'CustomerMaintainPage',
        meta: { title: '客户信息维护', icon: 'link' },
        component: () => import('@/views/serverLedger/customer_maintain')
      },
      {
        path: 'server_maintain',
        name: 'ServerMaintainPage',
        meta: { title: '服务器信息维护', icon: 'link' },
        component: () => import('@/views/serverLedger/server_maintain')
      },
      {
        path: 'service_maintain',
        name: 'ServiceMaintainPage',
        meta: { title: '服务类型', icon: 'link' },
        component: () => import('@/views/serverLedger/service_maintain')
      },
      {
        path: 'Details',
        name: 'Details',
        meta: { title: '服务器详情', icon: 'link' },
        component: () => import('@/views/serverLedger/Details')
      },
      {
        path: 'csr',
        name: 'csr',
        meta: { title: '程思睿', icon: 'link' },
        component: () => import('@/views/serverLedger/csr')
      }
    ]
  },
  // 服务器台账
  {
    path: '/messagePush',
    component: Layout,
    redirect: '/messagePush/msgPush',
    meta: { title: '消息推送配置', icon: 'link' },
    children: [
      {
        path: 'msgPush',
        name: 'MsgPush',
        meta: { title: '消息推送配置', icon: 'link' },
        component: () => import('@/views/messagePush/msgPush')
      },
      {
        path: 'historicalMsg',
        name: 'historicalMsg',
        meta: { title: '历史记录', icon: 'link' },
        component: () => import('@/views/messagePush/historicalMsg')
      }
    ]
  },
  //服务器查看
  {
    path: '/ServeerInfomation',
    component: Layout,
    redirect: '/ServerInfomation/CPU',
    meta: { title: '服务器查看', icon: 'link' },
    children: [
      {
        path: 'CPU',
        name: 'CPU',
        meta: { title: 'CPU使用实时状态', icon: 'link' },
        component: () => import('@/views/ServerInformation/CPU')
      },{
        path: 'disk',
        name: 'disk',
        meta: { title: '磁盘空间最新状态', icon: 'link' },
        component: () => import('@/views/ServerInformation/disk')
      },{
        path: 'hardware',
        name: 'hardware',
        meta: { title: '硬件实时状态', icon: 'link' },
        component: () => import('@/views/ServerInformation/hardware')
      },{
        path: 'ram',
        name: 'ram',
        meta: { title: '内存实时状态表', icon: 'link' },
        component: () => import('@/views/ServerInformation/ram')
      }
    ]
  },
  //网络授权服务器查看
  {
    path: '/NetworkAuthorizationServerInformation',
    component: Layout,
    redirect: '/NetworkAuthorizationServerInformation/CPU',
    meta: { title: '网络授权服务器查看', icon: 'link' },
    children: [
      {
        path: 'CPU',
        name: 'CPU',
        meta: { title: 'CPU使用实时状态', icon: 'link' },
        component: () => import('@/views/NetworkAuthorizationServerInformation/CPU')
      },{
        path: 'disk',
        name: 'disk',
        meta: { title: '磁盘空间最新状态', icon: 'link' },
        component: () => import('@/views/NetworkAuthorizationServerInformation/disk')
      },{
        path: 'hardware',
        name: 'hardware',
        meta: { title: '硬件实时状态', icon: 'link' },
        component: () => import('@/views/NetworkAuthorizationServerInformation/hardware')
      },{
        path: 'ram',
        name: 'ram',
        meta: { title: '内存实时状态表', icon: 'link' },
        component: () => import('@/views/NetworkAuthorizationServerInformation/ram')
      }
    ]
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
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
