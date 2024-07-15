import getArticles from ".";
import * as sendHttpRequestModule from "../../utils/sendHttpRequest";

// Mock the entire sendHttpRequest module
jest.mock("../../utils/sendHttpRequest");

describe("getArticles", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetches and transforms articles correctly", async () => {
    const mockApiResponse = {
      data: {
        results: [
          {
            uri: "nyt://article/1234",
            byline: "By John Doe",
            title: "Test Article",
            url: "https://example.com/article",
            media: [
              {
                "media-metadata": [
                  {
                    format: "mediumThreeByTwo440",
                    url: "https://example.com/image.jpg",
                  },
                ],
              },
            ],
            published_date: "2023-07-14",
            abstract: "This is a test article",
          },
        ],
      },
    };

    // Mock the implementation of sendHttpRequest
    jest
      .spyOn(sendHttpRequestModule, "sendHttpRequest")
      .mockResolvedValue(mockApiResponse);

    const articles = await getArticles();

    expect(sendHttpRequestModule.sendHttpRequest).toHaveBeenCalledWith(
      expect.stringContaining(
        "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?"
      )
    );
    expect(articles).toHaveLength(1);
    expect(articles[0]).toEqual({
      id: '_id:"nyt://article/1234"',
      apiSource: "nyt_api",
      author: "John Doe",
      title: "Test Article",
      url: "https://example.com/article",
      image: "https://example.com/image.jpg",
      publishedAt: "2023-07-14",
      source: "New York Times",
      description: "This is a test article",
    });
  });

  test("handles missing image correctly", async () => {
    const mockApiResponse = {
      data: {
        results: [
          {
            uri: "nyt://article/5678",
            byline: "By Jane Smith",
            title: "No Image Article",
            url: "https://example.com/no-image",
            media: [],
            published_date: "2023-07-15",
            abstract: "This article has no image",
          },
        ],
      },
    };

    jest
      .spyOn(sendHttpRequestModule, "sendHttpRequest")
      .mockResolvedValue(mockApiResponse);

    const articles = await getArticles();

    expect(articles).toHaveLength(1);
    expect(articles[0].image).toBe("");
  });

  test("handles API error", async () => {
    jest
      .spyOn(sendHttpRequestModule, "sendHttpRequest")
      .mockRejectedValue(new Error("API Error"));

    await expect(getArticles()).rejects.toThrow("API Error");
  });

  test("handles empty results from API", async () => {
    const mockApiResponse = {
      data: {
        results: [],
      },
    };

    jest
      .spyOn(sendHttpRequestModule, "sendHttpRequest")
      .mockResolvedValue(mockApiResponse);

    const articles = await getArticles();

    expect(articles).toHaveLength(0);
  });
});
