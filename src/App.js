import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import HomeScreen from './screens/homescreen/HomeScreen';
import LoginScreen from './screens/loginscreen/LoginScreen';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import './_app.scss';
import { useSelector } from 'react-redux';
import WatchScreen from './screens/watchScreen/WatchScreen';
import SearchScreen from './screens/searchscreen/SearchScreen';
import ChannelScreen from './screens/channelScreen/ChannelScreen';
import SubscriptionScreen from './screens/subscriptionscreen/SubscriptionScreen';

const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false);

  const handleToggleSidebar = () => {
    toggleSidebar((value) => !value);
  };

  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app__container">
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid className="app__main">
          {children}
        </Container>
      </div>
    </>
  );
};
export default function App() {
  const { accessToken, loading } = useSelector((state) => state.auth);
  const history = useHistory();
  useEffect(() => {
    if (!loading && !accessToken) {
      history.push('/auth');
    }
  }, [accessToken, loading, history]);
  return (
    <Switch>
      <Route path="/" exact>
        <Layout>
          <HomeScreen />
        </Layout>
      </Route>
      <Route path="/search/:query">
        <Layout>
          <SearchScreen />
        </Layout>
      </Route>
      <Route path="/watch/:id">
        <Layout>
          <WatchScreen />
        </Layout>
      </Route>
      <Route path="/auth">
        <LoginScreen />
      </Route>
      <Route path="/subscriptions">
        <Layout>
          <SubscriptionScreen />
        </Layout>
      </Route>
      <Route path="/library">
        <Layout>
          <h5>Library Page</h5>
        </Layout>
      </Route>
      <Route path="/history">
        <Layout>
          <h5>History Page</h5>
        </Layout>
      </Route>
      <Route path="/likedVideos">
        <Layout>
          <h5>Liked Videos Page</h5>
        </Layout>
      </Route>
      <Route path="/channel/:id">
        <Layout>
          <ChannelScreen />
        </Layout>
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}
