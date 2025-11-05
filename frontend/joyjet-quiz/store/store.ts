'use client';

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import quizReducer from './quizSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // uses localStorage

// -----------------------------
// Persist configuration
// -----------------------------
const persistConfig = {
  key: 'root',
  storage,
};

// Combine reducers (even if you have only one for now)
const rootReducer = combineReducers({
  quiz: quizReducer,
});

// Apply persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// -----------------------------
// Store
// -----------------------------
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});

// Persistor for PersistGate
export const persistor = persistStore(store);

// -----------------------------
// Types
// -----------------------------
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
