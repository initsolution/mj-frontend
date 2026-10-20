import axios from 'axios';

export default axios.create({
  // baseURL: 'http://192.168.1.101:3005/',
  baseURL: 'http://202.157.184.138:3010',

  headers: {
    'Content-Type': 'application/json',
  },
});
