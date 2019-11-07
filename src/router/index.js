import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/recommend',
	component : ()=> import('@/views/recommend'),
	children :[
		{
			path : ":sid",
			component : ()=> import('@/components/m-singerItem')
		}
	]
  },
  {
    path: '/rank',
  	component : ()=> import('@/views/rank'),
	children : [
		{
			path : ':sid',
			component : ()=> import('@/components/m-singerItem')
		}
	]
  },
  {
    path: '/singer',
  	component : ()=> import('@/views/singer'),
	children : [
		{
			path : ':sid',
			component : ()=> import('@/components/m-singerItem')
		}
	]
  },
  {
	path: '/',
	redirect : '/recommend'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
