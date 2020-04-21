import { request, methods } from '@store/request';
import { parseJwt } from '@/utils/jwt';
import { push } from 'connected-react-router';

// Thunks

export const getToken = () => (dispatch, getState) => {
  const { token } = getState().auth;

  if (!token) return null;

  const tokenDetails = parseJwt(token);

  const expiration = tokenDetails.exp * 1000;

  if (expiration < Date.now) {
    return null;
  }

  if (expiration < Date.now + 15 /* Minutes */ * 1000) {
    dispatch(renewToken());
  }

  return token;
};

export const login = credentials => async dispatch => {
  const response = await dispatch(request({
    url: '/api/auth',
    method: methods.POST,
    data: credentials,
    authenticate: false,
    loadingAction: loading,
    errorMessage: 'Failed to login.',
    onError: console.error,
  }));

  if (!response) return;

  dispatch(setUser(response.data));

  dispatch(push('/'));
};

export const redirectToLogin = () => dispatch => {
  const relativePath = window.location.pathname + window.location.search;
  dispatch(setLoginRedirect(relativePath));
  dispatch(push('/login'));
};

export const renewToken = () => async dispatch => {
  const response = await dispatch(request({
    url: '/api/auth',
    method: methods.GET,
    authenticate: true,
    getToken: false,
    loadingAction: loading,
    errorMessage: 'Failed to renew token.',
    onError: console.error,
  }));

  if (!response) return;

  dispatch(setToken(response.data));
}

// Types

const
  LOADING = '@auth/loading',
  SET_USER = '@auth/setUser',
  SET_TOKEN = '@auth/setToken',
  SET_LOGIN_REDIRECT = '@auth/setLoginRedirect';

// Pure Actions

export const setUser = user => ({
  type: SET_USER,
  payload: user,
});

export const setToken = token => ({
  type: SET_TOKEN,
  payload: token,
});

export const setLoginRedirect = relativePath => ({
  type: SET_LOGIN_REDIRECT,
  payload: relativePath,
});

export const loading = isLoading => ({
  type: LOADING,
  payload: isLoading,
});

// Reducer

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

// Selectors

export const selectUser = state => state.auth.user;
