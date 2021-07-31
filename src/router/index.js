import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Main from '../components/Main.vue'

const routes = [
	{
	    path: '/',
	    redirect: '/home'
	  },
		{
		  path: '/main',
		  component: Main,
		  children: [{
		  path: '/home',
		  name: 'Home',
		  component: () => import('@/components/Home')
		},{
			path:'/grxx',
			component: () => import('@/components/Grxx')
		},{
			path:'/lylb',
			component: () => import('@/components/Lylb')
		},{
			path:'/sslb',
			component: () => import('@/components/Sslb')
		},{
			path:'/yhlb',
			component: () => import('@/components/Yhlb')
		},{
			path: '/xslb',
			component: () => import('@/components/Xslb')
		},{
			path: '/shbx',
			component: () => import('@/components/Shbx')
		},{
			path: '/bxlb',
			component: () => import('@/components/Bxlb')
		}]
		},
		{
			path: '/login',
			name: 'Login',
			component: () => import('@/components/Login')
		}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  if (to.name == 'Login') { //如果要去的页面是登录页面，就进行下一步，不做判断
    next()
  } else {
    if (localStorage.getItem('token')) {
      next()
    } else {
        alert('请先登录');
        router.push({name:'Login'});
    }
  }
})

export default router
