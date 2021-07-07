import React from 'react';
import { useParams } from 'react-router-dom';

function ChannelScreen() {
  const { id } = useParams();
  return <div>Channel Screen {id}</div>;
}

export default ChannelScreen;
