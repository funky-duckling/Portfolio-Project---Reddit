import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card from '../Card';

const mockPost = {
  id: '1',
  title: 'Test Post Title',
  subreddit: 'r/testsubreddit',
  upvotes: 123,
  comments: 45,
  content: 'This is a test post content',
  images: ['https://placehold.co/600x400'], // Example image
  video: null,
  created_utc: 1672531200, // Example timestamp
};

describe('Card Component', () => {
  test('renders the Card component with a title', () => {
    render(
      <MemoryRouter>
        <Card post={mockPost} />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    expect(screen.getByText('r/testsubreddit')).toBeInTheDocument();
  });

  test('renders image if present', () => {
    render(
      <MemoryRouter>
        <Card post={mockPost} />
      </MemoryRouter>
    );

    expect(screen.getByAltText('Post')).toBeInTheDocument();
  });

  test('displays upvote and comment count', () => {
    render(
      <MemoryRouter>
        <Card post={mockPost} />
      </MemoryRouter>
    );

    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });
});
