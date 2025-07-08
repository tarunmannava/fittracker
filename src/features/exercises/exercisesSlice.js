import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  database: [],
  categories: ['strength', 'cardio', 'flexibility', 'sports'],
  muscleGroups: ['chest', 'back', 'shoulders', 'arms', 'legs', 'core'],
  favorites: [],
  searchTerm: '',
  selectedCategory: 'all',
  loading: false,
  error: null
};

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    // Actions will be added in Commit 8
  }
});

export default exercisesSlice.reducer;