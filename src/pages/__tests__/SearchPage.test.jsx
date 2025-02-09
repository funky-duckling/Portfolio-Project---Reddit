import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SearchPage from '../../pages/SearchPage';
import postsReducer from '../../features/posts/postsSlice';
import { vi } from 'vitest';

// Mock Redux store
const mockStore = (searchQuery, posts) =>
  configureStore({
    reducer: { posts: postsReducer },
    preloadedState: {
      posts: {
        searchQuery,
        posts,
      },
    },
  });

const mockPosts = [
  {
    id: '1',
    title: 'React Testing',
    content: 'A post about React Testing',
    author: 'User1',
    subreddit: 'r/react',
    upvotes: 10,
    comments: 2,
    images: ['https://placehold.co/600x400'],
    video: null,
    created_utc: 1672531200,
  },
  {
    id: '2',
    title: 'Vitest Guide',
    content: 'A guide to using Vitest',
    author: 'User2',
    subreddit: 'r/testing',
    upvotes: 20,
    comments: 5,
    images: ['https://placehold.co/600x400'],
    video: null,
    created_utc: 1672531201,
  },
];

describe('SearchPage Component', () => {
  test('renders the NavBar', () => {
    render(
      <Provider store={mockStore('', mockPosts)}>
        <MemoryRouter>
          <SearchPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('displays posts matching the search query', () => {
    render(
      <Provider store={mockStore('React', mockPosts)}>
        <MemoryRouter initialEntries={["/?q=React"]}> {/* ✅ Ensure URL reflects the Redux state */}
          <SearchPage />
        </MemoryRouter>
      </Provider>
    );
  
    expect(screen.getByText('React Testing')).toBeInTheDocument();
    expect(screen.queryByText('Vitest Guide')).not.toBeInTheDocument();
  });

  test('displays "No posts found" when no results match the query', () => {
    render(
      <Provider store={mockStore('Nonexistent', mockPosts)}>
        <MemoryRouter initialEntries={["/?q=Nonexistent"]}> {/* ✅ Ensure URL reflects the Redux state */}
          <SearchPage />
        </MemoryRouter>
      </Provider>
    );
  
    expect(screen.getByText(/no posts found/i)).toBeInTheDocument(); // ✅ Check if the message exists
  });
});
