import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Organization from './organization';
import OrganizationDetail from './organization-detail';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={OrganizationDetail} />
      <ErrorBoundaryRoute path={match.url} component={Organization} />
    </Switch>
  </>
);

export default Routes;
