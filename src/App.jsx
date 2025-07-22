import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";


function App() {
  const personalBlogRouter = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <>
      <RouterProvider router={personalBlogRouter} />
    </>
  );
}

export default App;
