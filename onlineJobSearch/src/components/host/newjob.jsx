
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

const Newjob = () => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        type: 'Job', // default value
        description: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('auth') !== 'true') {
            navigate('/auth/login');
        }
    }, [navigate]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Replace with your backend submission logic
        try {
            const response = await axios.post('http://localhost:4000/api/jobs/new-job', formData);

            console.log("sucessfully submit")
            console.log(response.message)
            toast.success(response.message || 'successfully post')
            setFormData({})
        } catch (e) {
            console.log(e.message);
            toast.error(e.message || "failed")
        }

        
    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer position="top-right" />
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
           
            <h2 className="text-2xl font-semibold mb-4">Host a New Job/Internship</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                        Company
                    </label>
                    <input
                        type="text"
                        name="company"
                        id="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        Type
                    </label>
                    <select
                        name="type"
                        id="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Job">Job</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white rounded-md py-2 mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Register
                </button>
            </form>
            </div>
            </div>
    );
};

export default Newjob;
