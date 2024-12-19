import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import storiesReducer from './features/stories/storiesSlice';
import usersReducer from './features/users/usersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stories: storiesReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/login/fulfilled'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
