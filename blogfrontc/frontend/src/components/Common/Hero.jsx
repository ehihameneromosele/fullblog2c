import "./Hero.css";
import blogImage from "../../assets/blog-post-image-guide.webp"

const Hero = ({ 
  title, 
  subtitle, 
  children, 
  compact = false,
  overlayOpacity = 0.4 
}) => {
  // Using blog1.jpeg as the background image
  const heroStyle = {
    background: `linear-gradient(135deg, rgba(0, 0, 0, ${overlayOpacity}), rgba(0, 0, 0, ${overlayOpacity})), url(${blogImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: compact ? 'scroll' : 'fixed'
  };

  return (
    <section 
      className={`herod ${compact ? 'hero-compact' : ''} hero-with-bg`}
      style={heroStyle}
    >
      <div className="hero-content">
        <div className="hero-container">
          <h1 className="hero-title">{title}</h1>
          {subtitle && <p className="hero-subtitle">{subtitle}</p>}
          {children && <div className="hero-actions">{children}</div>}
        </div>
      </div>
    </section>
  );
};

export default Hero;