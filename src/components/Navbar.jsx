import { useContext, useRef, useState, useEffect } from "react";

import { ThemeContext } from "../context/themecontext";
import { FaArrowLeft, FaArrowRight, FaSun, FaMoon } from "react-icons/fa";

export default function Navbar() {
  const { darkMode, setDarkMode, setCategory } = useContext(ThemeContext);
  const scrollRef = useRef(null);


  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);


  const categories = [
    "general",
    "technology",
    "sports",
    "health",
    "business",
    "entertainment",
    "science",
    "world",
    "travel",
    "food",
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  

  
  // check scroll position and update arrow visibility
  const checkScroll = () => {
    const div = scrollRef.current;
    if (!div) return;

    const { scrollLeft, scrollWidth, clientWidth } = div;

    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  // run every time we scroll
  useEffect(() => {
    const div = scrollRef.current;
    if (!div) return;
    div.addEventListener("scroll", checkScroll);
    checkScroll(); // initial check
    return () => div.removeEventListener("scroll", checkScroll);
  }, []);

  

  return (
    <nav
      className={`navbar navbar-expand-lg shadow-sm ${
        darkMode ? "bg-dark navbar-dark" : "bg-light navbar-light"
      }`}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Brand */}
        <a className="navbar-brand fw-bold fs-4" href="#">
          📰 NewsApp
        </a>

        {/* Scrollable Categories */}
        <div className="d-flex align-items-center">
          {showLeft&&(<button
            className="btn btn-outline-secondary rounded-circle"
            onClick={() => scroll("left")}
          >
            <FaArrowLeft />
          </button>)}

          <div
            ref={scrollRef}
            className="category-scroll"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                className="btn btn-link text-capitalize fw-semibold category-btn"
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {showRight && (<button
            className="btn btn-outline-secondary rounded-circle"
            onClick={() => scroll("right")}
          >
            <FaArrowRight />
          </button>)}
        </div>

        {/* Dark Mode Toggle */}
        <button
          className="btn btn-outline-secondary rounded-pill d-flex align-items-center gap-2"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>
    </nav>
  );
}

