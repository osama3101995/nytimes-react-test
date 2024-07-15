import { Article } from "../../models/Article";
import { sendHttpRequest } from "../../utils/sendHttpRequest";

const getNYTAPIData = async () => {
  const base_URL = "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?";
  const apiKey = `api-key=${process.env.REACT_APP_NEW_YORK_TIMES_KEY}`;

  return sendHttpRequest(base_URL + apiKey).then(
    (response) => response.data.results
  );
};

const getImage = (item: any) => {
  const imageURL: any = item.media[0];
  const imageMetaMedia: string = imageURL
    ? imageURL["media-metadata"].find(
        (x: any) => x.format === "mediumThreeByTwo440"
      ).url
    : "";
  return imageMetaMedia;
};

const getArticles = async () => {
  const nYTAPIData = await getNYTAPIData();
  const newsData: Article[] = [];

  for (let item of nYTAPIData) {
    const modifiedRes: Article = {
      id: `_id:"${item.uri}"`,
      apiSource: "nyt_api",
      author: item.byline.replace("By ", "") ?? "Not Determined",
      title: item.title,
      url: item.url,
      image: getImage(item),
      publishedAt: item.published_date,
      source: "New York Times",
      description: item.abstract,
    };
    newsData.push(modifiedRes);
  }

  return newsData;
};

export default getArticles;
