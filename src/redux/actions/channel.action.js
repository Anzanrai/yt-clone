import {
  CHANNEL_DETAIL_REQUEST,
  CHANNEL_DETAIL_SUCCESS,
  CHANNEL_DETAIL_FAIL,
  SET_SUBSCRIPTION_STATUS,
} from '../actionType';
import request from '../../apis';

export const getChannelDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CHANNEL_DETAIL_REQUEST,
    });

    const { data } = await request.get('/channels', {
      params: {
        part: 'snippet,statistics,contentDetails',
        id,
      },
    });
    dispatch({
      type: CHANNEL_DETAIL_SUCCESS,
      payload: data.items[0],
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: CHANNEL_DETAIL_FAIL,
      payload: error.message,
    });
  }
};

export const checkSubscriptionStatus = (id) => async (dispatch, getState) => {
  try {
    const { data } = await request.get('/subscriptions', {
      params: {
        part: 'snippet',
        forChannelId: id,
        mine: true,
      },
      headers: {
        Authorizations: `Bearer ${getState().auth.accessToken}`,
        // 'Access-Control-Allow-Origin': '*',
      },
    });
    dispatch({
      type: SET_SUBSCRIPTION_STATUS,
    });
  } catch (error) {
    console.error(error.message);
  }
};
