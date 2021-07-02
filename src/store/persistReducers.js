import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reduxPersist = reducers => {
    const persistedReducer = persistReducer(
        {
            key: 'gallery',
            storage,
            whitelist: ['auth', 'user'],
        },
        reducers,
    );
    return persistedReducer;
};

export default reduxPersist;
