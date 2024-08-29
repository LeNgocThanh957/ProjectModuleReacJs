import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi lấy thông tin sản phẩm:', error);
            });
    }, [id]);

    if (!product) return <div>Đang tải...</div>;

    return (
        <div>
            <h3>Chi tiết sản phẩm</h3>
            <h1>Tên sản phẩm: {product.title}</h1>
            <h3>Mô tả: {product.description}</h3>
            <h3>Giá: {product.price}</h3>
            <Link to={`/`}>
                <button style={{
                    width: "60px",
                    height: "30px",
                    backgroundColor: "blue",
                    border: "none",
                    color: "white",
                    marginRight: "2px",
                    borderRadius: "3px"
                }}>Trở lại
                </button>
            </Link> {' '}
        </div>
    );
};

export default ProductDetail;
