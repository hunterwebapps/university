import React from 'react';
import { Provider } from 'react-redux';
import makeStore from '@store';

const store = makeStore({});

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
