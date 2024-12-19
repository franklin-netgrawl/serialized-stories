import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import storiesReducer from './features/stories/storiesSlice';
import usersReducer from './features/users/usersSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    stories: storiesReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/login/fulfilled'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
