import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Post from "./pages/Post";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<Post />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
