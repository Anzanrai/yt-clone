const {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOAD_PROFILE,
  LOGIN_SUCCESS,
  LOG_OUT,
} = require('../actionType');

const initialState = {
  accessToken: sessionStorage.getItem('ytc-access-token') || null,
  user: JSON.parse(sessionStorage.getItem('ytc-user')) || null,
  loading: false,
  error: null,
};
export const authReducer = (prevState = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...prevState,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...prevState,
        accessToken: payload,
        loading: false,
      };
    case LOGIN_FAIL:
      return {
        ...prevState,
        loading: false,
        accessToken: null,
        error: payload,
      };
    case LOAD_PROFILE:
      return {
        ...prevState,
        user: payload,
      };
    case LOG_OUT:
      return {
        ...prevState,
        user: null,
        accessToken: null,
        loading: false,
      };
    default:
      return prevState;
  }
};
