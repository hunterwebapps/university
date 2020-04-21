import { SET_USER, LOADING, SET_LOGIN_REDIRECT, SET_TOKEN } from './types';
import { request, methods } from '@request';
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
