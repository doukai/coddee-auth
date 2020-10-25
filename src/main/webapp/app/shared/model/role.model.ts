import { IUser } from 'app/shared/model/user.model';
import { IResource } from 'app/shared/model/resource.model';
import { ITenant } from 'app/shared/model/tenant.model';

export interface IRole {
  id?: number;
  roleCode?: string;
  roleName?: string;
  users?: IUser[];
  resources?: IResource[];
  tenant?: ITenant;
  parentRoles?: IRole[];
}

export const defaultValue: Readonly<IRole> = {};
