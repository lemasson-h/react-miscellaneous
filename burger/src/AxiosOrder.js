import Axios from 'axios';

const axiosOrder = Axios.create({
  baseURL: 'https://burger-hl.firebaseio.com/',
});

export default axiosOrder;
