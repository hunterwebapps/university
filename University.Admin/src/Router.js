import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '@store/index';

import Dashboard from '@pages/Dashboard';
import Login from '@pages/Login';

const Router = () => (
  <ConnectedRouter history={history}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Dashboard} exact />
        <Route path="/login" component={Login} exact />
      </Switch>
      {/* TODO: Setup 404 */}
    </BrowserRouter>
  </ConnectedRouter>
);

export default Router;

