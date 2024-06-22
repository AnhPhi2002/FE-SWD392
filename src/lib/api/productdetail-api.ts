import { axiosClient } from './config/axios-client';

// Hàm để lấy chi tiết sản phẩm
    export function getProductDetail(product_id: number) {
        return axiosClient.get(`http://localhost:5000/api/products/${product_id}`);
    }

// Hàm để gửi đánh giá mới
export function review(values: {
    product_id: number;
    rating: number;
    comment: string;
}) {
    return axiosClient.post('http://localhost:5000/api/reviews', values);
}

// Hàm để lấy danh sách đánh giá theo product_id
export function getReviews(product_id: number) {
    return axiosClient.get(`http://localhost:5000/api/reviews/${product_id}`);
}
