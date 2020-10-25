import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRole, defaultValue } from 'app/shared/model/role.model';

export const ACTION_TYPES = {
  FETCH_ROLE_LIST: 'role/FETCH_ROLE_LIST',
  FETCH_ROLE: 'role/FETCH_ROLE',
  RESET: 'role/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRole>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type RoleState = Readonly<typeof initialState>;

// Reducer

export default (state: RoleState = initialState, action): RoleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ROLE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ROLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ROLE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ROLE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ROLE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_ROLE):
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

const apiUrl = 'api/roles';

// Actions

export const getEntities: ICrudGetAllAction<IRole> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ROLE_LIST,
    payload: axios.get<IRole>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IRole> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ROLE,
    payload: axios.get<IRole>(requestUrl),
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
