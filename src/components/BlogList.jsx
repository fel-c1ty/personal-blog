import { useEffect, useState } from "react";
import client from "../contentful";

export default function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client.getEntries({ 
      content_type: "personalBlog",
      include: 2
    })
      .then((response) => {
        setPosts(response.items);
        console.log("First post full data:", response.items[0]);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      {/* Blog Posts Grid */}
      <section className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {posts.map((post) => {
          let imageUrl = null;
          
          if (post?.fields?.images && Array.isArray(post.fields.images) && post.fields.images.length > 0) {
            imageUrl = post.fields.images[0]?.fields?.file?.url;
          } else if (post?.fields?.image?.fields?.file?.url) {
            imageUrl = post.fields.image.fields.file.url;
          }

          if (imageUrl && !imageUrl.startsWith("http")) {
            imageUrl = "https:" + imageUrl;
          }

          return (
            <article
              key={post.sys.id}
              className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1 sm:hover:-translate-y-2 border border-gray-100"
            >
              {/* Image Container - Responsive height */}
              <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
                {imageUrl ? (
                  <div className="relative h-full w-full">
                    <img
                      src={imageUrl}
                      alt={post.fields.title || "Blog post image"}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-2 sm:mb-3 md:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium">No Image Available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Content Section - Responsive padding */}
              <div className="p-4 sm:p-6 md:p-8">
                {/* Title */}
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 leading-tight group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                  {post.fields.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5 md:mb-6 line-clamp-2 sm:line-clamp-3">
                  {post.fields.content?.content?.[0]?.content?.[0]?.value?.slice(0, 100) || "Read this amazing post..."}
                  {post.fields.content?.content?.[0]?.content?.[0]?.value?.length > 100 ? "..." : ""}
                </p>

                {/* Read More Button - Stack on mobile */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                  <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm transition-all duration-300 group-hover:translate-x-1 hover:bg-blue-50 px-3 py-1.5 rounded-lg -ml-3">
                    Read More
                    <svg className="w-4 h-4 ml-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  {/* Date */}
                  <span className="text-xs text-gray-400 font-medium">
                    {post.fields.publishedDate ? 
                      new Date(post.fields.publishedDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      }) : 
                      'Recent'
                    }
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="text-center py-12 sm:py-16 px-4">
          <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-gray-300 mx-auto mb-4 sm:mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-400 mb-2">No posts yet</h3>
          <p className="text-sm sm:text-base text-gray-500">Check back soon for new content!</p>
        </div>
      )}
    </>
  );
}