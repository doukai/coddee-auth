import { IRole } from 'app/shared/model/role.model';
import { IOrganization } from 'app/shared/model/organization.model';
import { ITenant } from 'app/shared/model/tenant.model';

export interface IUser {
  id?: number;
  login?: string;
  password?: string;
  userName?: string;
  activated?: boolean;
  email?: string;
  roles?: IRole[];
  organization?: IOrganization;
  tenant?: ITenant;
}

export const defaultValue: Readonly<IUser> = {
  activated: false,
};
