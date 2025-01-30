import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPostDetailsAndComments, getAccessToken } from '../services/redditAPI';
import formatDistanceToNow from '../services/formatDistanceToNow';
import NavBar from '../components/Navigation/NavBar';
import { motion } from 'framer-motion';
import { ArrowUpIcon, ArrowDownIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';

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
          <NavBar /> 
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

  <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-500 fixed left-5 z-10"
      >
        Back
      </button>

    <motion.div 
      className="mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
    >
        
    <div className="max-w-full mx-5 py-8 relative flex justify-center">

      <div className="max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
      {post && (
        <div className="bg-gray-700 text-white rounded-lg shadow-xl p-6 mb-4 mt-8 relative">
        {/* ✅ Upvotes & Comments (Positioned Top-Right) */}
        <div className="absolute top-3 right-4 flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-1">
            <ArrowUpIcon className="w-5 sm:w-6 h-5 sm:h-6 text-gray-400 cursor-pointer hover:text-green-500" />
            <span className="text-xs sm:text-sm">{post.upvotes?.toLocaleString()}</span>
            <ArrowDownIcon className="w-5 sm:w-6 h-5 sm:h-6 text-gray-400 cursor-pointer hover:text-red-500" />
          </div>
          <div className="flex items-center gap-1">
            <ChatBubbleLeftIcon className="w-5 sm:w-6 h-5 sm:h-6 text-gray-400" />
            <span className="text-xs sm:text-sm">{post.comments?.toLocaleString()}</span>
          </div>
        </div>
          <p className="text-gray-400 text-sm mb-1">{post.subreddit}</p>
          <h1 className="text-xl font-bold mb-4">{post.title}</h1>
          {post.video ? (
  <div className="w-full flex items-center justify-center mb-4 overflow-hidden rounded-lg">
    <video controls className="max-w-full h-auto rounded-lg">
      <source src={post.video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
) : post.image ? (
  <div className="w-full flex items-center justify-center mb-4 overflow-hidden rounded-lg">
    <img
      src={post.image}
      alt={post.title}
      className="object-cover object-center max-w-full h-auto"
    />
  </div>
) : null}
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
              <p className="text-gray-300 mt-2 break-all">{comment.body}</p>
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
