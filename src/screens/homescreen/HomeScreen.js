import React, { useEffect } from 'react';
import { Container, Col } from 'react-bootstrap';
import CategoryBar from '../../components/categoryBar/CategoryBar';
import Video from '../../components/video/Video';
import {
  getPopularVideos,
  getVideosByCategory,
} from '../../redux/actions/videos.action';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonVideo from '../../components/skeletons/SkeletonVideo';

function HomeScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  const { videos, activeCategory, loading } = useSelector(
    (state) => state.homeVideos
  );

  const fetchData = () => {
    if (activeCategory === 'All') {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(activeCategory));
    }
  };
  if (!videos.length) {
    return (
      <Container fluid>
        <h3>Retrieving videos</h3>
      </Container>
    );
  }
  return (
    <Container>
      <CategoryBar />
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchData}
        hasMore={true}
        Loader={
          <div className="spinner-border text-danger d-block mx-auto"></div>
        }
        className="row"
      >
        {!loading
          ? videos.map((video) => (
              <Col key={video.id} lg={3} md={4}>
                <Video video={video} />
              </Col>
            ))
          : [...Array(20)].map((value, index) => (
              <Col key={index} lg={3} md={4}>
                <SkeletonVideo />
              </Col>
            ))}
      </InfiniteScroll>
    </Container>
  );
}

export default HomeScreen;
