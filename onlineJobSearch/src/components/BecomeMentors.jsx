import React from 'react'
import { useState , useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const BecomeMentor = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        expertise: '',
        experience: '',
        bio: ''
    });
    const navigate = useNavigate();

   

    const [message, setmessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/mentors/become-mentor', formData);
            setmessage(response.data.message);
            setFormData({ name: '', email: '', expertise: '', experience: '', bio: '' });
        } catch (error) {
            setmessage(error.message || 'could not submit application!! ');
        }
    }


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-center mb-6">Become a Mentor</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="expertise">Expertise</label>
                        <input
                            type="text"
                            id="expertise"
                            name="expertise"
                            placeholder="e.g., JavaScript, Data Science"
                            value={formData.expertise}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="experience">Years of Experience</label>
                        <input
                            type="number"
                            id="experience"
                            name="experience"
                            placeholder="e.g., 5"
                            value={formData.experience}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="bio">Bio</label>
                        <textarea
                            id="bio"
                            name="bio"
                            placeholder="Tell us a bit about yourself"
                            value={formData.bio}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-md p-2 w-full"
                        ></textarea>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                        Submit Application
                    </button>
                </form>

                {message && <p className="text-center mt-4 text-green-500">{message}</p>}
            </div>
        </div>
    );
};

export default BecomeMentor;