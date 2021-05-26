import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index' // this is index.js

const { initialState } = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    // composeWithDevTools(applyMiddleware(...middleware))
    compose(applyMiddleware(...middleware))
);

export default store;