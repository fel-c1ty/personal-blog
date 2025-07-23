import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import BlogList from './components/BlogList';
import NotFound from "./pages/NotFound";


function App() {
  const personalBlogRouter = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: '/blog', element: <BlogList /> },
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <>
      <RouterProvider router={personalBlogRouter} />
    </>
  );
}

export default App;
