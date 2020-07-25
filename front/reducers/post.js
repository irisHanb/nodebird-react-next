import shortId from 'shortid';
import faker from 'faker';
import produce from 'immer';

const initState = {
  mainPosts: [],
  imagePaths: [],

  loadPostDone: false,
  loadPostLoading: false,
  loadPostError: null,
  hasMorePosts: true,

  addPostDone: false,
  addPostLoading: false,
  addPostError: null,
  removePostDone: false,
  removePostLoading: false,
  removePostError: false,

  addCommentDone: false,
  addCommentLoading: false,
  addCommentError: null
};

export const generateDummyPost = (num) =>
  Array(num)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName()
      },
      content: faker.lorem.paragraph(),
      Images: getDummyPostImgs(Math.floor(Math.random() * 3 + 1)),
      Comments: [
        {
          User: {
            nickname: faker.name.firstName()
          },
          content: faker.lorem.sentence()
        }
      ]
    }));

const getDummyPostImgs = (num) =>
  Array(num)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      src: faker.image.image()
    }));

export const LOAD_POSTS_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POST_FAILURE';
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

// action: action 은 객체이다.
export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data
});

export const addComment = (data) => {
  return {
    type: ADD_COMMNET_REQUEST,
    data
  };
};
const addDummyPost = (data) => ({
  id: data.id,
  User: {
    id: 1,
    nickname: 'hanb'
  },
  content: data.content,
  Images: [
    {
      src:
        'https://images.unsplash.com/photo-1562679299-6eb8857da797?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'
    },
    {
      src:
        'https://images.unsplash.com/photo-1483043012503-8a8849b4c949?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'
    }
  ],
  Comments: []
});
const addDummyComment = (data) => ({
  User: {
    id: 1,
    nickname: 'hanb'
  },
  id: shortId.generate(),
  content: data
});

const reducer = (state = initState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      //=== load post
      case LOAD_POSTS_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.hasMorePosts = draft.mainPosts.length < 50;
        break;
      case LOAD_POSTS_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;

      //=== add post
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(addDummyPost(action.data));
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;

      //=== remove post
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((post) => post.id != action.data);

        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;

      //=== comment
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        const { postId, content } = action.data;
        const post = draft.mainPosts.find((post) => post.id == postId);
        post?.Comments.unshift(addDummyComment(content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;
