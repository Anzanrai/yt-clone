import React, { useEffect, useState } from 'react';
import { AiFillEye } from 'react-icons/ai';
import './_video.scss';
import request from '../../apis';
import moment from 'moment';
import numeral from 'numeral';
import { useHistory } from 'react-router-dom';

function Video({ video }) {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const seconds = moment.duration(duration).asSeconds();
  const _duration =
    seconds > 3599
      ? moment.utc(seconds * 1000).format('hh:mm:ss')
      : moment.utc(seconds * 1000).format('mm:ss');
  const _videoId = id?.videoId || id;

  useEffect(() => {
    const getVideoDetails = async () => {
      const {
        data: { items },
      } = await request.get('/videos', {
        params: {
          part: 'contentDetails, statistics',
          id: _videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    getVideoDetails();
  }, [_videoId]);

  useEffect(() => {
    const getChannelIcon = async () => {
      const {
        data: { items },
      } = await request.get('/channels', {
        params: {
          part: 'snippet',
          id: channelId,
        },
      });
      items
        ? setChannelIcon(items[0].snippet.thumbnails.medium.url)
        : setChannelIcon(null);
    };
    getChannelIcon();
  }, [channelId]);

  const history = useHistory();

  const handleVideoClick = () => {
    history.push(`/watch/${_videoId}`);
  };

  return (
    <div className="video" onClick={handleVideoClick}>
      <div className="video__image">
        <img alt="" src={medium.url} />
        <span>{_duration}</span>
      </div>
      <div className="video__details">
        <img src={channelIcon ? channelIcon : null} alt="" />
        <div>
          <h4>{title}</h4>
          <p>{channelTitle}</p>
          <p>
            <AiFillEye /> {numeral(views).format('0.a').toUpperCase()} Views ・{' '}
            {moment(publishedAt).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Video;
