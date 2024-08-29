import React, {useEffect, useState} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
    const {id} = useParams();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`)
            .then(response => {
                const {title, description, price} = response.data;
                setFormData({title, description, price});
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi lấy thông tin sản phẩm:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:3000/products/${id}`, formData)
            .then(response => {
                navigate('/');
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi cập nhật sản phẩm:', error);
            });
    };

    return (
        <div>
            <h1>Sửa sản phẩm</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tên sản phẩm</label>
                </div>
                <div>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Giá:</label>

                </div>
                <div>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Mô tả:</label>
                </div>
                <div>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button style={{
                    width: "60px",
                    height: "30px",
                    backgroundColor: "blue",
                    border: "none",
                    color: "white",
                    marginRight: "2px",
                    borderRadius: "3px"
                }} type="submit">Sửa
                </button>
                <Link to={`/`}>
                    <button style={{
                        width: "60px",
                        height: "30px",
                        backgroundColor: "#8cc8e1",
                        border: "none",
                        color: "white",
                        marginRight: "2px",
                        borderRadius: "3px"
                    }}>Trở lại
                    </button>
                </Link> {' '}
            </form>
        </div>
    );
};

export default EditProduct;
