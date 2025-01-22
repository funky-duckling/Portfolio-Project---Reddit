import PropTypes from 'prop-types'; // Import PropTypes

const Card = ({ post }) => {
  return (
    <div className="card p-4 bg-gray-700 text-white rounded-lg shadow-xl m-4 relative max-h-[600px] overflow-hidden">

      <div className="flex items-center mb-4">
        {post.logo && <img src={post.logo} alt={`${post.subreddit} logo`} className="w-8 h-8 rounded-full mr-4" />}
        <h2 className="text-xl font-bold">{post.title}</h2>
      </div>

      <div className="overflow-y-auto" style={{ maxHeight: 'calc(600px - 100px)' }}>
      {post.image && <img src={post.image} alt="Post image" className="w-full h-auto mb-4" />}

      
      <p className="text-sm">{post.content}</p>
      </div>

      <div className="absolute top-4 right-2 text-sm">
        <span className='mx-4'>Upvotes: {post.upvotes}</span>
        <span className='m-4'>Comments: {post.comments}</span>
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