import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{#router}}
import MpvueRouterPatch from 'mpvue-router-patch'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/router}}
import App from '@/App'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{#vuex}}
import store from '@/store'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/vuex}}
import './style/common.scss'
import './style/iconfont.css'
require('@/extend')

{{#router}}
Vue.use(MpvueRouterPatch){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/router}}
Vue.config.productionTip = false{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const app = new Vue({
  mpType: 'app',{{#vuex}}
  store,{{/vuex}}
  ...App{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
app.$mount(){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
