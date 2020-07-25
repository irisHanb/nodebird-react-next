import { all, fork, takeLatest, delay, put } from 'redux-saga/effects';
import {
  generateDummyPost,
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
  ADD_COMMENT_FAILURE
} from '../reducers/post';
import shortId from 'shortid';
import { REMOVE_POST_OF_ME, ADD_POST_TO_ME } from '../reducers/user';

//=== load posts
function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}
function* loadPosts(action) {
  try {
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: generateDummyPost(5)
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data
    });
  }
}
function loadPostRequest() {
  // return axios.get('/api/posts');
}

//== addPost
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* addPost(action) {
  try {
    // const result = yield call(addPostRequest, action.data);
    yield delay(1000);
    const id = shortId.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data
      }
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: id
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data
    });
  }
}
function addPostRequest(data) {
  return axios.post('/api/post', data);
}

//=== remove post
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* removePost(action) {
  try {
    // const result = yield call(removePostRequest, action.data);
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data
    });
  }
}
function removePostRequest(data) {
  return axios.post('/api/remove');
}

//=== comment
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* addComment(action) {
  try {
    //const result = yield call(addCommentRequest, action.data);
    yield delay(1000);

    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data
    });
  }
}
function addCommentRequest(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLoadPosts)
  ]);
}
