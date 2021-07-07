import React, { useEffect } from 'react';
import './_videoMetaData.scss';
import numeral from 'numeral';
import moment from 'moment';
import ShowMoreText from 'react-show-more-text';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelDetails } from '../../redux/actions/channel.action';

function VideoMetaData({ video, videoId }) {
  const { snippet, statistics } = video;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChannelDetails(snippet.channelId));
    // dispatch(checkSubscriptionStatus(snippet.channelId));
  }, [dispatch, snippet.channelId]);

  const {
    snippet: channelSnippet,
    statistics: channelStatistics,
  } = useSelector((state) => state.channelDetails.channel);

  return (
    <div className="videoMetaData py-2">
      <div className="videoMetaData__top">
        <h5>{snippet.title}</h5>
        <div className="d-flex justify-content-between align-items-center py-1">
          <span>
            {numeral(statistics.viewCount).format('0.a').toUpperCase()} Views ・{' '}
            {moment(snippet.publishedAt).fromNow()}
          </span>
          <div>
            <span style={{ marginRight: '10px' }}>
              <MdThumbUp size={26} />
              {numeral(statistics.likeCount).format('0.0a').toUpperCase()}
            </span>
            <span style={{ marginRight: '10px' }}>
              <MdThumbDown size={26} />
              {numeral(statistics.dislikeCount).format('0.0a').toUpperCase()}
            </span>
          </div>
        </div>
      </div>
      <div className="videoMetaData__channel d-flex justify-content-between align-items-center my-2 py-3">
        <div className="d-flex">
          <img
            src={channelSnippet?.thumbnails?.medium?.url}
            alt=""
            className="rounded-circle mr-3"
          />
          <div className="d-flex flex-column">
            <span className="videoMetaData__channel__title">
              {snippet.channelTitle}
            </span>
            <span className="videoMetaData__channel__subscriber">
              {numeral(channelStatistics?.subscriberCount)
                .format('0.0a')
                .toUpperCase()}{' '}
              Subscribers
            </span>
          </div>
        </div>
        <button className="btn border-0 p-2 m-2">Subscribe</button>
      </div>
      <div className="videoMetaData__description">
        <ShowMoreText
          lines={3}
          more="SHOW MORE"
          less="SHOW LESS"
          anchorClass="shoMoreText"
          expanded={false}
        >
          {snippet.description}
        </ShowMoreText>
      </div>
    </div>
  );
}

export default VideoMetaData;
