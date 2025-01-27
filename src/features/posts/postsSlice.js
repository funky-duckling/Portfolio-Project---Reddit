import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [], // Posts array
    searchQuery: '', // Track the search query
    activeFilter: 'Hot', // Default filter
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload; // Update the search query
    },
    setPosts: (state, action) => {
      state.posts = action.payload; // Update posts when fetched from an API
    },
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload; // Update active filter
    },
  },
});

export const { setSearchQuery, setPosts, setActiveFilter } = postsSlice.actions;
export default postsSlice.reducer;