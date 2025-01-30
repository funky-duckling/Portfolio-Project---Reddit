import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPostDetailsAndComments, getAccessToken } from '../services/redditAPI';
import formatDistanceToNow from '../services/formatDistanceToNow';
import NavBar from '../components/Navigation/NavBar';
import { motion } from 'framer-motion';

const PostDetails = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    return (
        <div>
          <NavBar /> {/* ✅ Ensure NavBar is always visible */}
          <p className="text-white text-center mt-4">Loading...</p>
          <div className="flex justify-center mt-2" >
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
          </div>
        </div>
      );
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
  <div>
  <NavBar />
    <motion.div 
      className="mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
    >
        
    <div className="max-w-full mx-5 px-4 py-8 relative flex justify-center">
      {/* Back Button (absolutely positioned) */}
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 fixed left-8 top-24"
      >
        Back
      </button>

      <div className="max-w-4xl">
      {post && (
        <div className="bg-gray-700 text-white rounded-lg shadow-xl p-6 mb-6">
          <p className="text-gray-400 text-sm mb-1">{post.subreddit}</p>
          <h1 className="text-xl font-bold mb-4">{post.title}</h1>
          {post.image && (
            <div className="w-full flex items-center justify-center mb-4 overflow-hidden rounded-lg">
              <img
                src={post.image}
                alt={post.title}
                className="object-cover object-center max-w-full h-auto"
              />
            </div>
          )}
          <p className="text-gray-300 mb-4">{post.content}</p>
          <p className="text-gray-400 text-sm">
            Posted by {post.author} {formatDistanceToNow(post.created_utc)}
          </p>
        </div>
      )}

      {/* Comments (aligned with the post container) */}
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
              <p className="text-gray-400 text-sm mt-2">
                {formatDistanceToNow(comment.created_utc)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No comments available.</p>
        )}
      </div>
    </div>

    </motion.div>
    </div>
  );
};

export default PostDetails;
