// src/pages/Home.jsx
import BlogList from "../components/BlogList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-red-600 underline mb-6">
        Welcome to My Personal Blog
      </h1>
      <BlogList />
    </main>
  );
}
