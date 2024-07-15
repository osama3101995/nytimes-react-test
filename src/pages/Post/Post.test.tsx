import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Post from ".";
import * as getArticleModule from "../../services/getArticle";
import { Article } from "../../models/Article";

jest.mock("../../services/getArticle");

const mockArticle: Article = {
  id: "1",
  apiSource: "nyt_api",
  author: "John Doe",
  title: "Test Article",
  url: "https://example.com",
  image: "https://example.com/image.jpg",
  publishedAt: "2023-07-14T12:00:00Z",
  source: "New York Times",
  description: "Test description",
};

describe("Post Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state initially", async () => {
    (getArticleModule.default as jest.Mock).mockReturnValue(
      Promise.resolve(null)
    );
    render(
      <MemoryRouter initialEntries={["/post/1"]}>
        <Routes>
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeTruthy();
  });

  test("renders article when API call is successful", async () => {
    (getArticleModule.default as jest.Mock).mockResolvedValue(mockArticle);

    render(
      <MemoryRouter initialEntries={["/post/1"]}>
        <Routes>
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Test Article")).toBeTruthy();
    });
    expect(screen.getByText("By John Doe")).toBeTruthy();
    expect(screen.getByText("Test description")).toBeTruthy();
  });

  test("renders error message when API call fails", async () => {
    (getArticleModule.default as jest.Mock).mockResolvedValue(null);

    render(
      <MemoryRouter initialEntries={["/post/1"]}>
        <Routes>
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Too Many Requests were sent!")).toBeTruthy();
    });
  });
});
