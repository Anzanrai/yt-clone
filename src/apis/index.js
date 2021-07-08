import axios from 'axios';

const request = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/',
  params: {
    key: 'AIzaSyA2mdEcJ64B1sU16Kvl_VnWMuFfxJYN1e4',
  },
});

export default request;
