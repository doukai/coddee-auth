import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import User from './user';
import Role from './role';
import Resource from './resource';
import Organization from './organization';
import Tenant from './tenant';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}user`} component={User} />
      <ErrorBoundaryRoute path={`${match.url}role`} component={Role} />
      <ErrorBoundaryRoute path={`${match.url}resource`} component={Resource} />
      <ErrorBoundaryRoute path={`${match.url}organization`} component={Organization} />
      <ErrorBoundaryRoute path={`${match.url}tenant`} component={Tenant} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
