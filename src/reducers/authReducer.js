import { SET_ADMIN, ADMIN, LOGOUT } from '../constants';

export const AUTH_INITIAL_STATE = {
  token: null
};

export const authReducer = (state = AUTH_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ADMIN: {
      localStorage.setItem(ADMIN, JSON.stringify(action.payload));
      return {
        ...state,
        token: action.payload.token
      };
    }

    case LOGOUT: {
      localStorage.setItem(ADMIN, JSON.stringify(AUTH_INITIAL_STATE));
      return AUTH_INITIAL_STATE;
    }

    default:
      return state;
  }
};
