import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// 引入插件  使用vant组件
import useVant from"@/plugins/index.js"
useVant()

// Vue.prototype.HOST='http://localhost:3000'
new Vue({
  router,
  store,
beforeCreate(){
  Vue.prototype.$bus=this

},
  render: h => h(App)
}).$mount('#app')
