import axios from 'axios';

const request = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/',
  params: {
    key: 'AIzaSyAemfzkpIfX2GdT1iUDH7AySelvAMIXPEQ',
  },
});

export default request;
