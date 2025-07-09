import { createSlice } from '@reduxjs/toolkit';

// Default/average values
const DEFAULT_VALUES = {
  height: 170, // cm (average global height)
  weight: 70,  // kg (average global weight)
  age: 30,
  activityLevel: 'lightly_active'
};

const initialState = {
  profile: {
    name: null,
    age: null,
    height: null, // cm
    weight: null, // kg
    gender: null,
    activityLevel: 'lightly_active'
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
    setProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    setGoals: (state, action) => {
      state.goals = { ...state.goals, ...action.payload };
    },
    setPreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    completeOnboarding: (state) => {
      state.isOnboarded = true;
      // Apply defaults for missing profile data
      if (!state.profile.height) state.profile.height = DEFAULT_VALUES.height;
      if (!state.profile.weight) state.profile.weight = DEFAULT_VALUES.weight;
      if (!state.profile.age) state.profile.age = DEFAULT_VALUES.age;
    },
    resetOnboarding: (state) => {
      state.isOnboarded = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  setProfile,
  setGoals,
  setPreferences,
  completeOnboarding,
  resetOnboarding,
  setLoading,
  setError
} = userSlice.actions;

export default userSlice.reducer;