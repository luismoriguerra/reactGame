import { createStore, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();

function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      loggerMiddleware
    )
  )
}

export default configureStore;
