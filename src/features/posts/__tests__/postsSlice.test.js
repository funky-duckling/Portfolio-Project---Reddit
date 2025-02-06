import postsReducer, { setSearchQuery, setActiveFilter, setPosts } from '../postsSlice';

describe('postsSlice Reducers', () => {
  test('should return the initial state', () => {
    expect(postsReducer(undefined, {})).toEqual({
      posts: [],
      searchQuery: '',
      activeFilter: 'Hot', // ✅ Match the actual default value from postsSlice.js
    });
  });

  test('should update searchQuery when setSearchQuery is dispatched', () => {
    const previousState = { posts: [], searchQuery: '', activeFilter: 'Hot' };
    const newState = postsReducer(previousState, setSearchQuery('React'));

    expect(newState.searchQuery).toBe('React');
  });

  test('should update activeFilter when setActiveFilter is dispatched', () => {
    const previousState = { posts: [], searchQuery: '', activeFilter: 'Hot' };
    const newState = postsReducer(previousState, setActiveFilter('New'));

    expect(newState.activeFilter).toBe('New');
  });

  test('should update posts when setPosts is dispatched', () => {
    const previousState = { posts: [], searchQuery: '', activeFilter: 'Hot' };
    const mockPosts = [{ id: '1', title: 'Test Post' }];
    const newState = postsReducer(previousState, setPosts(mockPosts));

    expect(newState.posts).toEqual(mockPosts);
  });
});
