import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './ListProduct.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi lấy danh sách sản phẩm:', error);
            });
    }, []);

    const handleDeleteClick = (productId) => {
        setSelectedProductId(productId);
        setShowDeletePopup(true);
    };

    const handleDeleteConfirm = () => {
        axios.delete(`http://localhost:3000/products/${selectedProductId}`)
            .then(response => {
                setProducts(products.filter(product => product.id !== selectedProductId));
                setShowDeletePopup(false);
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi xoá sản phẩm:', error);
            });
    };
    const handleDeleteCancel = () => {
        setShowDeletePopup(false);
    };

    return (
        <div>
            <h1>Danh sách sản phẩm</h1>
            <button onClick={() => navigate('/products/new')} style={{
                width: "90px",
                height: "30px",
                backgroundColor: "green",
                border: "none",
                color: "white",
                marginRight: "2px",
                borderRadius: "3px"
            }}>Thêm mới
            </button>
            <table>
                <thead>
                <tr style={{fontWeight: "700",}}>
                    <td>#</td>
                    <td>Tên sản phẩm</td>
                    <td>Mô tả</td>
                    <td>Giá</td>
                    <td></td>
                </tr>
                </thead>
                <tbody>
                {products.map((product, index) => (
                    <tr key={product.id}>
                        <th>{index + 1}</th>
                        <td>
                            <Link to={`/products/${product.id}`}
                                  style={{textDecoration: "none", color: "blue"}}>{product.title}</Link>
                        </td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>
                            <button style={{
                                backgroundColor: "red",
                                border: "none",
                                color: "white",
                                marginRight: "2px",
                                borderRadius: "3px"
                            }}
                                    onClick={() => handleDeleteClick(product.id)}>Xoá
                            </button>
                            <Link to={`/products/edit/${product.id}`}>
                                <button style={{
                                    backgroundColor: "blue",
                                    border: "none",
                                    color: "white",
                                    marginRight: "2px",
                                    borderRadius: "3px"
                                }}>Sửa
                                </button>
                            </Link> {' '}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {showDeletePopup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Bạn chắc chắn muốn xoá sản phẩm này?</p>
                        <button onClick={handleDeleteCancel}>Cancel</button>
                        <button onClick={handleDeleteConfirm}>OK</button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
