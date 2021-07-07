import React, { useEffect } from 'react';
import './_searchScreen.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVideosBySearchTerm } from '../../redux/actions/videos.action';
import { Container } from 'react-bootstrap';
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal';
import ChannelHorizontal from '../../components/channelHorizontal/ChannelHorizontal';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function SearchScreen() {
  const { query } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideosBySearchTerm(query));
  }, [dispatch, query]);

  const { videos, loading } = useSelector((state) => state.searchVideos);
  return (
    <Container>
      {!loading ? (
        videos?.map((video, indx) =>
          video.id.kind === 'youtube#video' ? (
            <VideoHorizontal videoDetails={video} key={indx} searchScreen />
          ) : (
            <ChannelHorizontal videoDetails={video} />
          )
        )
      ) : (
        <SkeletonTheme>
          <Skeleton count={10} height="130px" width="100%" />
        </SkeletonTheme>
      )}
    </Container>
  );
}

export default SearchScreen;
