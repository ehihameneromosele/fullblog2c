import './Footer.css';
import { 
  Home, 
  BookOpen, 
  LogIn, 
  UserPlus, 
  Mail, 
  Phone, 
  Facebook, 
  Twitter, 
  Instagram,
  Heart,
  Send,
  ChevronRight
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <h3>BlogApp</h3>
          </div>
          <p>Bringing you the latest insights and stories from around the world.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram size={18} />
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li>
              <ChevronRight size={14} />
              <a href="/">Home</a>
            </li>
            <li>
              <ChevronRight size={14} />
              <a href="/blog">Blog</a>
            </li>
            <li>
              <ChevronRight size={14} />
              <a href="/categories">Categories</a>
            </li>
            <li>
              <ChevronRight size={14} />
              <a href="/about">About</a>
            </li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Account</h3>
          <ul className="footer-links">
            <li>
              <ChevronRight size={14} />
              <a href="/login">Login</a>
            </li>
            <li>
              <ChevronRight size={14} />
              <a href="/register">Register</a>
            </li>
            <li>
              <ChevronRight size={14} />
              <a href="/profile">Profile</a>
            </li>
            <li>
              <ChevronRight size={14} />
              <a href="/create">Create Post</a>
            </li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact</h3>
          <div className="contact-info">
            <p>
              <Mail size={16} />
              info@blogapp.com
            </p>
            <p>
              <Phone size={16} />
              (123) 456-7890
            </p>
          </div>
          <div className="newsletter">
            <p>Subscribe to our newsletter</p>
            <div className="newsletter-input">
              <input type="email" placeholder="Your email" />
              <button>
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>
          Made with <Heart size={14} fill="currentColor" /> &copy; {new Date().getFullYear()} BlogApp. All rights reserved.
        </p>
        <div className="legal-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;