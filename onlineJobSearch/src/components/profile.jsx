import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate();

    useEffect(() => {
            if (localStorage.getItem('auth') !== 'true') {
                navigate('/auth/login');
            }
       else {
            fetchUserData();
        }
    }, [navigate]);

    const [userData, setUserData] = useState(null); // Initialize as null
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    // Fetch user data from the API
    const fetchUserData = async () => {
        try {
            const response = await axios.get('/api/user/profile'); // Update with actual API endpoint
            setUserData(response.data);
            setFormData(response.data); // Set formData with initial data for editing
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleEditClick = () => setIsEditing(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await axios.put('/api/user/profile', formData); // Update with actual API endpoint
            setUserData(formData); // Update the display data with form data
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (!userData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <div className="flex flex-col items-center">
                <img
                    src={userData.avatar || 'https://via.placeholder.com/150'}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full border-2 border-indigo-500 mb-4"
                />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    {userData.username}
                </h2>
                <p className="text-gray-500 mb-4">{userData.email}</p>
                <p className="text-gray-600 mb-4">{userData.bio}</p>
                <p className="text-gray-600 mb-4">{userData.location}</p>

                {isEditing ? (
                    <div className="w-full mt-4">
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Username"
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            placeholder="Bio"
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="Location"
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                        />
                        <button
                            onClick={handleSave}
                            className="w-full bg-indigo-500 text-white p-2 rounded mt-2 hover:bg-indigo-600"
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <nav className="flex flex-wrap justify-between gap-2 w-full mt-4">
                        <button
                            onClick={handleEditClick}
                            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                        >
                            Edit Profile
                        </button>
                        <button
                            onClick={() => navigate('/register-company')}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Register New Company
                        </button>
                        <button
                            onClick={() => navigate('/become-mentor')}
                            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                        >
                            Become Mentor
                        </button>
                    </nav>
                )}
            </div>
            {isEditing && (
                <button
                    onClick={() => setIsEditing(false)}
                    className="mt-2 px-4 py-2 text-indigo-500 border border-indigo-500 rounded hover:bg-indigo-100"
                >
                    Cancel
                </button>
            )}
        </div>
    );
};

export default Profile;
