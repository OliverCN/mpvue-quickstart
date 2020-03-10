// 开发环境
const devEnv = {
  // apiUrl: 'http://172.17.0.137:57253/api',
  apiUrl: 'https://card-app-api.ishilang.com/api',
  appId: '123456',
  qiniuCDN: 'http://qiniucdn.ishilang.com/',
  qiniuHost: 'https://up.qiniup.com'
}
// 测试环境 暂时用不到
const testEnv = {
  apiUrl: 'http://app-api.ishilang.com/api',
  appId: '123456'
}
// 生成环境
const prodEnv = {
  apiUrl: 'https://card-app-api.ishilang.com/api',
  appId: '123456',
  qiniuCDN: 'http://qiniucdn.ishilang.com/',
  qiniuHost: 'https://up.qiniup.com'
}

// 当前环境
const developEnum = process.build_env

module.exports =
  developEnum === 'test'
    ? testEnv
    : developEnum === 'dev'
      ? devEnv
      : developEnum === 'prod'
        ? prodEnv
        : {}
