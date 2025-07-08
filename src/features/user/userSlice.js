import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {
    name: null,
    age: null,
    height: null, // cm
    weight: null, // kg
    gender: null,
    activityLevel: 'sedentary'
  },
  goals: {
    primaryGoal: null, // 'lose_weight', 'gain_muscle', 'general_fitness'
    targetWeight: null,
    weeklyWorkouts: 3,
    timeframe: '3_months'
  },
  preferences: {
    units: 'metric',
    theme: 'light',
    defaultRestTime: 90,
    workoutReminders: true
  },
  isOnboarded: false,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Actions will be added in Commit 2
  }
});

export default userSlice.reducer;