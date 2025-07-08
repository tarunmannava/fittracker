import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isActive: false,
  isPaused: false,
  timeRemaining: 0,
  totalTime: 90,
  type: 'rest', // 'rest', 'workout', 'break'
  settings: {
    autoStart: true,
    soundEnabled: true,
    vibrationEnabled: true
  }
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    // Actions will be added in Commit 22
  }
});

export default timerSlice.reducer;