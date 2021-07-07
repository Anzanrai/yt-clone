import React, { useEffect, useState } from 'react';
import './_videoHorizontal.scss';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { AiFillEye } from 'react-icons/ai';
import numeral from 'numeral';
import request from '../../apis';
import { useHistory } from 'react-router-dom';

function VideoHorizontal({ videoDetails, searchScreen }) {
  const { id, snippet } = videoDetails;

  const _videoId = id?.videoId || id;
  const [viewCount, setViewCount] = useState(0);
  const [duration, setDuration] = useState(0);

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
      console.log(items);
      setViewCount(items[0]?.statistics?.viewCount);
      setDuration(items[0]?.contentDetails?.duration);
    };
    getVideoDetails();
  }, [_videoId]);

  const seconds = moment.duration(duration).asSeconds();
  const _duration =
    seconds > 3599
      ? moment.utc(seconds * 1000).format('hh:mm:ss')
      : moment.utc(seconds * 1000).format('mm:ss');

  const history = useHistory();

  const handleVideoClick = () => {
    history.push(`/watch/${_videoId}`);
  };

  return (
    <Row
      className="videoHorizontal m-1 py-2 align-items-center"
      onClick={handleVideoClick}
    >
      <Col
        className="videoHorizontal__left"
        xs={6}
        md={searchScreen ? 4 : 6}
        lg={searchScreen ? 3 : 6}
      >
        <img alt="" src={snippet?.thumbnails?.medium?.url} />
        <span className="videoHorizontal__duration">{_duration}</span>
      </Col>
      <Col
        className="videoHorizontal__right"
        xs={6}
        md={searchScreen ? 8 : 6}
        lg={searchScreen ? 9 : 6}
      >
        <div className="videoHorizontal__details">
          <div>
            <h6>{snippet?.title}</h6>
            <p>{snippet?.channelTitle}</p>
            <p>
              <AiFillEye /> {numeral(viewCount).format('0.a').toUpperCase()}{' '}
              Views • {moment(snippet?.publishedAt).fromNow()}
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default VideoHorizontal;
