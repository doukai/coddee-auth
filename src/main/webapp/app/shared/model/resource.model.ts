import { ITenant } from 'app/shared/model/tenant.model';
import { IRole } from 'app/shared/model/role.model';
import { MethodType } from 'app/shared/model/enumerations/method-type.model';

export interface IResource {
  id?: number;
  url?: string;
  method?: MethodType;
  resourceName?: string;
  tenant?: ITenant;
  roles?: IRole[];
}

export const defaultValue: Readonly<IResource> = {};
