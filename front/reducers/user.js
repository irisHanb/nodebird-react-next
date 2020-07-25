import produce from 'immer';

const initState = {
  loginDone: false,
  loginLoading: false,
  loginError: false,
  logoutLoading: false,
  logoutError: null,
  signupDone: false,
  signupLoading: false,
  signupError: null,

  nicknameChangeDone: false,
  nicknameChangeLoading: false,
  nicknameChangeError: false,

  followDone: false,
  followLoading: false,
  followError: null,
  unfollowDone: false,
  unfollowLoading: false,
  unfollowError: null,

  me: null,
  signUpData: {},
  loginData: {}
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';
export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

const addDummyUser = (data) => ({
  ...data,
  nickname: 'hanb',
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [{ nickname: 'hanbrang' }, { nickname: '미영아' }, { nickname: 'iris' }],
  Followers: [{ nickname: 'hanbrang' }, { nickname: '미영아' }, { nickname: 'iris' }]
});

export const loginAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data
  };
};
export const logoutAciton = () => {
  return {
    type: LOG_OUT_REQUEST
  };
};

// action 을 dispatch 하면 reducer 가 반응한다.
const reducer = (state = initState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      //=== login
      case LOG_IN_REQUEST:
        draft.loginLoading = true;
        draft.loginDone = false;
        draft.loginError = null;
        draft.me = null;
        break;
      case LOG_IN_SUCCESS:
        draft.loginLoading = false;
        draft.loginDone = true;
        draft.me = addDummyUser(action.data);
        break;
      case LOG_IN_FAILURE:
        draft.loginLoading = false;
        draft.loginError = action.data;
        break;

      //=== logout
      case LOG_OUT_REQUEST:
        draft.logoutLoading = true;
        draft.logoutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logoutLoading = false;
        draft.loginDone = false;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logoutLoading = false;
        draft.logoutError = action.error;
        break;

      //=== signup
      case SIGN_UP_REQUEST:
        draft.signupLoading = true;
        draft.signupDone = false;
        draft.signupError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.signupLoading = false;
        draft.signupDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signupLoading = false;
        draft.signupError = action.error;
        break;

      //=== add, remove post
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;
      case REMOVE_POST_OF_ME:
        draft.me.Posts = draft.me.Posts.filter((post) => post.id != action.data);
        break;

      //=== follow, unfollow
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followError = null;
        break;
      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.me.Followings.push({ id: action.data });
        break;
      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followError = action.error;
        break;

      case UNFOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowError = null;
        break;
      case UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.me.Followings = draft.me.Followings.filter((v) => v.id != action.data);
        break;
      case UNFOLLOW_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;
