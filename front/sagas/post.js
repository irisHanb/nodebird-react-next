import { all, fork, takeLatest, delay, put, call, take } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  RETWEET_SUCCESS,
  RETWEET_FAILURE,
  RETWEET_REQUEST
} from '../reducers/post';
import { REMOVE_POST_OF_ME, ADD_POST_TO_ME } from '../reducers/user';

//=== load posts
function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}
function* loadPosts(action) {
  try {
    const result = yield call(loadPostAPI, action.lastId);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response?.data
    });
  }
}
function loadPostAPI(lastId = 0) {
  return axios.get(`/posts?lastId=${lastId}`);
}

//== addPost
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id
    });
  } catch (err) {
    console.error(err);
    if (err)
      yield put({
        type: ADD_POST_FAILURE,
        error: err.response.data
      });
  }
}
function addPostAPI(data) {
  return axios.post('/post', data);
}

//=== remove post
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data
    });
  }
}
function removePostAPI(data) {
  return axios.delete(`/post/${data}`);
}

//=== comment
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data
    });
  }
}
function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

//=== upload images
function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}
function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data
    });
  }
}
function uploadImagesAPI(formData) {
  return axios.post('/post/images', formData);
}

//=== retweet
function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweetRequest);
}
function* retweetRequest(action) {
  try {
    const result = yield call(retweetAPI, action.data);
    yield put({
      type: RETWEET_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: RETWEET_FAILURE,
      error: err.response.data
    });
  }
}
function retweetAPI(postId) {
  return axios.post(`/post/${postId}/retweet`);
}

//=== like
function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}
function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data
    });
  }
}
function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`);
}
//=== unlike
function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}
function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: action.error
    });
  }
}
function unlikePostAPI(data) {
  return axios.delete(`/post/${data}/like`);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLoadPosts),
    fork(watchUploadImages),
    fork(watchRetweet),
    fork(watchLikePost),
    fork(watchUnlikePost)
  ]);
}
