import PropTypes from 'prop-types';
import { ArrowUpIcon, ArrowDownIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';

const Card = ({ post }) => {
  return (
    <div
      className="card bg-gray-700 text-white rounded-lg shadow-xl m-4 p-4 relative"
    >
      <div className="flex items-center mb-4">
        {post.logo && (
          <img
            src={post.logo}
            alt={`${post.subreddit} logo`}
            className="w-8 h-8 rounded-full mr-4"
          />
        )}
        <h2 className="text-xl font-bold">{post.title}</h2>
      </div>
       
        {post.image && (
          <img
            src={post.image}
            alt="Post"
            className="w-full h-auto object-cover object-center mb-4"
          />
        )}
        
        <p className="text-sm">{post.content}</p>

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
    </div>
  );
};

// Define prop types
Card.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    subreddit: PropTypes.string.isRequired,
    upvotes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

export default Card;
