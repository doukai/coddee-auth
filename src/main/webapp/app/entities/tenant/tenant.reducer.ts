import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITenant, defaultValue } from 'app/shared/model/tenant.model';

export const ACTION_TYPES = {
  FETCH_TENANT_LIST: 'tenant/FETCH_TENANT_LIST',
  FETCH_TENANT: 'tenant/FETCH_TENANT',
  RESET: 'tenant/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITenant>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type TenantState = Readonly<typeof initialState>;

// Reducer

export default (state: TenantState = initialState, action): TenantState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TENANT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TENANT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TENANT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TENANT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TENANT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_TENANT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/tenants';

// Actions

export const getEntities: ICrudGetAllAction<ITenant> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TENANT_LIST,
    payload: axios.get<ITenant>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ITenant> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TENANT,
    payload: axios.get<ITenant>(requestUrl),
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
