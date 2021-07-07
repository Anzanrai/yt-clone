import React from 'react';
import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryBooks,
  MdHome,
} from 'react-icons/md';

import './_sidebar.scss';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/auth.action';
import { useHistory } from 'react-router-dom';

function Sidebar({ sidebar, handleToggleSidebar }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const history = useHistory();

  const handleClick = (e, redirectPage) => {
    e.preventDefault();
    history.push(`/${redirectPage}`);
  };

  return (
    <div className={sidebar ? 'sidebar open' : 'sidebar'}>
      <ul>
        <li onClick={(e) => handleClick(e, '')}>
          <MdHome size={23} className="sidebar__icon" />
          <span>Home</span>
        </li>
        <li onClick={(e) => handleClick(e, 'subscriptions')}>
          <MdSubscriptions size={23} className="sidebar__icon" />
          <span>Subscriptions</span>
        </li>
        <hr />
        <li onClick={(e) => handleClick(e, 'library')}>
          <MdLibraryBooks size={23} className="sidebar__icon" />
          <span>Library</span>
        </li>
        <li onClick={(e) => handleClick(e, 'history')}>
          <MdHistory size={23} className="sidebar__icon" />
          <span>History</span>
        </li>
        <li onClick={(e) => handleClick(e, 'likedVideos')}>
          <MdThumbUp size={23} className="sidebar__icon" />
          <span>Liked videos</span>
        </li>
        <hr />
        <li onClick={() => handleLogout()}>
          <MdExitToApp size={23} className="sidebar__icon" />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
