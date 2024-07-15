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

  test("loads and displays news items", async () => {
    await page.goto("http://localhost:3000");

    // Wait for the content to load
    await page.waitForSelector('h1[data-testid="Hello"]', { timeout: 5000 });

    // Check if "Hello!" is present
    const hello = await page.$eval(
      'h1[data-testid="Hello"]',
      (el) => el.textContent
    );
    expect(hello).toBe("Hello!");

    // Check if news items are loaded
    const newsItems = await page.$$(
      ".news-list-wrapper .news-list-item-wrapper"
    );
    expect(newsItems.length).toBeGreaterThan(0);

    // Check if each news item has an h3 element at any level
    for (let item of newsItems) {
      const h3Exists = await page.evaluate((item) => {
        return item.querySelector("h3") !== null;
      }, item);
      expect(h3Exists).toBe(true);
    }
  }, 30000);
});
