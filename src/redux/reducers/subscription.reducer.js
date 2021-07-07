import {
  SUBSCRIPTION_LIST_REQUEST,
  SUBSCRIPTION_LIST_SUCCESS,
  SUBSCRIPTION_LIST_FAIL,
} from '../actionType';

export const subscriptionReducer = (
  state = { loading: false, error: null, subscriptions: [] },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case SUBSCRIPTION_LIST_REQUEST:
      return { ...state, loading: true };

    case SUBSCRIPTION_LIST_SUCCESS:
      return { ...state, loading: false, subscriptions: payload };
    case SUBSCRIPTION_LIST_FAIL:
      return { ...state, loading: false, subscriptions: [], error: payload };
    default:
      return state;
  }
};
