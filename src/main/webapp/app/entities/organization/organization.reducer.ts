import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IOrganization, defaultValue } from 'app/shared/model/organization.model';

export const ACTION_TYPES = {
  FETCH_ORGANIZATION_LIST: 'organization/FETCH_ORGANIZATION_LIST',
  FETCH_ORGANIZATION: 'organization/FETCH_ORGANIZATION',
  RESET: 'organization/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IOrganization>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type OrganizationState = Readonly<typeof initialState>;

// Reducer

export default (state: OrganizationState = initialState, action): OrganizationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ORGANIZATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ORGANIZATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ORGANIZATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ORGANIZATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ORGANIZATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_ORGANIZATION):
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

const apiUrl = 'api/organizations';

// Actions

export const getEntities: ICrudGetAllAction<IOrganization> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ORGANIZATION_LIST,
    payload: axios.get<IOrganization>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IOrganization> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ORGANIZATION,
    payload: axios.get<IOrganization>(requestUrl),
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
