import { createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import thunk from '../middlewares/thunk';
import reducers from '../reducers';


const persistedReducers = persistReducer({
    key: 'root',
    storage,
    whitelist: ['likedJobs'],
}, reducers)


const store = createStore(
    persistedReducers, 
    {}, 
    applyMiddleware(thunk)
);


const persistor = persistStore(store);

export { store, persistor };