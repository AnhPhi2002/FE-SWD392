// PostDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface Blog {
  article_id: number;
  title: string;
  content: string;
  author: string;
  image_url: string[];
  createdAt: string;
  updatedAt: string;
}

const PostDetail: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/articles/${blogId}`)
      .then(response => {
        setBlog(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the article!", error);
      });

    axios.get("http://localhost:5000/api/articles/")
      .then(response => {
        const allBlogs = response.data;
        const filteredBlogs = allBlogs.filter((b: Blog) => b.article_id !== Number(blogId));
        setRelatedBlogs(filteredBlogs.sort(() => 0.5 - Math.random()).slice(0, 3));
      })
      .catch(error => {
        console.error("There was an error fetching the articles!", error);
      });
  }, [blogId]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wrapper-content flex flex-col min-h-screen">
      <main className="post-detail">
        <div className="spacing py-4 md:py-8"></div>
        <div className="post-detail__head">
          <div className="tcl-container mx-auto max-w-screen-xl px-4 md:px-8">
            <h1 className="post-detail__title text-3xl md:text-5xl font-black text-gray-800 mb-4">
              {blog.title}
            </h1>
            <ul className="post-detail__info list-none p-0 m-0 flex items-center">
              <li className="item author inline-block mr-2">
                By <span className="text-gray-600"><strong>{blog.author}</strong></span>
              </li>
              <li className="item date inline-block mx-2">{new Date(blog.createdAt).toLocaleDateString()}</li>
            </ul>
          </div>
        </div>
        <div className="spacing py-4 md:py-8"></div>
        <div className="post-detail__fluid">
          <div className="tcl-container mx-auto max-w-screen-xl px-4 md:px-8">
            <div className="post-detail__wrapper flex flex-col lg:flex-row">
              <div className="post-detail__content bg-white shadow-lg rounded-lg flex-1 min-h-50vh">
                <div className="thumbnail">
                  <img src={blog.image_url[0]} alt={blog.title} className="w-full h-auto max-w-md mx-auto rounded-t-lg" />
                </div>
                <div className="content-padding p-4 md:p-8">
                  <div className="rte text-lg">
                    <p className="mb-8">{blog.content}</p>
                  </div>
                </div>
              </div>
              <div className="post-detail__side lg:w-1/3 lg:pl-16 hidden lg:block">
                <div className="spacing py-4 md:py-8"></div>
                <div className="related-post">
                  <h2 className="related-post__head text-xl font-bold text-gray-600 text-center mb-4">Related Posts</h2>
                  {relatedBlogs.map(relatedBlog => (
                    <article key={relatedBlog.article_id} className="related-post__card p-4 bg-white border-l-4 border-indigo-200 shadow rounded-lg mb-4">
                      <Link to={`/blog-detail/${relatedBlog.article_id}`} className="related-post__title block text-gray-800 font-bold mb-2">{relatedBlog.title}</Link>
                      <div className="related-post__info flex justify-between">
                        <span className="related-post__author text-gray-600 font-semibold">{relatedBlog.author}</span>
                        <p className="related-post__date text-gray-600 text-sm flex items-center">
                          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"></path>
                          </svg>
                          {new Date(relatedBlog.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="spacing py-4 md:py-8"></div>
      </main>
    </div>
  );
};

export default PostDetail;
