import axios from 'axios';

const REDDIT_AUTH_URL = 'https://www.reddit.com';
const REDDIT_API_URL = 'https://oauth.reddit.com';
const CLIENT_ID = '3ZrBe0RXDTE7kjIw9n2ctQ';
const CLIENT_SECRET = 'ZXOjpWmDkekNweAg4fjW570pyMU_ZQ';

// Function to get the access token
export const getAccessToken = async () => {
  const data = new URLSearchParams({
    grant_type: 'client_credentials',
  });

  try {
    const response = await axios.post(`${REDDIT_AUTH_URL}/api/v1/access_token`, data, {
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data.access_token; // Return the access token
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw new Error('Unable to authenticate with Reddit API');
  }
};

// Function to fetch Reddit posts
export const fetchRedditPosts = async (accessToken, subreddit = 'all', sort = 'hot', limit = 10) => {
  try {
    const response = await axios.get(`${REDDIT_API_URL}/r/${subreddit}/${sort}.json?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'blue-it by Funky_duc', // Replace with your Reddit username
      },
    });

    return response.data.data.children.map((child) => mapRedditPostToCard(child.data)); // Extract post data
  } catch (error) {
    console.error('Error fetching Reddit posts:', error);
    throw new Error('Unable to fetch posts from Reddit');
  }
};

export const mapRedditPostToCard = (post) => ({
    title: post.title,
    author: post.author,
    subreddit: post.subreddit_name_prefixed,
    upvotes: post.ups,
    comments: post.num_comments,
    content: post.selftext || '',
    logo: `https://www.reddit.com${post.subreddit_icon || ''}`,
    image: post.thumbnail && post.thumbnail.includes('http') ? post.thumbnail : null,
    created_utc: post.created_utc,
  });