import axios from 'axios';
import { vi } from 'vitest';
import { getAccessToken, fetchRedditPosts, fetchPostDetailsAndComments } from '../redditAPI';

vi.mock('axios'); // ✅ Mock axios to prevent real API calls

describe('Reddit API Functions', () => {
  
  test('getAccessToken fetches an access token', async () => {
    const mockToken = 'mock_access_token';
    axios.post.mockResolvedValue({ data: { access_token: mockToken } });

    const token = await getAccessToken();
    expect(token).toBe(mockToken);
    expect(axios.post).toHaveBeenCalledWith(
      'https://www.reddit.com/api/v1/access_token',
      expect.any(URLSearchParams),
      expect.objectContaining({ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    );
  });

  test('fetchRedditPosts retrieves a list of posts', async () => {
    const mockAccessToken = 'mock_access_token';
    const mockPosts = [
      {
        data: {
          id: '1',
          title: 'Test Post',
          selftext: 'This is a test post',
          author: 'TestUser',
          subreddit_name_prefixed: 'r/test',
          ups: 100,
          num_comments: 20,
          preview: { images: [{ source: { url: 'https://placehold.co/600x400' } }] },
          media: null,
          created_utc: 1672531200,
        },
      },
    ];

    axios.get.mockResolvedValue({ data: { data: { children: mockPosts, after: 'next_page_token' } } });

    const response = await fetchRedditPosts(mockAccessToken);
    
    expect(response.posts.length).toBe(1);
    expect(response.posts[0].title).toBe('Test Post');
    expect(response.after).toBe('next_page_token');
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/r/all/hot.json'),
      expect.objectContaining({ headers: { Authorization: `Bearer ${mockAccessToken}` } })
    );
  });

  test('fetchPostDetailsAndComments retrieves a post and comments', async () => {
    const mockAccessToken = 'mock_access_token';
    const mockPostId = 'test_post_id';
    const mockPost = {
      data: {
        id: '1',
        title: 'Test Post',
        selftext: 'This is a test post',
        author: 'TestUser',
        subreddit_name_prefixed: 'r/test',
        ups: 100,
        num_comments: 20,
        preview: { images: [{ source: { url: 'https://placehold.co/600x400' } }] },
        media: null,
        created_utc: 1672531200,
      },
    };
    const mockComments = [
      {
        kind: 't1',
        data: {
          id: 'c1',
          body: 'Test comment',
          author: 'Commenter1',
          created_utc: 1672531220,
        },
      },
    ];

    axios.get.mockResolvedValue({
      data: [
        { data: { children: [mockPost] } },
        { data: { children: mockComments } },
      ],
    });

    const response = await fetchPostDetailsAndComments(mockAccessToken, mockPostId);

    expect(response.post.title).toBe('Test Post');
    expect(response.comments.length).toBe(1);
    expect(response.comments[0].body).toBe('Test comment');
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining(`/comments/${mockPostId}.json`),
      expect.objectContaining({ headers: { Authorization: `Bearer ${mockAccessToken}` } })
    );
  });

  test('Handles API errors correctly', async () => {
    axios.post.mockRejectedValue(new Error('API error'));
    await expect(getAccessToken()).rejects.toThrow('Unable to authenticate with Reddit API');

    axios.get.mockRejectedValue(new Error('API error'));
    await expect(fetchRedditPosts('mock_access_token')).rejects.toThrow('Unable to fetch posts from Reddit');
    await expect(fetchPostDetailsAndComments('mock_access_token', 'test_post_id')).rejects.toThrow('Unable to fetch post details and comments');
  });
});
