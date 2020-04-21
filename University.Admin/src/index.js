import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';

import ReduxProvider from '@/providers/ReduxProvider';
import ThemeProvider from '@/providers/ThemeProvider';
import Router from '@/Router';

ReactDOM.render(
  <ThemeProvider>
    <ReduxProvider>
      <Router />
    </ReduxProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
