import axios from 'axios';
import { API_URL } from '@config';
import { } from './types';
import { getToken, redirectToLogin } from '@store/auth/actions';

const xhrClient = axios.create({
  baseURL: API_URL,
  headers: {},
});

export const methods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DEL: 'DELETE',
};

export const request = ({
  loadingAction = () => ({}),
  errorMessage = 'Request failed. Please try again.',
  successMessage = null,
  onError = () => {},
  authenticate = true,
  headers = {},
  doGetToken = true,
  ...config
}) => async dispatch => {
  validateConfig(config);

  const token = doGetToken && dispatch(getToken());

  if (!token && authenticate && doGetToken) {
    dispatch(redirectToLogin());
    return;
  }

  config.headers = {
    ...headers,
    Authorization: `Bearer ${token}`,
  };

  dispatch(loadingAction(true));

  const response = await xhrClient.request(config).catch(err => err);

  dispatch(loadingAction(false));

  if (response instanceof Error) {
    dispatch(_handleError({
      error: response,
      message: errorMessage,
    }));

    onError(response);

    return;
  }

  if (successMessage) {
    // TODO: Toast success.
  }

  return response;
};

const _handleError = ({ error, message }) => dispatch => {
  // TODO: Toast message and log error.
};

function validateConfig(config) {
  if (!config) throw new Error('Config object not provided.');

  if (!config.url) throw new Error('No url provided in request config.');
};
