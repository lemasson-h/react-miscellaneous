import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Axios from 'axios';
import registerServiceWorker from './registerServiceWorker';

// Axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

Axios.defaults.headers.common['Authorization'] = 'Generalized token';

const myRequestInterceptor = Axios.interceptors.request.use(
  (requestConfig) => {
    console.log(requestConfig);

    return requestConfig;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

const myResponseInterceptor = Axios.interceptors.response.use(
  (response) => {
    console.log(response);

    return response;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

Axios.interceptors.request.eject(myRequestInterceptor);
Axios.interceptors.response.eject(myResponseInterceptor);

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
