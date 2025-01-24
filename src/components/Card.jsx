import PropTypes from 'prop-types';
import { ArrowUpIcon, ArrowDownIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
import formatDistanceToNow from '../utils/formatDistanceToNow';
const Card = ({ post }) => {
  return (
    <div className="card bg-gray-700 text-white rounded-lg shadow-xl m-4 p-4 relative">
      {/* Subreddit Name */}
      <p className="text-gray-400 text-sm">{post.subreddit}</p>

      {/* Post Title */}
      <h2 className="text-xl font-bold mb-4">{post.title}</h2>

      {/* Optional Post Image */}
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="w-full h-auto object-cover object-center mb-4"
        />
      )}

      {/* Upvotes and Comments */}
      <div className="absolute top-4 right-4 flex items-center space-x-8">
        <div className="flex items-center space-x-1">
          <ArrowUpIcon className="w-6 h-6 text-gray-400 cursor-pointer hover:text-green-500" />
          <span>{post.upvotes}</span>
          <ArrowDownIcon className="w-6 h-6 text-gray-400 cursor-pointer hover:text-red-500" />
        </div>
        <div className="flex items-center space-x-1">
          <ChatBubbleLeftIcon className="w-6 h-6 text-gray-400" />
          <span>{post.comments}</span>
        </div>
      </div>

      {/* Time Ago */}
      <p className="text-gray-400 text-sm mt-2">
        {formatDistanceToNow(new Date(post.created_utc * 1000))} ago
      </p>
    </div>
  );
};

// Define prop types
Card.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subreddit: PropTypes.string.isRequired,
    upvotes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    content: PropTypes.string,
    logo: PropTypes.string,
    image: PropTypes.string,
    created_utc: PropTypes.number.isRequired,
  }).isRequired,
};

export default Card;