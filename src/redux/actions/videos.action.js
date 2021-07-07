import {
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
  SELECTED_VIDEO_SUCCESS,
  SELECTED_VIDEO_REQUEST,
  SELECTED_VIDEO_FAIL,
  RELATED_VIDEO_REQUEST,
  RELATED_VIDEO_FAIL,
  RELATED_VIDEO_SUCCESS,
  SEARCH_VIDEO_REQUEST,
  SEARCH_VIDEO_SUCCESS,
  SEARCH_VIDEO_FAIL,
} from '../actionType';
import request from '../../apis';

export const getPopularVideos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    });
    const { data } = await request.get('videos', {
      params: {
        part: 'snippet, contentDetails, statistics',
        chart: 'mostPopular',
        regionCode: 'AU',
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
      },
    });
    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        activeCategory: 'All',
      },
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const getVideosByCategory = (keyword) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    });
    const { data } = await request.get('search', {
      params: {
        part: 'snippet',
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
        q: keyword,
        type: 'video',
      },
    });
    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        activeCategory: keyword,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const getVideoById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SELECTED_VIDEO_REQUEST,
    });
    const { data } = await request.get('/videos', {
      params: {
        part: 'snippet,statistics',
        id: id,
      },
    });
    dispatch({
      type: SELECTED_VIDEO_SUCCESS,
      payload: data.items[0],
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: SELECTED_VIDEO_FAIL,
      payload: error.message,
    });
  }
};

export const getRelatedVideos = (id) => async (dispatch) => {
  try {
    dispatch({
      type: RELATED_VIDEO_REQUEST,
    });
    const { data } = await request.get('/search', {
      params: {
        part: 'snippet',
        relatedToVideoId: id,
        maxResults: 15,
        type: 'video',
      },
    });
    dispatch({
      type: RELATED_VIDEO_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    dispatch({
      type: RELATED_VIDEO_FAIL,
      payload: error,
    });
  }
};

export const getVideosBySearchTerm = (keyword) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCH_VIDEO_REQUEST,
    });
    const { data } = await request.get('search', {
      params: {
        part: 'snippet',
        maxResults: 20,
        q: keyword,
        type: 'video,channel',
      },
    });
    dispatch({
      type: SEARCH_VIDEO_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: SEARCH_VIDEO_FAIL,
      payload: error.message,
    });
  }
};
