import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../../features/posts/postsSlice'; 
import PostDetails from '../PostDetails';
import { fetchPostDetailsAndComments } from '../../services/redditAPI';
import { vi } from 'vitest';

// Mock API function
vi.mock('../../services/redditAPI', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual, // Preserve other exports
    getAccessToken: vi.fn().mockResolvedValue('mock-access-token'), // ✅ Mock the token function
    fetchPostDetailsAndComments: vi.fn(),
  };
});


// Create a mock Redux store with default state
const mockStore = configureStore({
  reducer: {
    posts: postReducer, // Ensure the store has the necessary reducers
  },
});

const mockPost = {
  id: '1',
  title: 'Test Post Title',
  content: 'This is a test post content',
  author: 'TestUser',
  subreddit: 'r/testsubreddit',
  upvotes: 123,
  comments: 45,
  images: ['https://placehold.co/600x400'],
  video: null,
  created_utc: 1672531200,
};

const mockComments = [
  {
    id: 'c1',
    body: 'Test comment 1',
    author: 'Commenter1',
    created_utc: 1672531220,
    profileImage: 'https://placehold.co/40x40',
  },
  {
    id: 'c2',
    body: 'Test comment 2',
    author: 'Commenter2',
    created_utc: 1672531230,
    profileImage: 'https://placehold.co/40x40',
  },
];

describe('PostDetails Component', () => {
  test('renders loading state initially', async () => {
    fetchPostDetailsAndComments.mockResolvedValue({ post: mockPost, comments: mockComments });

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <PostDetails />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders post details when data is loaded', async () => {
    fetchPostDetailsAndComments.mockResolvedValue({ post: mockPost, comments: mockComments });

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <PostDetails />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/test post title/i)).toBeInTheDocument();
    expect(screen.getByText(/r\/testsubreddit/i)).toBeInTheDocument();
    expect(screen.getByText(/posted by testuser/i)).toBeInTheDocument(); // ✅ Includes 'Posted by'
    expect(screen.getByText(/this is a test post content/i)).toBeInTheDocument();
    });
  });

  test('renders upvote and comment count', async () => {
    fetchPostDetailsAndComments.mockResolvedValue({ post: mockPost, comments: mockComments });

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <PostDetails />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('123')).toBeInTheDocument(); // Upvotes
      expect(screen.getByText('45')).toBeInTheDocument(); // Comments count
    });
  });

  test('renders error message on API failure', async () => {
    fetchPostDetailsAndComments.mockRejectedValue(new Error('Failed to fetch'));

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <PostDetails />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
