// PostBlog.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Blog {
  article_id: number;
  title: string;
  content: string;
  author: string;
  image_url: string[];
  createdAt: string;
  updatedAt: string;
}

const PostBlog: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(2); // số bài viết mỗi trang

  useEffect(() => {
    axios.get("http://localhost:5000/api/articles/")
      .then(response => {
        setBlogs(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the articles!", error);
      });
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu trang
    }
  };

  return (
    <section className="gauto-blog-page-area section_70 py-10">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full lg:w-2/3 md:w-7/12">
            <div className="blog-page-left">
              {currentBlogs.map(blog => (
                <div key={blog.article_id} className="single-blog mb-8">
                  <div className="blog-image mb-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', borderRadius: '10px', height: '300px' }}>
                    <Link to={`/blog-detail/${blog.article_id}`} style={{ width: '100%', height: '100%' }}>
                      <img src={blog.image_url[0]} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Link>
                  </div>
                  <div className="blog-text p-4 bg-white rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-2">
                      <Link to={`/blog-detail/${blog.article_id}`}>{blog.title}</Link>
                    </h3>
                    <ul className="flex space-x-4 text-gray-600 mb-4">
                      <li>
                        <span>By {blog.author}</span>
                      </li>
                      <li>
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </li>
                    </ul>
                    <p className="text-gray-700 mb-4">
                      {blog.content.substring(0, 100)}...
                    </p>
                    <Link to={`/blog-detail/${blog.article_id}`} className="text-indigo-600 hover:text-indigo-800">
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
              <div className="pagination-box-row mt-8 text-center">
                <PaginationDemo paginate={paginate} totalPages={totalPages} currentPage={currentPage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface PaginationDemoProps {
  paginate: (pageNumber: number) => void;
  totalPages: number;
  currentPage: number;
}

const PaginationDemo: React.FC<PaginationDemoProps> = ({ paginate, totalPages, currentPage }) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => paginate(currentPage - 1)} 
            style={{ pointerEvents: currentPage === 1 ? 'none' : 'auto', opacity: currentPage === 1 ? 0.5 : 1 }}
          />
        </PaginationItem>
        {[...Array(totalPages)].map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink onClick={() => paginate(i + 1)} isActive={currentPage === i + 1}>
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext 
            onClick={() => paginate(currentPage + 1)} 
            style={{ pointerEvents: currentPage === totalPages ? 'none' : 'auto', opacity: currentPage === totalPages ? 0.5 : 1 }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PostBlog;
