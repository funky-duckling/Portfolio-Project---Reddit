import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to get searchQuery from Redux
import { getAccessToken, fetchRedditPosts } from '../services/redditAPI';

export function usePosts(activeFilter) {
  const [posts, setPosts] = useState([]); // State to store posts
  const [after, setAfter] = useState(null); // Pagination token
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Get the search query from Redux
  const searchQuery = useSelector((state) => state.posts.searchQuery);

  // Fetch posts initially and on filter or searchQuery change
  useEffect(() => {
    loadPosts(true); // Fresh load when activeFilter or searchQuery changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter, searchQuery]); // Re-run when activeFilter or searchQuery changes

  // Function to load posts (fresh load or load more)
  const loadPosts = async (isFresh) => {
    // ✅ Keep previous posts visible while new ones load
    if (!isFresh) {
      setLoading(true);
    }
  
    // ✅ Save current scroll position before loading new posts
    const scrollY = window.scrollY;
  
    try {
      const accessToken = await getAccessToken();
      const { posts: newPosts, after: newAfter } = await fetchRedditPosts(
        accessToken,
        'all',
        activeFilter.toLowerCase(),
        10,
        isFresh ? null : after,
        searchQuery
      );
  
      if (isFresh) {
        setPosts(newPosts); // Overwrite posts for fresh load
      } else {
        setPosts((prev) => [...prev, ...newPosts]); // Append new posts BELOW old ones
      }
  
      setAfter(newAfter);
  
      // ✅ Restore scroll position after loading
      setTimeout(() => {
        window.scrollTo(0, scrollY);
      }, 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { posts, after, loading, error, loadPosts };
}