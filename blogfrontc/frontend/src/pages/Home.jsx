import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Common/Navbar";
import { Facebook, Instagram, Twitter } from "lucide-react";
import "./Home.css";

const slideImages = [
  {
    url: "https://images.pexels.com/photos/1114425/pexels-photo-1114425.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "CHBlog",
    subtitle: "Share Your Stories",
    description: "A platform for writers and readers to connect through meaningful content and engaging stories.",
  },
  {
    url: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "Dashboard",
    subtitle: "Manage Your Content",
    description: "Access your personal dashboard to create, edit, and manage your blog posts with ease.",
  },
  {
    url: "https://images.pexels.com/photos/340152/pexels-photo-340152.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "Connect With People",
    subtitle: "Engage & Grow",
    description: "Engage with readers, get feedback, and grow your audience through our interactive platform.",
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (slideImages.length === 0) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slideImages.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentImage = slideImages.length > 0 ? slideImages[currentSlide] : {
    url: "https://via.placeholder.com/1600x900?text=No+Slides+Available",
    title: "CHBlog",
    subtitle: "Stay Tuned",
    description: "Content will be available soon.",
  };

  return (
    <div className="home-container">
      <Navbar />

      <div className="hero">
        <div
          className={`hero__background ${
            isTransitioning ? "hero__background--transitioning" : ""
          }`}
          style={{ backgroundImage: `url(${currentImage.url})` }}
        />
        <div className="hero__overlay"></div>

        <div className="hero__social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Twitter size={20} />
          </a>
        </div>

        <div className="hero__content">
          <h1 className="hero__title">{currentImage.title}</h1>
          <h2 className="hero__subtitle">{currentImage.subtitle}</h2>

          <div className="hero__description">
            <p>{currentImage.description}</p>
          </div>

          <Link to="/blog" className="btn btn-primary">
            Read More →
          </Link>
        </div>

        {slideImages.length > 0 && (
          <div className="hero__indicators">
            {slideImages.map((_, index) => (
              <button
                key={index}
                className={`indicator ${
                  currentSlide === index ? "indicator--active" : ""
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              >
                <img
                  src={slideImages[index].url}
                  alt={slideImages[index].title}
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;