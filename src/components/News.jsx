import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/themecontext";

export default function News() {
  const { category } = useContext(ThemeContext);
  const [articles, setArticles] = useState([]);

  const apiKey= import.meta.env.VITE_NEWS_API_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=${category}&language=en&sortBy=publishedAt&apiKey=${apiKey}`
        );
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };

    fetchNews();
  }, [category]);

  //Add this return here
  return (
    <div className="container mt-4">
  <h3 className="text-capitalize mb-3">{category} News</h3>

  {articles.length > 0 ? (
    <>
      {/* 🟩 TOP SECTION (1 big + 4 small) */}
      <div className="row">
        {/* BIG NEWS (LEFT SIDE) */}
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm">
            {articles[0]?.urlToImage && (
              <img
                src={articles[0].urlToImage}
                className="card-img-top"
                alt="news"
              />
            )}
            <div className="card-body">
              <h4 className="card-title fw-bold">{articles[0]?.title}</h4>
              <p className="card-text">{articles[0]?.description}</p>
              <a
                href={articles[0]?.url}
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Read More
              </a>
            </div>
          </div>
        </div>

        {/* 4 SMALL NEWS (RIGHT SIDE) */}
        <div className="col-md-6">
          <div className="row">
            {articles.slice(1, 5).map((news, index) => (
              <div className="col-md-6 mb-4" key={index}>
                <div className="card h-100 shadow-sm">
                  {news.urlToImage && (
                    <img
                      src={news.urlToImage}
                      className="card-img-top"
                      alt="news"
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                  )}
                  <div className="card-body p-2">
                    <h6 className="card-title">{news.title}</h6>
                    <a
                      href={news.url}
                      className="btn btn-sm btn-outline-primary"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Read
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🟦 REMAINING NEWS BELOW */}
      <div className="row mt-3">
        {articles.slice(5).map((news, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100 shadow-sm">
              {news.urlToImage && (
                <img
                   src={
    news.urlToImage
      ? news.urlToImage
      : "https://media.istockphoto.com/id/2163263093/photo/tv-news-global-background-3d-graphics.jpg?s=612x612&w=0&k=20&c=4fPYHE7ZUaRCfu8nATXpylVMrc0EwmwkNbNzf71d9sQ="
  }
                  className="card-img-top"
                  alt="news"
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{news.title}</h5>
                <a
                  href={news.url}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <p>Loading news...</p>
  )}
</div>

  );
}



  
 