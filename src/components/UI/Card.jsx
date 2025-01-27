import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowUpIcon, ArrowDownIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
import formatDistanceToNow from '../../services/formatDistanceToNow';

const Card = ({ post }) => {
  return (
    <Link
      to={`/post/${post.id}`}
      state={{ post }}
      className="card bg-gray-700 text-white rounded-lg shadow-xl m-4 p-4 relative block hover:bg-neutral-700"
    >
      {/* Subreddit Name */}
      <p className="text-gray-400 text-sm mb-1">{post.subreddit}</p>

      {/* Post Title */}
      <h2 className="text-xl font-bold mb-4">{post.title}</h2>

      {/* Optional Post Image */}
      {post.image && (
        <div className="w-full flex items-center justify-center mb-4 overflow-hidden rounded-lg">
          <img
            src={post.image}
            alt="Post"
            className="object-cover object-center max-w-full h-auto"
          />
        </div>
      )}

      {/* Upvotes and Comments */}
      <div className="absolute bottom-3 right-4 flex items-center space-x-8">
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
        {formatDistanceToNow(post.created_utc)}
      </p>
    </Link>
  );
};

// Define prop types
Card.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired, // Unique post ID
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
