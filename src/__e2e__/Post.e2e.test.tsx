import puppeteer, { Browser, Page } from "puppeteer";

describe("Home Page E2E", () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false, // Change to true for headless mode in CI/CD
      slowMo: 0, // Adjust as needed
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
        "--window-size=1920,1080",
      ],
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("loads and displays article", async () => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector('h1[data-testid="Hello"]', { timeout: 5000 });

    // Check if news items are loaded
    const newsItems = await page.$$(
      ".news-list-wrapper .news-list-item-wrapper"
    );
    expect(newsItems.length).toBeGreaterThan(0);
    // Click the Explore button in the first news item
    const firstNewsItem = newsItems[0];
    const exploreButton = await firstNewsItem.$("a"); // Adjust the selector if necessary
    await exploreButton?.click();

    await page.waitForNetworkIdle();
    // Delay execution of the following code block by 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const title = await page.$eval("h1", (el) => el.textContent);
    expect(title).not.toBe("Loading...");
    expect(title).not.toBe("Too Many Requests were sent!");

    const author = await page.$eval(".author", (el) => el.textContent);
    expect(author).toContain("By");

    const description = await page.$eval("p", (el) => el.textContent);
    expect(description).not.toBe("");

    const image = await page.$eval("img", (el) => el.src);
    expect(image).toContain("http");
  }, 30000);
});
