import axios from 'axios';

const REDDIT_AUTH_URL = 'https://www.reddit.com';
const REDDIT_API_URL = 'https://oauth.reddit.com';
const CLIENT_ID = import.meta.env.VITE_REDDIT_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_REDDIT_API_KEY;

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

const decodeImageUrl = (url) => url?.replace(/&amp;/g, '&') || '';

// Function to map API response to UI-friendly structure
const mapRedditPostToCard = (post) => ({
  id: post.id,
  title: post.title,
  author: post.author,
  subreddit: post.subreddit_name_prefixed,
  upvotes: post.ups,
  comments: post.num_comments,
  content: post.selftext || '',
  images: [
    ...(post.preview?.images?.map((img) => decodeImageUrl(img.source?.url)) || []),
    ...(post.gallery_data?.items?.map((item) => decodeImageUrl(post.media_metadata?.[item.media_id]?.s?.u)) || []),
  ],
  video: post.media?.reddit_video?.fallback_url || null,
  created_utc: post.created_utc,
});

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
    
    const previewImages = post.preview?.images?.map((img) =>
      img.source?.url.replace(/&amp;/g, '&')
    ) || [];
    
    const galleryImages = post.gallery_data?.items?.map((item) =>
      post.media_metadata?.[item.media_id]?.s?.u.replace(/&amp;/g, '&')
    ) || [];
    
    const images = [...previewImages, ...galleryImages];

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

      const videoUrl = post.media?.reddit_video?.fallback_url || null;

    return {
      post: {
        id: post.id,
        title: post.title,
        content: post.selftext || '',
        author: post.author,
        subreddit: post.subreddit_name_prefixed,
        upvotes: post.ups,
        comments: post.num_comments,
        images,
        video: videoUrl,
        created_utc: post.created_utc,
      },
      comments,
    };
  } catch (error) {
    console.error('Error fetching post details and comments:', error);
    throw new Error('Unable to fetch post details and comments');
  }
};