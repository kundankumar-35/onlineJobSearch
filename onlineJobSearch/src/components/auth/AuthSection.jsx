
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthSection = () => {

    const [isLogin, setIsLogin] = useState(false)
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    // this is used for navigation
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsLogin((prev) => !prev);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/auth/register', formData);
            console.log(formData)
            localStorage.setItem('auth', 'true')  // keep track of user login or not
            setMessage(response.data.message);

            navigate('/')   // navigate landing page
        } catch (error) {
            setMessage(error.message || 'Registration failed');
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        // const response = await axios.post('http://localhost:4000/auth/login', formData, {
        //     headers: { 'Content-Type': 'application/json' } // Explicitly set JSON content type
        // });
        // if (response.status === 200) {
        //     localStorage.getItem('auth', response.data.authorize)
        //     navigate('/')
        // } else {
        //     setMessage('user not authorized')
        // }

    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    {isLogin ? 'Login to Your Account' : 'Create an Account'}
                </h2>

                {/* Toggle Button */}
                <div className="flex justify-center mb-4">
                    <button
                        className={`px-4 py-2 rounded-l-md ${isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                        onClick={toggleForm}
                    >
                        Login
                    </button>
                    <button
                        className={`px-4 py-2 rounded-r-md ${!isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                        onClick={toggleForm}
                    >
                        Register
                    </button>
                </div>

                {/* Form */}
                {isLogin ? (
                    <form onSubmit={handleLoginSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="login-email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="login-email"
                                name="email"
                                placeholder="you@example.com"
                                className="border border-gray-300 rounded-md p-2 w-full"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="login-password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="login-password"
                                name="password"
                                placeholder="********"
                                className="border border-gray-300 rounded-md p-2 w-full"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Login
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="register-name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="register-name"
                                name="username"
                                placeholder="John Doe"
                                className="border border-gray-300 rounded-md p-2 w-full"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="register-email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="register-email"
                                name="email"
                                placeholder="you@example.com"
                                className="border border-gray-300 rounded-md p-2 w-full"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="register-password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="register-password"
                                name="password"
                                placeholder="********"
                                className="border border-gray-300 rounded-md p-2 w-full"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Register
                        </button>
                    </form>
                )}

                {/* Display message */}
                {message && <p className="text-center mt-4 text-red-500">{message}</p>}
            </div>
        </div>
    );
};

export default AuthSection;
