import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Home from '../Home';
import postsReducer from '../../features/posts/postsSlice';
import { vi } from 'vitest';
import { usePosts } from '../../hooks/usePosts';

// Mock `usePosts` to control returned data
vi.mock('../../hooks/usePosts');

const mockPosts = [
  {
    id: '1',
    title: 'Test Post 1',
    content: 'Test content 1',
    author: 'User1',
    subreddit: 'r/test1',
    upvotes: 10,
    comments: 2,
    images: ['https://placehold.co/600x400'],
    video: null,
    created_utc: 1672531200,
  },
  {
    id: '2',
    title: 'Test Post 2',
    content: 'Test content 2',
    author: 'User2',
    subreddit: 'r/test2',
    upvotes: 20,
    comments: 5,
    images: ['https://placehold.co/600x400'],
    video: null,
    created_utc: 1672531201,
  },
];

// Setup Redux store
const store = configureStore({
  reducer: { posts: postsReducer },
});

describe('Home Page', () => {
  test('renders the NavBar', () => {
    usePosts.mockReturnValue({ posts: [], loading: false, after: null, loadPosts: vi.fn() });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('displays posts correctly', async () => {
    usePosts.mockReturnValue({ posts: mockPosts, loading: false, after: null, loadPosts: vi.fn() });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
      expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    });
  });

  test('shows loading state when fetching posts', () => {
    usePosts.mockReturnValue({ posts: [], loading: true, after: null, loadPosts: vi.fn() });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('shows "No posts found" when there are no posts', async () => {
    usePosts.mockReturnValue({ posts: [], loading: false, after: null, loadPosts: vi.fn() });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/no posts found/i)).toBeInTheDocument();
  });

  test('calls loadPosts when clicking "Load More"', async () => {
    const loadPostsMock = vi.fn();
    usePosts.mockReturnValue({ posts: mockPosts, loading: false, after: 'next_page_token', loadPosts: loadPostsMock });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    const loadMoreButton = screen.getByText(/load more/i);
    expect(loadMoreButton).toBeInTheDocument();
    await waitFor(() => loadMoreButton.click());

    expect(loadPostsMock).toHaveBeenCalled();
  });
});
