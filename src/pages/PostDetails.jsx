import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPostDetailsAndComments, getAccessToken } from '../services/redditAPI';
import formatDistanceToNow from '../services/formatDistanceToNow';

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
      {/* Post Details Card */}
      {post && (
        <div className="bg-gray-700 text-white rounded-lg shadow-xl p-6 mb-6">
          {/* Subreddit Name */}
          <p className="text-gray-400 text-sm mb-1">{post.subreddit}</p>

          {/* Post Title */}
          <h1 className="text-xl font-bold mb-4">{post.title}</h1>

          {/* Optional Post Image */}
          {post.image && (
            <div className="w-full flex items-center justify-center mb-4 overflow-hidden rounded-lg">
              <img
                src={post.image}
                alt={post.title}
                className="object-cover object-center max-w-full h-auto"
              />
            </div>
          )}

          {/* Post Content */}
          {post.content && <p className="text-gray-300 mb-4">{post.content}</p>}

          {/* Time Ago */}
          <p className="text-gray-400 text-sm">
            Posted by {post.author} {formatDistanceToNow(post.created_utc)}
          </p>
        </div>
      )}

      {/* Comments Section */}
      <div>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-700 p-4 rounded-lg mb-4 shadow-md"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={comment.profileImage}
                  alt={comment.author}
                  className="w-8 h-8 rounded-full"
                />
                <p className="text-white font-semibold">{comment.author}</p>
              </div>
              <p className="text-gray-300 mt-2">{comment.body}</p>
              <p className="text-gray-400 text-sm mt-2">{formatDistanceToNow(comment.created_utc)}</p>
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
