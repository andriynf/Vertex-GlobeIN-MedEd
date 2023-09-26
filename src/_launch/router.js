import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function load(component) {
	return require(`./views/${component}.vue`).default;
}

export default new Router({
  routes: [
		{ path: '/', redirect: { name: 'loading' } },
		{ path: '/loading', name: 'loading', component: load('Loading') },
		{ path: '/settings', name: 'settings', component: load('Settings') },
		{ path: '/updates', name: 'updates', component: load('Updates') },
		{ path: '/content', name: 'content', component: load('Content') },
  ]
})
