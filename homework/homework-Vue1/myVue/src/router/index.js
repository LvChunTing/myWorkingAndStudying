import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import table from '@/components/Table'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})
Vue.component(table.name, table)
