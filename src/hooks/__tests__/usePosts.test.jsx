import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { usePosts } from '../usePosts';
import postsReducer, { setSearchQuery } from '../../features/posts/postsSlice';
import { vi } from 'vitest';
import { getAccessToken, fetchRedditPosts } from '../../services/redditAPI';

// 🛑 Mock API calls
vi.mock('../../services/redditAPI', () => ({
  getAccessToken: vi.fn(),
  fetchRedditPosts: vi.fn(),
}));

// Mock Redux store
const mockStore = configureStore({
  reducer: { posts: postsReducer },
});

// ✅ Move mock data to the top so all tests can use it
const mockPosts = [
  { id: '1', title: 'Test Post 1', subreddit: 'r/test', upvotes: 10, comments: 5 },
];

describe('usePosts Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('returns initial state correctly', () => {
    const { result } = renderHook(() => usePosts('Hot'), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    expect(result.current.posts).toEqual([]);
    expect(result.current.after).toBe(null);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  test('fetches and updates posts on mount', async () => {
    getAccessToken.mockResolvedValue('mock_access_token');
    fetchRedditPosts.mockResolvedValue({ posts: mockPosts, after: 'next_page' });

    const { result } = renderHook(() => usePosts('Hot'), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    // Wait for state update
    await act(async () => {});

    expect(result.current.posts).toEqual(mockPosts);
    expect(result.current.after).toBe('next_page');
    expect(result.current.loading).toBe(false);
  });

  test('fetches more posts when loadPosts(false) is called', async () => {
    const mockPosts = [
      { id: '1', title: 'Test Post 1', subreddit: 'r/test', upvotes: 10, comments: 5 },
    ];
  
    const mockNewPosts = [
      { id: '2', title: 'Test Post 2', subreddit: 'r/test2', upvotes: 20, comments: 10 },
    ];
  
    getAccessToken.mockResolvedValue('mock_access_token');
  
    // 🛑 First fetch should return mockPosts
    fetchRedditPosts.mockResolvedValueOnce({ posts: mockPosts, after: 'next_page' });
  
    const { result } = renderHook(() => usePosts('Hot'), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });
  
    // Wait for initial posts to load
    await act(async () => {});
  
    // ✅ Ensure mockPosts loaded first
    expect(result.current.posts).toEqual(mockPosts);
  
    // 🛑 Second fetch should return mockNewPosts (appending to mockPosts)
    fetchRedditPosts.mockResolvedValueOnce({ posts: mockNewPosts, after: 'next_page_2' });
  
    await act(async () => {
      await result.current.loadPosts(false);
    });
  
    // ✅ Expect both mockPosts and mockNewPosts to be present
    expect(result.current.posts).toEqual([...mockPosts, ...mockNewPosts]);
    expect(result.current.after).toBe('next_page_2');
  });
  

  test('handles API errors correctly', async () => {
    getAccessToken.mockRejectedValue(new Error('Token error'));
    fetchRedditPosts.mockRejectedValue(new Error('API error'));

    const { result } = renderHook(() => usePosts('Hot'), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.loadPosts(true);
    });

    expect(result.current.error).toBe('Token error');
    expect(result.current.loading).toBe(false);
  });

  test('reacts to Redux searchQuery changes', async () => {
    mockStore.dispatch(setSearchQuery('react'));

    const { result } = renderHook(() => usePosts('Hot'), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    expect(result.current.posts).toEqual([]);
    expect(result.current.loading).toBe(true);
  });
});
