import Vue from 'vue'
import resetPatch from './mixin/reset-patch'
require('./prototype')

Vue.use(resetPatch)
