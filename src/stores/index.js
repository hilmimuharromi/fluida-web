import {createStore, applyMiddleware, compose} from 'redux'
import {persistStore} from 'redux-persist'
import thunk from 'redux-thunk'
import reducers from './reducer'


const middleware = [
    thunk,
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(...middleware)
));

// export const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)))
export const persistor = persistStore(store)
