import axios from 'axios';

const axiosConfig = () => {
  const access_token = localStorage.getItem('access_token');
  if (access_token) {
    axios.defaults.headers.common['x-auth-token'] = access_token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};
export default axiosConfig;
