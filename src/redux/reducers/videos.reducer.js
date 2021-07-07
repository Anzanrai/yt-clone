import {
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
  HOME_VIDEOS_FAIL,
  SELECTED_VIDEO_REQUEST,
  SELECTED_VIDEO_SUCCESS,
  SELECTED_VIDEO_FAIL,
  RELATED_VIDEO_REQUEST,
  RELATED_VIDEO_SUCCESS,
  RELATED_VIDEO_FAIL,
  SEARCH_VIDEO_REQUEST,
  SEARCH_VIDEO_SUCCESS,
  SEARCH_VIDEO_FAIL,
} from '../actionType';
const initialState = {
  loading: false,
  videos: [],
  nextPageToken: null,
  error: null,
  activeCategory: 'All',
};

export const homeVideoReducer = (prevState = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case HOME_VIDEOS_REQUEST:
      return {
        ...prevState,
        loading: true,
      };
    case HOME_VIDEOS_SUCCESS:
      return {
        ...prevState,
        videos:
          prevState.activeCategory === payload.activeCategory
            ? [...prevState.videos, ...payload.videos]
            : payload.videos,
        nextPageToken: payload.nextPageToken,
        loading: false,
        activeCategory: payload.activeCategory,
      };
    case HOME_VIDEOS_FAIL:
      return {
        ...prevState,
        error: payload,
        loading: false,
      };
    default:
      return prevState;
  }
};

export const selectedVideReducer = (
  state = { loading: true, video: null, error: null },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case SELECTED_VIDEO_REQUEST:
      return { ...state, loading: true };
    case SELECTED_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        video: payload,
      };
    case SELECTED_VIDEO_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const relatedVideoReducer = (
  state = { videos: [], loading: false, error: null },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case RELATED_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RELATED_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: payload,
      };
    case RELATED_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        videos: {},
      };
    default:
      return state;
  }
};

export const searchVideoReducer = (
  state = {
    loading: false,
    videos: [],
    error: null,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_VIDEO_REQUEST:
      return { ...state, loading: true };
    case SEARCH_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: payload,
      };
    case SEARCH_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
