import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getArticle from "../../services/getArticle";
import { Article } from "../../models/Article";
import "./styles.scss";
import publishedAtTime from "../../utils/publishedAtTime";

const Post = () => {
  let params = useParams();
  let [article, setArticle] = useState<Article | null>(null);
  let [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const setNewsList = async () => {
      if (params.id) {
        setLoading(true);
        const selectedArticle = await getArticle(params.id);

        if (selectedArticle) {
          setArticle(selectedArticle);
        }

        setLoading(false);
      }
    };

    setNewsList();
  }, [params.id]);

  if (!params.id) {
    return <></>;
  }

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="too-many-requests">
        <h1>Too Many Requests were sent!</h1>
        <p>Please try again in a minute!</p>
      </div>
    );
  }

  return (
    <div className="main">
      <h1>{article?.title}</h1>
      <img alt={article?.title} src={article?.image} />
      <div className="byline">
        <address className="author">By {article?.author}</address>
        on{" "}
        <time dateTime={article?.publishedAt} title={article?.publishedAt}>
          {article?.publishedAt && publishedAtTime(article?.publishedAt)}
        </time>
        <p>{article?.description}</p>
        <p>
          Get Full Article at: <a href={article?.url}>{article?.url}</a>
        </p>
      </div>
    </div>
  );
};

export default Post;
