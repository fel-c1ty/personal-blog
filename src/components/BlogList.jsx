import { useEffect, useState } from "react";
import client from "../contentful";

export default function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
  client.getEntries({ content_type: "personalBlog" })
    .then((response) => {
      setPosts(response.items);
      console.log("First post full data:", response.items[0]); // 👈 Add this line
    })
    .catch(console.error);
}, []);


  return (
    <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => {
        const imageUrl = post?.fields?.image?.fields?.file?.url;

        return (
          <div
            key={post.sys.id}
            className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition-all"
          >
            {imageUrl ? (
              <img
                src={`https:${imageUrl}`}
                alt={post.fields.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-sm text-gray-500">
                No Image Available
              </div>
            )}

            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {post.fields.title}
            </h2>

            <p className="text-gray-600 text-sm">
              {post.fields.content?.content?.[0]?.content?.[0]?.value?.slice(0, 100)}...
            </p>
          </div>
        );
      })}
    </section>
  );
}
