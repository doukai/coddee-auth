import { ITenant } from 'app/shared/model/tenant.model';

export interface IOrganization {
  id?: number;
  organizationCode?: string;
  organizationName?: string;
  parentOrganization?: IOrganization;
  tenant?: ITenant;
}

export const defaultValue: Readonly<IOrganization> = {};
