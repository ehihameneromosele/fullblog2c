// TestImage.jsx - Create this temporary component
const TestImage = ({ url }) => {
  return (
    <div>
      <h3>Testing Image URL: {url}</h3>
      <img 
        src={url} 
        alt="Test" 
        style={{ maxWidth: '300px' }}
        onError={(e) => console.error('Test image failed:', url)}
        onLoad={(e) => console.log('Test image loaded:', url)}
      />
    </div>
  );
};

// Use it in your Dashboard temporarily:
{posts.slice(0, 2).map(post => (
  post.image && <TestImage key={post.id} url={post.image} />
))}