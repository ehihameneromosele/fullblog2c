import { Link } from "react-router-dom";
import {
  Cpu, Film, Plane, Users, Landmark, Dumbbell, BookOpen
} from "lucide-react";
import "./Categories.css";
import { useState, useEffect } from "react";
import { getCategories } from "../../api/blog";
import AOS from "aos";
import "aos/dist/aos.css";

const Categories = ({ categories: propCategories = [] }) => {
  const [categories, setCategories] = useState(propCategories);
  const [loading, setLoading] = useState(!propCategories.length);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });

    // Only fetch if parent did not provide categories
    if (!propCategories.length) {
      const fetchCategories = async () => {
        try {
          const data = await getCategories();
          console.log("Categories data:", data);
          setCategories(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchCategories();
    } else {
      setLoading(false);
    }
  }, [propCategories]);

  const getCategoryData = (categoryName) => {
    const name = categoryName.toLowerCase();
    const categoryMap = {
      technology: { icon: <Cpu size={32} />, description: "Latest trends in gadgets, AI, and innovation." },
      tech: { icon: <Cpu size={32} />, description: "Technology and innovation updates." },
      entertainment: { icon: <Film size={32} />, description: "Movies, music, and everything fun." },
      travel: { icon: <Plane size={32} />, description: "Guides and tips from around the world." },
      social: { icon: <Users size={32} />, description: "Culture, lifestyle, and social insights." },
      politics: { icon: <Landmark size={32} />, description: "Updates on governance and world affairs." },
      sports: { icon: <Dumbbell size={32} />, description: "Games, fitness, and sporting highlights." },
      default: { icon: <BookOpen size={32} />, description: "Explore articles in this category." }
    };
    return categoryMap[name] || categoryMap.default;
  };

  if (loading) {
    return (
      <section className="categories-section">
        <h2 className="section-title">Categories</h2>
        <p className="loading">Loading categories...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="categories-section">
        <h2 className="section-title">Categories</h2>
        <p className="error">Error: {error}</p>
      </section>
    );
  }

  if (!categories.length) {
    return (
      <section className="categories-section">
        <h2 className="section-title">Categories</h2>
        <p className="no-data">No categories available.</p>
      </section>
    );
  }

  return (
    <section className="categories-section">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
            Explore Our Content Categories
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Categories
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Discover stories from every corner of life. From technology and travel to culture and sports —
            explore the topics that inspire, inform, and entertain.
          </p>
        </div>

        {/* Categories grid */}
        <div className="categories-list">
          {categories.map((category, index) => {
            const title = category.title || category.name || "Untitled";
            const data = getCategoryData(title);
            const aosDelay = (index * 100).toString(); // Stagger animations

            return (
              <Link
                key={category.id}
                to={`/categories/${category.id}`}
                className="category-item"
                data-aos="fade-up"
                data-aos-delay={aosDelay}
              >
                <div className="category-icon" data-aos="zoom-in" data-aos-delay={(index * 100 + 200).toString()}>
                  {data.icon}
                </div>
                <span className="category-title">{title}</span>
                <p className="category-desc">{data.description}</p>
                <div className="category-hover-effect"></div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;