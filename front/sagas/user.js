import axios from 'axios';
import { takeLatest, put, delay, all, fork, call, take } from 'redux-saga/effects';
import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAILURE
} from '../reducers/user';
import { func } from 'prop-types';

//=== my info
function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}
function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response?.data
    });
  }
}
function loadMyInfoAPI() {
  return axios.get('/user');
}

//=== user
function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}
function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    console.log('saga> loadUser> ', result);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data ? result.data : result
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_FAILURE,
      erro: err.response.data
    });
  }
}
function loadUserAPI(userId) {
  return axios.get(`/user/${userId}`);
}

//=== login
function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}
function* login(action) {
  try {
    const result = yield call(loginRequest, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data
    });
  }
}
function loginRequest(data) {
  return axios.post('/user/login', data);
}

//=== logout
function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}
function* logout() {
  try {
    yield call(logoutRequest);
    yield put({
      type: LOG_OUT_SUCCESS
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data
    });
  }
}
function logoutRequest() {
  return axios.post('/user/logout');
}

//=== sign up
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* signUp(action) {
  try {
    const result = yield call(signupRequest, action.data);

    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data
    });
  }
}
function signupRequest(data) {
  return axios.post('/user', data);
}

//=== nickname change
function* watchChangeNick() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNick);
}
function* changeNick(action) {
  try {
    const result = yield call(changeNickAPI, action.data);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: err.response.data
    });
  }
}
function changeNickAPI(data) {
  return axios.patch('/user/nickname', { nickname: data });
}

//=== follow, unfollow
function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}
function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data
    });
  }
}
function followAPI(userId) {
  return axios.patch(`/user/${userId}/follow`);
}

function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}
function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data
    });
  }
}
function unfollowAPI(userId) {
  return axios.delete(`/user/${userId}/follow`);
}

// remove follower
function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}
function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: err.response.data
    });
  }
}
function removeFollowerAPI(followerId) {
  return axios.delete(`/user/follower/${followerId}`);
}

// followings
function* watchFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}
function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI);
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: err.response.data
    });
  }
}
function loadFollowingsAPI() {
  return axios.get('/user/followings');
}

// followers
function* watchFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}
function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI);
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: err.response.data
    });
  }
}
function loadFollowersAPI() {
  return axios.get('/user/followers');
}

export default function* userSaga() {
  yield all([
    fork(watchLoadMyInfo),
    fork(watchLoadUser),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignUp),
    fork(watchChangeNick),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchFollowings),
    fork(watchFollowers),
    fork(watchRemoveFollower)
  ]);
}
