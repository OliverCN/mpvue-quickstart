export default class ShareCard {
  palette({ name, avatarUrl, jobTitle, companyShortName, wxCode }) {
    return {
      width: '588rpx',
      height: '1000rpx',
      background: '#ffffff',
      borderRadius: '28rpx',
      views: [
        {
          type: 'image',
          url: '/static/img/share.png',
          css: {
            width: '588rpx',
            height: '326rpx',
            top: '0rpx',
            left: '0rpx'
          }
        },
        {
          type: 'image',
          url: avatarUrl.replace('http:', 'https:'),
          css: {
            width: '140rpx',
            height: '140rpx',
            top: '238rpx',
            left: '224rpx',
            borderRadius: '70rpx',
            borderColor: '#f5f5f5',
            borderWidth: '1rpx'
          }
        },
        {
          type: 'text',
          text: name,
          css: {
            top: '438rpx',
            left: '294rpx',
            align: 'center',
            fontWeight: 'bold',
            fontSize: '36rpx'
          }
        },
        {
          type: 'text',
          text: jobTitle,
          css: {
            top: '500rpx',
            left: '294rpx',
            align: 'center',
            fontSize: '26rpx',
            color: '#666666'
          }
        },
        {
          type: 'text',
          text: companyShortName,
          css: {
            top: '550rpx',
            left: '294rpx',
            align: 'center',
            fontSize: '26rpx',
            color: '#666666'
          }
        },
        {
          type: 'text',
          text: `我是${name}，共勉`,
          css: {
            top: '648rpx',
            left: '294rpx',
            align: 'center',
            fontSize: '32rpx',
            color: '#333333'
          }
        },
        {
          type: 'image',
          url: wxCode,
          css: {
            width: '200rpx',
            height: '200rpx',
            top: '714rpx',
            left: '294rpx',
            align: 'center'
          }
        },
        {
          type: 'text',
          text: '长按图片，识别小程序码',
          css: {
            bottom: '40rpx',
            left: '294rpx',
            align: 'center',
            fontSize: '20rpx',
            color: '#999999'
          }
        }
      ]
    }
  }
  paletteFace ({ name, avatarUrl, jobTitle, companyShortName, wxCode }) {
    return {
      width: '588rpx',
      height: '1126rpx',
      background: '#ffffff',
      borderRadius: '28rpx',
      views: [
        {
          type: 'image',
          url: '/static/img/share.png',
          css: {
            width: '588rpx',
            height: '326rpx',
            top: '0rpx',
            left: '0rpx'
          }
        },
        {
          type: 'image',
          url: avatarUrl.replace('http:', 'https:'),
          css: {
            width: '140rpx',
            height: '140rpx',
            top: '238rpx',
            left: '224rpx',
            borderRadius: '70rpx',
            borderColor: '#f5f5f5',
            borderWidth: '1rpx'
          }
        },
        {
          type: 'text',
          text: name,
          css: {
            top: '438rpx',
            left: '294rpx',
            align: 'center',
            fontWeight: 'bold',
            fontSize: '36rpx'
          }
        },
        {
          type: 'text',
          text: jobTitle,
          css: {
            top: '512rpx',
            left: '294rpx',
            align: 'center',
            fontSize: '26rpx',
            color: '#666666'
          }
        },
        {
          type: 'text',
          text: companyShortName,
          css: {
            top: '570rpx',
            left: '294rpx',
            align: 'center',
            fontSize: '26rpx',
            color: '#666666'
          }
        },
        {
          type: 'text',
          text: `我是${name}，共勉`,
          css: {
            top: '698rpx',
            left: '294rpx',
            align: 'center',
            fontSize: '32rpx',
            color: '#333333'
          }
        },
        {
          type: 'image',
          url: wxCode,
          css: {
            width: '200rpx',
            height: '200rpx',
            top: '824rpx',
            left: '294rpx',
            align: 'center'
          }
        },
        {
          type: 'text',
          text: '长按图片，识别小程序码',
          css: {
            bottom: '46rpx',
            left: '294rpx',
            align: 'center',
            fontSize: '20rpx',
            color: '#999999'
          }
        }
      ]
    }
  }
}
