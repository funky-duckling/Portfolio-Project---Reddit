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
    setLoading(true);
    try {
      const accessToken = await getAccessToken();
      const { posts: newPosts, after: newAfter } = await fetchRedditPosts(
        accessToken,
        'all',
        activeFilter.toLowerCase(),
        10,
        isFresh ? null : after,
        searchQuery // Pass search query to the API
      );

      if (isFresh) {
        setPosts(newPosts); // Overwrite posts for fresh load
      } else {
        setPosts((prev) => [...prev, ...newPosts]); // Append posts for "Load More"
      }
      setAfter(newAfter); // Update pagination token
    } catch (err) {
      setError(err.message); // Handle errors
    } finally {
      setLoading(false); // End loading state
    }
  };

  return { posts, after, loading, error, loadPosts };
}