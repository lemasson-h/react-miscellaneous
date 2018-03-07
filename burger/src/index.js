import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import authReducer from './store/reducers/auth';
import burgerReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';
import { watchAuth } from './store/saga';

const composeEnhancers = ('development' === process.env.NODE_ENV ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
  burger: burgerReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(watchAuth);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
