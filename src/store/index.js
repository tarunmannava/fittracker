import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import workoutsReducer from '../features/workouts/workoutsSlice';
import exercisesReducer from '../features/exercises/exercisesSlice';
import progressReducer from '../features/progress/progressSlice';
import timerReducer from '../features/timer/timerSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    workouts: workoutsReducer,
    exercises: exercisesReducer,
    progress: progressReducer,
    timer: timerReducer,
  },
});

export default store;