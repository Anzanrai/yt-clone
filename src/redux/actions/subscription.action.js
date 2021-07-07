import {
  SUBSCRIPTION_LIST_REQUEST,
  SUBSCRIPTION_LIST_SUCCESS,
  SUBSCRIPTION_LIST_FAIL,
} from '../actionType';
import request from '../../apis';

export const getSubscriptions = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBSCRIPTION_LIST_REQUEST,
    });

    const { data } = await request.get('/subscriptions', {
      params: {
        part: 'snippet,contentDetails',
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    dispatch({
      type: SUBSCRIPTION_LIST_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    dispatch({
      type: SUBSCRIPTION_LIST_FAIL,
      payload: error.message,
    });
    console.log(error.message);
  }
};
