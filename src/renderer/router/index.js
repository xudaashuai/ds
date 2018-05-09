import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 's',
      component: require('@/components/VStartPage').default
    },
    {
      path: '/new',
      name: 'n',
      component: require('@/components/VCreateRoomPage').default
    },
    {
      path: '/room',
      name: 'r',
      component: require('@/components/VRoomAdminPage').default
    },
    {
      path: '/enter',
      name: 'e',
      component: require('@/components/VEnterPage').default
    },
  ]
})
