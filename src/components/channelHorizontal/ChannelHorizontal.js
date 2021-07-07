import React, { useEffect } from 'react';
import './_channelHorizontal.scss';
import { Row, Col } from 'react-bootstrap';
import numeral from 'numeral';
import { getChannelDetails } from '../../redux/actions/channel.action';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function ChannelHorizontal({ videoDetails }) {
  const { id, snippet } = videoDetails;

  const _channelId = id?.channelId || id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChannelDetails(_channelId));
  }, [_channelId, dispatch]);

  const {
    channel: { statistics },
  } = useSelector((state) => state.channelDetails);

  const history = useHistory();

  const handleVideoClick = () => {
    history.push(`/channel/${_channelId}`);
  };

  return (
    <Row
      className="videoHorizontal m-1 py-2 align-items-center"
      onClick={handleVideoClick}
    >
      <Col className="videoHorizontal__left" xs={6} md={4} lg={3}>
        <img
          alt=""
          src={snippet?.thumbnails?.medium?.url}
          style={{
            width: '50%',
            borderRadius: '50%',
            marginLeft: '25%',
          }}
        />
      </Col>
      <Col className="videoHorizontal__right" xs={6} md={8} lg={9}>
        <div className="videoHorizontal__details">
          <div>
            <h6>{snippet?.title}</h6>
            <p>{snippet?.description}</p>
            <p>
              {numeral(statistics?.subscriberCount)
                .format('0.0a')
                .toUpperCase()}{' '}
              Subscribers •{' '}
              {numeral(statistics?.videoCount).format('0.a').toUpperCase()}{' '}
              videos
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default ChannelHorizontal;
