export interface ITenant {
  id?: number;
  domain?: string;
  tenantName?: string;
}

export const defaultValue: Readonly<ITenant> = {};
