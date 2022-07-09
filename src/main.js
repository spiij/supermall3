import Vue from 'vue'
import App from './App.vue'

import router from './router'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')


// let score = 90
//
// if(0 <= score < 60){
//   console.log('及格');
// }else if(80 <= score < 90){
//   console.log('良好');
// }else if(90 <= score){
//   console.log('优秀');
// }