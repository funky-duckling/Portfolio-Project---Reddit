import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../../../features/posts/postsSlice';
import NavBar from '../NavBar';

// Mock Redux Store
const store = configureStore({
  reducer: {
    posts: postsReducer, // Ensure this matches the Redux slice
  },
});

describe('NavBar Component', () => {
  test('renders the NavBar with all elements', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      </Provider>
    );

    // Check if Header is in the document
    expect(screen.getByText(/Reddit Clone/i)).toBeInTheDocument();

    // Check if SearchBar input is present
    expect(screen.getByPlaceholderText(/Search.../i)).toBeInTheDocument();

    // Check if all NavButtons are present
    expect(screen.getByText(/New/i)).toBeInTheDocument();
    expect(screen.getByText(/Top/i)).toBeInTheDocument();
    expect(screen.getByText(/Hot/i)).toBeInTheDocument();
  });
});
