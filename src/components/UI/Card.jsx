import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowUpIcon, ArrowDownIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
import formatDistanceToNow from '../../services/formatDistanceToNow';

const Card = ({ post }) => {
  return (
    <Link
      to={`/post/${post.id}`}
      state={{ post }}
      className="card bg-gray-700 text-white rounded-lg shadow-xl m-4 p-4 block hover:bg-gray-600"
    >
      {/* Subreddit Name */}
      <p className="text-gray-400 text-xs sm:text-sm mb-1">{post.subreddit}</p>

      {/* Post Title */}
      <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">{post.title}</h2>

      {/* ✅ Video or Image Preview */}
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
            alt="Post"
            className="object-cover object-center w-full"
          />
        </div>
      ) : null}

      {/* Truncated Content Snippet (3 lines) */}
      {post.content && (
        <p className="text-gray-200 text-sm sm:text-base line-clamp-3 mb-4">
          {post.content}
        </p>
      )}

      {/* Upvotes and Comments (Adjusted for Mobile) */}
      <div className="flex justify-between items-center mt-2">
        {/* Time Ago */}
        <p className="text-gray-400 text-xs sm:text-sm">
          {formatDistanceToNow(post.created_utc)}
        </p>

        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-1">
            <ArrowUpIcon className="w-5 sm:w-6 h-5 sm:h-6 text-gray-400 cursor-pointer hover:text-green-500" />
            <span className="text-xs sm:text-sm">{post.upvotes.toLocaleString()}</span>
            <ArrowDownIcon className="w-5 sm:w-6 h-5 sm:h-6 text-gray-400 cursor-pointer hover:text-red-500" />
          </div>
          <div className="flex items-center gap-1">
            <ChatBubbleLeftIcon className="w-5 sm:w-6 h-5 sm:h-6 text-gray-400" />
            <span className="text-xs sm:text-sm">{post.comments.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Define prop types
Card.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subreddit: PropTypes.string.isRequired,
    upvotes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    content: PropTypes.string,
    logo: PropTypes.string,
    image: PropTypes.string,
    video: PropTypes.string, // ✅ New prop for video
    created_utc: PropTypes.number.isRequired,
  }).isRequired,
};

export default Card;
