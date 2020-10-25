import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import User from './user';
import UserDetail from './user-detail';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserDetail} />
      <ErrorBoundaryRoute path={match.url} component={User} />
    </Switch>
  </>
);

export default Routes;
