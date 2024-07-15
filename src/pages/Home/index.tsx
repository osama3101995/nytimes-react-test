import React, { useEffect, useState } from "react";
import "./styles.scss";
import getArticles from "../../services/getTopArticles";
import { Article } from "../../models/Article";
import List from "../../components/List";

const Home = () => {
  const [newsItems, setNewsItems] = useState<Article[]>([]);
  let [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const setNewsList = async () => {
      setLoading(true);
      const articles = await getArticles();

      if (articles.length !== 0) {
        setNewsItems(articles);
      }

      setLoading(false);
    };

    setNewsList();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }
  if (newsItems.length === 0) {
    return (
      <div className="too-many-requests">
        <h1>Too Many Requests were sent!</h1>
        <p>Please try again in a minute!</p>
      </div>
    );
  }

  return (
    <section className="home">
      <div className="top-section">
        <h1 data-testid="Hello">Hello!</h1>
      </div>
      <div className="news-section">
        <section className="newsItems">
          <List newsItems={newsItems} />
        </section>
      </div>
    </section>
  );
};

export default Home;
