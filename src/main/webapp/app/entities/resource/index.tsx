import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Resource from './resource';
import ResourceDetail from './resource-detail';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ResourceDetail} />
      <ErrorBoundaryRoute path={match.url} component={Resource} />
    </Switch>
  </>
);

export default Routes;
