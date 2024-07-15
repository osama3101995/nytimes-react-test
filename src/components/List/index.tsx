import React, { useState } from "react";
import "./styles.scss";
import Button from "../Button";
import { Article } from "../../models/Article";
import publishedAtTime from "../../utils/publishedAtTime";

const NewsItemRow = ({ newsItem }: { newsItem: Article }) => {
  const { author, description, source, title, id, image } = newsItem;

  return (
    <div className="news-list-item-wrapper">
      <div className="news-list-item">
        <div className="left-cont">
          <img src={image} alt={title} width={100} height={100}></img>
        </div>
        <div className="right-cont">
          <div className="main-text-section">
            <h3>{title}</h3>
            <p>{description}</p>
            <article>Source: {source}</article>
            <article>
              Published Date: {publishedAtTime(newsItem.publishedAt)}
            </article>
            <article>Author: {author}</article>
          </div>
          <Button behavior={"link"} to={"post/" + encodeURIComponent(id)}>
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
};

const List = ({ newsItems }: { newsItems: Article[] }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastNewsItem = currentPage * itemsPerPage;
  const indexOfFirstNewsItem = indexOfLastNewsItem - itemsPerPage;
  const currentNewsItems = newsItems.slice(
    indexOfFirstNewsItem,
    indexOfLastNewsItem
  );

  const totalPages = Math.ceil(newsItems.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="news-list-page">
      <div className="news-list-wrapper">
        {currentNewsItems.map((newsItem) => {
          return <NewsItemRow key={newsItem.id} newsItem={newsItem} />;
        })}

        <div className="news-list-pagination-button">
          <Button
            behavior="button"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
          <Button
            behavior="button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
};

export default List;
