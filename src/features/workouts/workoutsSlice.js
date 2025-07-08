import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeWorkout: null,
  history: [],
  templates: [],
  currentExercise: null,
  loading: false,
  error: null
};

const workoutsSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    // Actions will be added in Commits 8-14
  }
});

export default workoutsSlice.reducer;