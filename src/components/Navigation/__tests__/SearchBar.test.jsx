import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import postsReducer, { setSearchQuery } from '../../../features/posts/postsSlice';
import SearchBar from '../SearchBar';
import { MemoryRouter } from 'react-router-dom'; // ✅ Import MemoryRouter

// Mock Redux Store
const setupStore = (initialState) =>
  configureStore({
    reducer: { posts: postsReducer },
    preloadedState: { posts: initialState },
  });

describe('SearchBar Component', () => {
  test('renders the search input field', () => {
    const store = setupStore({ searchQuery: '' });

    render(
      <Provider store={store}>
        <MemoryRouter> {/* ✅ Wrap with MemoryRouter */}
          <SearchBar />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Search.../i)).toBeInTheDocument();
  });

  test('updates the input value when typing', async () => {
    const store = setupStore({ searchQuery: '' });
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter> {/* ✅ Wrap with MemoryRouter */}
          <SearchBar />
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Search.../i);

    await user.type(input, 'React');
    expect(input).toHaveValue('React');
  });

  test('dispatches setSearchQuery after typing (debounced)', async () => {
    const store = setupStore({ searchQuery: '' });
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter> {/* ✅ Wrap with MemoryRouter */}
          <SearchBar />
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Search.../i);

    await user.type(input, 'Redux');

    // Wait for debounce (300ms)
    await new Promise((r) => setTimeout(r, 350));

    expect(store.getState().posts.searchQuery).toBe('Redux');
  });
});