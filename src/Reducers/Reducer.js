/*
 * Author: @ShinHynJong (github.com/ShinHyunJong)
 */
import {
  SUCCEED_TO_SIGNUP,
  SUCCEED_TO_SIGNIN,
  FAILED_TO_SIGNIN,
  SUCCEED_TO_SIGNOUT,
  SUCCEED_TO_UPDATE_PROFILE_IMAGE,
  SUCCEED_TO_POST_CHANGE_PROFILE
} from "../ActionCreators/AuthAction";

import {
  SUCCEED_TO_GET_USER,
  SUCCEED_TO_GET_USER_BY_USER_ID,
  TOKEN_EXPIRED
} from "../ActionCreators/UserAction";
import { SUCCEED_TO_GET_FEED } from "../ActionCreators/FeedAction";

import { combineReducers } from "redux";

const initialState = {
  data: "",
  token: localStorage.getItem("token"),
  isLogin: !!localStorage.getItem("token"),
  user: {
    id: 0
  },
  userById: [],
  feeds: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN_EXPIRED:
      return Object.assign({}, state, {
        token: null,
        isLogin: false
      });
    case SUCCEED_TO_SIGNUP:
      localStorage.setItem("token", action.payload);
      return Object.assign({}, state, {
        token: action.payload,
        isLogin: true
      });
    case SUCCEED_TO_SIGNIN:
      localStorage.setItem("token", action.payload);
      return Object.assign({}, state, {
        token: action.payload,
        isLogin: true
      });
    case FAILED_TO_SIGNIN:
      return Object.assign({}, state, {
        token: "",
        isLogin: false
      });
    case SUCCEED_TO_SIGNOUT:
      localStorage.removeItem("token");
      return Object.assign({}, state, {
        isLogin: false,
        token: null,
        user: []
      });
    case SUCCEED_TO_GET_USER:
      return Object.assign({}, state, {
        user: action.payload
      });
    case SUCCEED_TO_GET_FEED:
      return Object.assign({}, state, {
        feeds: action.payload
      });
    case SUCCEED_TO_GET_USER_BY_USER_ID:
      return Object.assign({}, state, {
        userById: action.payload
      });
    case SUCCEED_TO_POST_CHANGE_PROFILE:
      return Object.assign({}, state, {
        user: {
          ...state.user,
          nickname: action.payload.nickname,
          area: action.payload.area
        }
      });
    case SUCCEED_TO_UPDATE_PROFILE_IMAGE:
      return Object.assign({}, state, {
        user: { ...state.user, profile_img: action.payload.message }
      });

    default:
      return state;
  }
};

const Reducer = combineReducers({ reducer });
export default Reducer;
