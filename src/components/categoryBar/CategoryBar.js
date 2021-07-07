import React, { useState } from 'react';
import './_category.scss';
import { useDispatch } from 'react-redux';
import {
  getVideosByCategory,
  getPopularVideos,
} from '../../redux/actions/videos.action';

const keywords = [
  'All',
  'React js',
  'Angular js',
  'React Native',
  'use of API',
  'Redux',
  'Music',
  'Algorithm Art ',
  'Guitar',
];

function CategoryBar() {
  const [activeElement, setActiveElement] = useState('All');
  const dispatch = useDispatch();

  // setActiveElement(useSelector((state) => state.homeVideos.activeCategory));
  const handleClick = (value) => {
    setActiveElement(value);
    if (value === 'All') {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(value));
    }
  };
  return (
    <div className="cagetoryBar">
      {keywords.map((keyword, index) => (
        <span
          key={index}
          onClick={() => handleClick(keyword)}
          className={activeElement === keyword ? 'active' : ''}
        >
          {keyword}
        </span>
      ))}
    </div>
  );
}

export default CategoryBar;
