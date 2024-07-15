import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as getArticlesModule from "../../services/getTopArticles";
import Home from ".";
import { Article } from "../../models/Article";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("../../services/getTopArticles");

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getArticlesModule.default as jest.Mock).mockResolvedValue([]);
  });

  test("renders loading state initially", async () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    expect(screen.getByText("Loading...")).toBeTruthy();
  });

  test("renders news items when API call is successful", async () => {
    const mockArticles: Article[] = [
      {
        id: "1",
        apiSource: "nyt_api",
        author: "John Doe",
        title: "Test Article",
        url: "https://example.com/article",
        image: "https://example.com/image.jpg",
        publishedAt: "2023-07-14",
        source: "New York Times",
        description: "Test Description",
      },
    ];

    (getArticlesModule.default as jest.Mock).mockResolvedValue(mockArticles);
    render(
      <Router>
        <Home />
      </Router>
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });

    expect(screen.getByText("Hello!")).toBeTruthy();
    expect(screen.getByText("Test Article")).toBeTruthy();
  });

  test("renders empty state when no articles are returned", async () => {
    (getArticlesModule.default as jest.Mock).mockResolvedValue([]);
    render(
      <Router>
        <Home />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("Too Many Requests were sent!")).toBeTruthy();
    });

    expect(screen.queryByText("Loading...")).toBeNull();
    expect(screen.getByText("Please try again in a minute!")).toBeTruthy();
  });
});
