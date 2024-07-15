import getArticle from ".";
import * as sendHttpRequestModule from "../../utils/sendHttpRequest";

jest.mock("../../utils/sendHttpRequest");

describe("getArticle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetches and transforms article correctly", async () => {
    const mockApiResponse = {
      data: {
        response: {
          docs: [
            {
              uri: "nyt://article/1234",
              byline: { original: "By John Doe" },
              headline: { main: "Test Article" },
              web_url: "https://example.com",
              multimedia: [{ url: "image.jpg" }],
              pub_date: "2023-07-14T12:00:00Z",
              lead_paragraph: "Test description",
            },
          ],
        },
      },
    };

    (sendHttpRequestModule.sendHttpRequest as jest.Mock).mockResolvedValue(
      mockApiResponse
    );

    const article = await getArticle("1234");

    expect(sendHttpRequestModule.sendHttpRequest).toHaveBeenCalledWith(
      expect.stringContaining(
        "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq="
      )
    );
    expect(article).toEqual({
      id: "nyt://article/1234",
      apiSource: "nyt_api",
      author: "John Doe",
      title: "Test Article",
      url: "https://example.com",
      image: "https://www.nytimes.com/image.jpg",
      publishedAt: "2023-07-14T12:00:00Z",
      source: "New York Times",
      description: "Test description",
    });
  });

  test("returns null when API response is undefined", async () => {
    (sendHttpRequestModule.sendHttpRequest as jest.Mock).mockResolvedValue(
      undefined
    );

    const article = await getArticle("1234");

    expect(article).toBeNull();
  });
});
