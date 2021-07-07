import {
  COMMENTS_LIST_REQUEST,
  COMMENTS_LIST_SUCCESS,
  COMMENTS_LIST_FAIL,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
} from '../actionType';
import request from '../../apis';

export const getCommentsList = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMENTS_LIST_REQUEST,
    });
    const { data } = await request.get('/commentThreads', {
      params: {
        part: 'snippet',
        videoId: id,
      },
    });
    dispatch({
      type: COMMENTS_LIST_SUCCESS,
      payload: data.items,
    });
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: COMMENTS_LIST_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const addComment = (id, text) => async (dispatch, getState) => {
  try {
    const dataObj = {
      snippet: {
        videoId: id,
        topLevelComment: {
          snippet: {
            textOriginal: text,
          },
        },
      },
    };
    await request.post('/commentThreads', dataObj, {
      params: {
        part: 'snippet',
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    dispatch({
      type: CREATE_COMMENT_SUCCESS,
    });
    setTimeout(() => {
      dispatch(getCommentsList(id));
    }, 3000);
  } catch (error) {
    dispatch({
      type: CREATE_COMMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};
