import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user.js';
import post from './post.js';

//=== action
// async actio creator
// action creator

//=== 처리기
// (이전상태, 액션) => 다음 상태
/*
const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log('HYDRATE', action);
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  user,
  post
});
*/

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        user,
        post
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
