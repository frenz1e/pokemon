import logger from 'redux-logger';
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './reducers';

const appReducer = combineReducers(reducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  appReducer,
  {},
  composeEnhancers(
    applyMiddleware(thunkMiddleware, logger),
  )
);

export default store;
