import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IResource, defaultValue } from 'app/shared/model/resource.model';

export const ACTION_TYPES = {
  FETCH_RESOURCE_LIST: 'resource/FETCH_RESOURCE_LIST',
  FETCH_RESOURCE: 'resource/FETCH_RESOURCE',
  RESET: 'resource/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IResource>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type ResourceState = Readonly<typeof initialState>;

// Reducer

export default (state: ResourceState = initialState, action): ResourceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RESOURCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RESOURCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_RESOURCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RESOURCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESOURCE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESOURCE):
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

const apiUrl = 'api/resources';

// Actions

export const getEntities: ICrudGetAllAction<IResource> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_RESOURCE_LIST,
    payload: axios.get<IResource>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IResource> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RESOURCE,
    payload: axios.get<IResource>(requestUrl),
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
