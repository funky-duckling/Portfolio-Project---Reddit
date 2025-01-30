import axios from 'axios';

const REDDIT_AUTH_URL = 'https://www.reddit.com';
const REDDIT_API_URL = 'https://oauth.reddit.com';
const CLIENT_ID = '3ZrBe0RXDTE7kjIw9n2ctQ';
const CLIENT_SECRET = 'ZXOjpWmDkekNweAg4fjW570pyMU_ZQ';

// Function to get the access token
export const getAccessToken = async () => {
  const data = new URLSearchParams({ grant_type: 'client_credentials' });

  try {
    const response = await axios.post(`${REDDIT_AUTH_URL}/api/v1/access_token`, data, {
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw new Error('Unable to authenticate with Reddit API');
  }
};

// Function to map API response to UI-friendly structure
export const mapRedditPostToCard = (post) => {
  const largestImage =
    post.preview?.images[0]?.resolutions?.slice(-1)[0]?.url.replace(/&amp;/g, '&') ||
    null;

  return {
    id: post.id,
    title: post.title,
    author: post.author,
    subreddit: post.subreddit_name_prefixed,
    upvotes: post.ups,
    comments: post.num_comments,
    content: post.selftext || '',
    logo: post.subreddit_icon ? post.subreddit_icon : '',
    image: largestImage,
    created_utc: post.created_utc,
  };
};

// Function to fetch Reddit posts (including Search)
export const fetchRedditPosts = async (
  accessToken,
  subreddit = 'all',
  sort = 'hot',
  limit = 10,
  after = null,
  searchQuery = ''
) => {
  try {
    // Determine API endpoint (search or subreddit)
    const url = searchQuery
      ? `${REDDIT_API_URL}/r/${subreddit}/search.json?q=${encodeURIComponent(
          searchQuery
        )}&sort=${sort}&limit=${limit}${after ? `&after=${after}` : ''}`
      : `${REDDIT_API_URL}/r/${subreddit}/${sort}.json?limit=${limit}${after ? `&after=${after}` : ''}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      posts: response.data.data.children.map((child) => mapRedditPostToCard(child.data)),
      after: response.data.data.after || null,
    };
  } catch (error) {
    console.error('Error fetching Reddit posts:', error);
    throw new Error('Unable to fetch posts from Reddit');
  }
};

// Function to fetch post details and comments
export const fetchPostDetailsAndComments = async (accessToken, postId) => {
  try {
    const response = await axios.get(`${REDDIT_API_URL}/comments/${postId}.json`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const post = response.data[0].data.children[0].data;
    const comments = response.data[1].data.children
      .filter((child) => child.kind === 't1') // Filter out non-comment items
      .map((child) => ({
        id: child.data.id,
        body: child.data.body || '',
        author: child.data.author || 'Anonymous',
        created_utc: child.data.created_utc,
        profileImage: child.data.author
          ? `https://www.redditstatic.com/avatars/avatar_default_${Math.floor(Math.random() * 20) + 1}.png`
          : 'https://placehold.co/40x40?text=U&bg=gray&color=white', // Default avatar
      }));

    return {
      post: {
        id: post.id,
        title: post.title,
        content: post.selftext || '',
        author: post.author,
        subreddit: post.subreddit_name_prefixed,
        upvotes: post.ups,
        comments: post.num_comments,
        image:
          post.preview?.images[0]?.source?.url.replace(/&amp;/g, '&') ||
          (post.thumbnail?.startsWith('http') ? post.thumbnail : null),
        created_utc: post.created_utc,
      },
      comments,
    };
  } catch (error) {
    console.error('Error fetching post details and comments:', error);
    throw new Error('Unable to fetch post details and comments');
  }
};