import PropTypes from 'prop-types'; // Import PropTypes

const Card = ({ post }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg">
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="text-gray-400">by {post.author} in {post.subreddit}</p>
      <p>{post.content}</p>
      {post.image && <img src={post.image} alt={post.title} />}
      <div>
        <span>{post.upvotes} Upvotes</span>
        <span>{post.comments} Comments</span>
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
    image: PropTypes.string,
  }).isRequired,
};

export default Card;