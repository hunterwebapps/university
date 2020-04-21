import { SET_USER, SET_LOGIN_REDIRECT, SET_TOKEN, LOADING } from './types';

const initialState = {
  user: null,
  token: null,
  redirectUrl: '/',
  loading: false,
};

export default (state = initialState, { type, payload  }) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        redirectUrl: '/',
      };
    case SET_TOKEN:
      return {
        ...state,
        token: payload,
      };
    case SET_LOGIN_REDIRECT:
      return {
        ...state,
        user: null,
        token: null,
        redirectUrl: payload,
      }
    case LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};

export const selectUser = state => state.auth.user;
