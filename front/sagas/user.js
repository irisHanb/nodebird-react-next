import axios from 'axios';
import { takeLatest, put, delay, all, fork, call } from 'redux-saga/effects';
import {
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
  UNFOLLOW_FAILURE
} from '../reducers/user';
import { func } from 'prop-types';

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
    yield delay(1000);
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
  return axios.get('/user/logout');
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
    // const result = yield call(changeNickRequest, action.data);
    yield delay(1000);
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
function changeNickRequest(data) {
  return axios.post('/user/nickname', data);
}

//=== follow, unfollow
function* watchaFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}
function* follow(action) {
  try {
    // const result = yield call(followRequest, action.data);
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data
    });
  }
}
function followRequest() {
  return axios.post('/user/follow'); // ?
}

function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}
function* unfollow(action) {
  try {
    // const result = yield call(unfollowRequest, action.data);
    yield delay(1000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data
    });
  }
}
function unfollowRequest() {
  return axios.post('/user/unfollow'); //?
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignUp),
    fork(watchChangeNick),
    fork(watchaFollow),
    fork(watchUnFollow)
  ]);
}
