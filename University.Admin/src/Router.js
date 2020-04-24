import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '@store/index';

import Dashboard from '@pages/Dashboard';
import Login from '@pages/Login';

const Router = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route path="/" component={Dashboard} exact />
      <Route path="/login" component={Login} />
    </Switch>
    {/* TODO: Setup 404 */}
  </ConnectedRouter>
);

export default Router;

