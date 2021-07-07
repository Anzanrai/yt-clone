import {
  CHANNEL_DETAIL_SUCCESS,
  CHANNEL_DETAIL_REQUEST,
  CHANNEL_DETAIL_FAIL,
  SET_SUBSCRIPTION_STATUS,
} from '../actionType';

export const channelDetailReducer = (
  state = { loading: false, error: null, channel: {} },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case CHANNEL_DETAIL_REQUEST:
      return { ...state, loading: true };
    case CHANNEL_DETAIL_SUCCESS:
      return { ...state, loading: false, channel: payload };
    case CHANNEL_DETAIL_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const subscriptionStatusReducer = (
  state = { subscribed: false, loading: false, error: null },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case SET_SUBSCRIPTION_STATUS:
      return { ...state, subscribed: payload, loading: false };
    default:
      return state;
  }
};
