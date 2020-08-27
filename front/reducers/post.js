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
  addCommentError: null,

  retweetDone: false,
  retweetLoading: false,
  retweetError: null,

  likePostDone: false,
  likePostLoading: false,
  likePostError: null,
  unlikePostDone: false,
  unlikePostLoading: false,
  unlikePostError: null,

  uploadImagesDone: false,
  uploadImagesLoading: false,
  uploadImagesError: null
};

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

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';
export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';
export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data
});

export const addComment = (data) => {
  return {
    type: ADD_COMMENT_REQUEST,
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
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.hasMorePosts = draft.mainPosts.length === 10;
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
        draft.mainPosts.unshift(action.data);
        draft.imagePaths = [];
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
        draft.mainPosts = draft.mainPosts.filter((post) => post.id != action.data.PostId);
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
      case ADD_COMMENT_SUCCESS: {
        const { PostId, content } = action.data;
        const post = draft.mainPosts.find((post) => post.id == PostId);
        post?.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;

      //=== upload images
      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      case UPLOAD_IMAGES_SUCCESS:
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        draft.imagePaths = action.data;
        break;
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;

      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((v, idx) => idx != action.data);
        break;

      //=== retweet
      case RETWEET_REQUEST:
        draft.retweetDone = false;
        draft.retweetLoading = true;
        draft.retweetError = null;
        break;
      case RETWEET_SUCCESS:
        draft.retweetDone = true;
        draft.retweetLoading = false;
        draft.mainPosts.unshift(action.data);
        break;
      case RETWEET_FAILURE:
        draft.retweetLoading = false;
        draft.retweetError = action.error;
        break;

      //=== like
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        break;
      case LIKE_POST_SUCCESS: {
        draft.likePostLoading = false;
        draft.likePostDone = true;
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Likers.push({ id: action.data.UserId });
        break;
      }

      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;

      //=== unlike
      case UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        break;
      case UNLIKE_POST_SUCCESS: {
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
        break;
      }

      case UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;
