// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage'; // localStorage
import rootReducer from './reducers';

// Konfigurasi persist dengan key "data"
const persistConfig = {
  key: 'data', // key di localStorage
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Buat store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

// Persistor untuk digunakan di PersistGate
export const persistor = persistStore(store);

// Ekspor store sebagai default juga
export default store;