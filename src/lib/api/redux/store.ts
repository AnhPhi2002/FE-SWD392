import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import userRedcuer from './userSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userRedcuer
});

// const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: rootReducer
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
