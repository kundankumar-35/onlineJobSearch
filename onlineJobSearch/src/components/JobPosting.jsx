import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const PostJob = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        location: '',
    });
    const [message, setMessage] = useState('');


    


    const handleChange = ({ target: { name, value } }) =>
        setFormData(prevData => ({ ...prevData, [name]: value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:4000/api/jobs', formData);
            setMessage(data.message);
            setFormData({ title: '', description: '', requirements: '', location: '' });
        } catch (error) {
            setMessage(error.response?.data?.error || 'Failed to post job');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Post a New Job</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-gray-700 font-semibold mb-1">
                            Job Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter job title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-gray-700 font-semibold mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            placeholder="Enter job description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                            rows="4"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="requirements" className="block text-gray-700 font-semibold mb-1">
                            Requirements
                        </label>
                        <textarea
                            name="requirements"
                            placeholder="Enter job requirements"
                            value={formData.requirements}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                            rows="3"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-gray-700 font-semibold mb-1">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            placeholder="Enter job location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Post Job
                    </button>
                </form>
                {message && (
                    <p className={`mt-4 text-center font-semibold ${message.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default PostJob;
