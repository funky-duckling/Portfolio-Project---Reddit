import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import postsReducer, { setActiveFilter } from '../../../features/posts/postsSlice';
import NavButtons from '../NavButtons';

// Mock Redux Store
const setupStore = (initialState) =>
  configureStore({
    reducer: { posts: postsReducer },
    preloadedState: { posts: initialState },
  });

describe('NavButtons Component', () => {
  test('renders all three buttons: New, Top, Hot', () => {
    const store = setupStore({ activeFilter: 'Hot' });

    render(
      <Provider store={store}>
        <NavButtons />
      </Provider>
    );

    expect(screen.getByText(/New/i)).toBeInTheDocument();
    expect(screen.getByText(/Top/i)).toBeInTheDocument();
    expect(screen.getByText(/Hot/i)).toBeInTheDocument();
  });

  test('clicking a button dispatches setActiveFilter action', async () => {
    const store = setupStore({ activeFilter: 'New' });
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <NavButtons />
      </Provider>
    );

    // Click "Top" button
    await user.click(screen.getByText(/Top/i));

    // Ensure Redux state is updated
    expect(store.getState().posts.activeFilter).toBe('Top');
  });

  test('applies active styling to the selected filter', () => {
    const store = setupStore({ activeFilter: 'Top' });

    render(
      <Provider store={store}>
        <NavButtons />
      </Provider>
    );

    // "Top" button should have active class (bg-blue-600)
    const topButton = screen.getByText(/Top/i);
    expect(topButton).toHaveClass('bg-blue-600');
  });
});
