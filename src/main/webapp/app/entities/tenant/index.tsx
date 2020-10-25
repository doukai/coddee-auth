import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Tenant from './tenant';
import TenantDetail from './tenant-detail';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TenantDetail} />
      <ErrorBoundaryRoute path={match.url} component={Tenant} />
    </Switch>
  </>
);

export default Routes;
