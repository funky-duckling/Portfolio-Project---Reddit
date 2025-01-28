import { useState, useEffect } from 'react';
import { getAccessToken, fetchRedditPosts } from '../services/redditAPI';

export function usePosts(activeFilter) {
  const [posts, setPosts] = useState([]);
  const [after, setAfter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts initially and on filter change
  useEffect(() => {
    loadPosts(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter]);

  // loadPosts function (fresh vs. load more)
  const loadPosts = async (isFresh) => {
    setLoading(true);
    try {
      const accessToken = await getAccessToken();
      const { posts: newPosts, after: newAfter } = await fetchRedditPosts(
        accessToken,
        'all',
        activeFilter.toLowerCase(),
        10,
        isFresh ? null : after
      );

      if (isFresh) {
        setPosts(newPosts);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
      }
      setAfter(newAfter);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { posts, after, loading, error, loadPosts };
}