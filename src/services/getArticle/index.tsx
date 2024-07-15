import { Article } from "../../models/Article";
import { sendHttpRequest } from "../../utils/sendHttpRequest";

const getNYTAPIData = async (searchId: string) => {
  const base_URL =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=";
  const apiKey = `&api-key=${process.env.REACT_APP_NEW_YORK_TIMES_KEY}`;

  return sendHttpRequest(base_URL + encodeURIComponent(searchId) + apiKey).then(
    (response) => response?.data?.response?.docs[0]
  );
};

const getArticle = async (searchId: string) => {
  const item = await getNYTAPIData(searchId);

  if (typeof item === "undefined") {
    return null;
  }

  const modifiedRes: Article = {
    id: item.uri,
    apiSource: "nyt_api",
    author: item.byline.original?.replace("By ", "") ?? "Not Determined",
    title: item.headline.main,
    url: item.web_url,
    image: "https://www.nytimes.com/" + item.multimedia[0]?.url ?? null,
    publishedAt: item.pub_date,
    source: "New York Times",
    description: item.lead_paragraph,
  };

  return modifiedRes;
};

export default getArticle;
