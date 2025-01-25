import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPostDetailsAndComments, getAccessToken } from '../services/redditAPI';

const PostDetails = () => {
  const { postId } = useParams(); // Get the postId from the URL parameters
  const [post, setPost] = useState(null); // State to store the post details
  const [comments, setComments] = useState([]); // State to store the comments
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const loadPostDetails = async () => {
      try {
        const accessToken = await getAccessToken();
        const { post, comments } = await fetchPostDetailsAndComments(accessToken, postId);
        setPost(post);
        setComments(comments);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadPostDetails();
  }, [postId]);

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {post && (
        <div>
          <h1 className="text-xl font-bold text-white">{post.title}</h1>
          <p className="text-sm text-gray-400">
            Posted by {post.author} in {post.subreddit}
          </p>
          <img
            src={post.image}
            alt={post.title}
            className="mt-4 max-w-full h-auto rounded-lg"
          />
          <p className="mt-4 text-white">{post.content}</p>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-white">Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="mt-4 p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-300">{comment.body}</p>
              <p className="text-xs text-gray-500">- {comment.author}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No comments available.</p>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
