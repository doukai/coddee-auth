import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
// prettier-ignore
import user, {
  UserState
} from 'app/entities/user/user.reducer';
// prettier-ignore
import role, {
  RoleState
} from 'app/entities/role/role.reducer';
// prettier-ignore
import resource, {
  ResourceState
} from 'app/entities/resource/resource.reducer';
// prettier-ignore
import organization, {
  OrganizationState
} from 'app/entities/organization/organization.reducer';
// prettier-ignore
import tenant, {
  TenantState
} from 'app/entities/tenant/tenant.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly user: UserState;
  readonly role: RoleState;
  readonly resource: ResourceState;
  readonly organization: OrganizationState;
  readonly tenant: TenantState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  user,
  role,
  resource,
  organization,
  tenant,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
