var pages = require('./pages')
var tabBarList = require('./tabbar')
var components = require('./usingComponents')

module.exports = {
  pages,
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    onReachBottomDistance: 50
  },
  tabBar: {
    color: '#8A8A8F',
    backgroundColor: '#FFF',
    selectedColor: '#3D77FD',
    borderStyle: 'black',
    list: tabBarList,
    position: 'bottom'
  },
  usingComponents: components,
  networkTimeout: {
    request: 30000
  },
  navigateToMiniProgramAppIdList: ['wxfcd5ffc1d91c93bd', 'wx78a2efeb4645fd5e', 'wx7cbf750722e223a0', 'wxadefad51d5033717']
}
