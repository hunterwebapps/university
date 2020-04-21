import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';

import authReducer from './auth/reducer';
import requestReducer from './request/reducer';
import snackbarReducer from './snackbar/reducer';

export const history = createBrowserHistory();

const reducers = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  request: requestReducer,
  snackbar: snackbarReducer,
});

const middleware = [
  thunk,
  routerMiddleware(history),
];

export default (initialState = {}) => {
  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middleware)),
  );
  return store;
};

