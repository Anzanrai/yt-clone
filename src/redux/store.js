import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from './reducers/auth.reducer';
import {
  homeVideoReducer,
  selectedVideReducer,
  relatedVideoReducer,
  searchVideoReducer,
} from './reducers/videos.reducer';
import {
  channelDetailReducer,
  subscriptionStatusReducer,
} from './reducers/channel.reducer';
import {
  commentsListReducer,
  createCommentReducer,
} from './reducers/comments.reducer';
import { subscriptionReducer } from './reducers/subscription.reducer';

const reducer = combineReducers({
  auth: authReducer,
  homeVideos: homeVideoReducer,
  selectedVideo: selectedVideReducer,
  channelDetails: channelDetailReducer,
  channelSubscription: subscriptionStatusReducer,
  videoComments: commentsListReducer,
  addComment: createCommentReducer,
  relatedVideos: relatedVideoReducer,
  searchVideos: searchVideoReducer,
  subscriptionsList: subscriptionReducer,
});

const store = createStore(
  reducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
