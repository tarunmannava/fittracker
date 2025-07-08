import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  weight: {
    entries: [],
    goal: null,
    trend: null
  },
  workouts: {
    totalCompleted: 0,
    thisWeek: 0,
    thisMonth: 0,
    streak: 0
  },
  achievements: [],
  insights: [],
  loading: false,
  error: null
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    // Actions will be added in Commits 15-21
  }
});

export default progressSlice.reducer;