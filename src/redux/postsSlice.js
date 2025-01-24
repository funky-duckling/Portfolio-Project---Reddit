import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [], // Your posts array
    searchQuery: '', // Track the search query here
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload; // Update the search query
    },
    setPosts: (state, action) => {
      state.posts = action.payload; // Update posts when fetched from an API or other source
    },
  },
});

export const { setSearchQuery, setPosts } = postsSlice.actions;
export default postsSlice.reducer;