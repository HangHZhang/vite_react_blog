import { configureStore } from '@reduxjs/toolkit';
import userReducer  from './reducers/userReducer';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();
const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: [thunkMiddleware, loggerMiddleware]
})
export default store;