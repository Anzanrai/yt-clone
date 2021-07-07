import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdNotifications, MdApps } from 'react-icons/md';
import './_header.scss';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Header({ handleToggleSidebar }) {
  const { photoURL } = useSelector((state) => {
    if (state.auth.user) {
      return state.auth.user;
    }
    return '';
  });

  const [searchText, setSearchText] = useState('');

  const history = useHistory();
  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/search/${searchText}`);
  };

  return (
    <div className="header">
      <FaBars
        className="header__menu"
        size={26}
        onClick={() => handleToggleSidebar()}
      />
      <img
        className="header__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
        alt=""
      />
      <form onSubmit={(e) => handleSearch(e)}>
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>

      <div className="header__icons">
        <MdApps size={28} />

        <MdNotifications size={28} />
        <img className="header__avatar" alt="Anjan Rai" src={photoURL} />
      </div>
    </div>
  );
}

export default Header;
