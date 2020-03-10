export default {
  state: {
    sysInfo: {
      statusBarHeight: 0,
      navigationHeight: 0,
      fontSizeSetting: "16px",
      tabBarHeight: 0,
      screenHeight: 0,
      windowHeight: 0
    },
    // 对方用户信息
    toUserInfo: {},
    // 当前用户信息
    userInfo: {
      id: "",
      name: "",
      phone: "",
      // 用户类型 0-游客 1-超管 2-销售
      type: 0,
      openId: "",
      isWeChat: 0,
      im: {
        userID: "",
        userSig: ""
      }
    },
    // 会话列表
    conversations: []
  },
  getters: {
    getCurrentConversation: state => conversationID => {
      return state.conversations.find(c => c.conversationID === conversationID);
    },
    hasPhone: state => !!state.userInfo.phone
  },
  mutations: {
    setNavBarHeight: (
      state,
      {
        navigationHeight,
        statusBarHeight,
        fontSizeSetting,
        screenHeight,
        windowHeight
      }
    ) => {
      state.sysInfo = {
        statusBarHeight,
        navigationHeight,
        windowHeight,
        screenHeight,
        fontSizeSetting: fontSizeSetting + "px"
      };
    },
    // setScreenHeight: (state, sHeight) => {
    //   state.screenHeight = sHeight
    // },
    setUserInfo: (state, userInfo) => {
      state.userInfo = {
        ...userInfo,
        im: {
          userID: userInfo.identifier,
          userSig: userInfo.imSign
        }
      };
    },
    setToUserInfo: (state, userInfo) => {
      state.toUserInfo = { ...state.toUserInfo, ...userInfo };
    },
    setCurrentUserInfo: (state, userInfo) => {
      state.userInfo = { ...state.userInfo, ...userInfo };
    },
    setImInfo: (state, imInfo) => {
      state.userInfo.im = imInfo;
    },
    setConversations: (state, list) => {
      state.conversations = list || [];
    },
    setMessageList: (state, { list, isCompleted, conversationID }) => {
      let conversation = state.conversations.find(
        c => c.conversationID === conversationID
      );
      if (!conversation) return;
      conversation.messages = {
        isCompleted: isCompleted,
        messageList: list.concat(conversation.messages.messageList)
      };
      // conversation.isCompleted = isCompleted
      // conversation.messageList = list.concat(conversation.messageList)
      const first = list[0];
      if (first) {
        conversation.messages.nextReqMessageID = list[0].ID;
      }
      // state.conversation = conversation
    }
  }
};
