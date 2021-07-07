const {
  COMMENTS_LIST_REQUEST,
  COMMENTS_LIST_SUCCESS,
  COMMENTS_LIST_FAIL,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
} = require('../actionType');

export const commentsListReducer = (
  state = { loading: true, comments: {}, error: null },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case COMMENTS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case COMMENTS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: payload,
      };

    case COMMENTS_LIST_FAIL:
      return {
        ...state,
        comments: {},
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const createCommentReducer = (state = { error: null }, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
      };

    case CREATE_COMMENT_FAIL:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
