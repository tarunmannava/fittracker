import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/user/userSlice';
import workoutsSlice from '../features/workouts/workoutsSlice';
import exercisesSlice from '../features/exercises/exercisesSlice';
import progressSlice from '../features/progress/progressSlice';
import timerSlice from '../features/timer/timerSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    workouts: workoutsSlice,
    exercises: exercisesSlice,
    progress: progressSlice,
    timer: timerSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Remove these TypeScript lines:
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;