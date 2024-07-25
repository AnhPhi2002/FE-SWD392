import Breadcrumb from "./components/Breadcrumb";
import Product from "./components/Product";
import Tabs from "./components/Tabs";
import Similar from "./components/Similar";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [reviewCount, setReviewCount] = useState<number>(0);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        const productData = response.data;
        setCategoryId(productData.category_id);  // Giả sử API trả về category_id

        // Fetch reviews to calculate average rating and review count
        const reviewsResponse = await axios.get(`http://localhost:5000/api/reviews/product/${productId}`);
        const reviews = reviewsResponse.data;
        const totalRating = reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
        const avgRating = reviews.length > 0 ? totalRating / reviews.length : 0;
        setAverageRating(avgRating);
        setReviewCount(reviews.length);
      } catch (error) {
        console.error('Lỗi khi tải thông tin sản phẩm:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const updateRatingAndReviews = async () => {
    try {
      const reviewsResponse = await axios.get(`http://localhost:5000/api/reviews/product/${productId}`);
      const reviews = reviewsResponse.data;
      const totalRating = reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
      const avgRating = reviews.length > 0 ? totalRating / reviews.length : 0;
      setAverageRating(avgRating);
      setReviewCount(reviews.length);
    } catch (error) {
      console.error('Lỗi khi cập nhật đánh giá và nhận xét:', error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  return (
    <>
      <section className="pl-40 pr-40 bg-gray-100">
        <Product productId={Number(productId)} averageRating={averageRating} reviewCount={reviewCount} updateRatingAndReviews={updateRatingAndReviews} />
      </section>
      <section className="pl-40 pr-40 h-[600px] relative">
        <Tabs productId={Number(productId)} updateRatingAndReviews={updateRatingAndReviews} />
      </section>
      {categoryId && (
        <section className="pl-40 pr-40 bg-gray-100">
          <Similar categoryId={categoryId} />
        </section>
      )}
    </>
  );
}
