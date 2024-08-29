import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear error message for the changed field
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.title.trim()) formErrors.name = 'Tên sản phẩm không được bỏ trống.';
        if (!formData.description.trim()) formErrors.description = 'Mô tả không được bỏ trống.';
        if (!formData.price || isNaN(formData.price) || formData.price <= 0) formErrors.price = 'Giá phải là số dương.';
        return formErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form data
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        // If no errors, submit form data
        axios.post('http://localhost:3000/products', formData)
            .then(response => {
                navigate('/');
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi thêm sản phẩm mới:', error);
            });
    };

    return (
        <div>
            <h1>Thêm sản phẩm mới</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tên sản phẩm:</label>
                </div>
                <div>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    {errors.name && <p className="error-message">{errors.title}</p>}
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
                    {errors.price && <p className="error-message">{errors.price}</p>}
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
                    {errors.description && <p className="error-message">{errors.description}</p>}
                </div>

                <button style={{
                    width: "60px",
                    height: "30px",
                    backgroundColor: "blue",
                    border: "none",
                    color: "white",
                    marginRight: "2px",
                    borderRadius: "3px"
                }} type="submit">Thêm
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

export default AddProduct;
