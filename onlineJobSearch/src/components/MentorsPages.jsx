// src/components/MentorsPage.js
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const MentorsPage = () => {
    const [mentors, setMentors] = useState([]); // Use 'mentors' to store list of mentors
    const navigate = useNavigate();

    useEffect(() => {

            if (localStorage.getItem('auth') !== 'true') {
                navigate('/auth/login');
            }
   
       
        const fetchData = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/mentors/all-mentors'); // Use await to resolve the promise
                setMentors(data); // Set the response data to mentors
                console.log(data);
            } catch (e) {
                console.log(e.message);
            }
        };

        fetchData();
    }, []);

    const handleBookSession = (mentor) => {
        alert(`Booking a session with ${mentor.name}`);
        navigate(`/mentor/${mentor.id}`); // Navigate to mentor details page
    };

    return (
        <div className="bg-gray-100 min-h-screen py-10">
            <h1 className="text-3xl text-center font-semibold mb-6">Available Mentors</h1>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mentors.map((mentor) => (
                        <div
                            key={mentor.id}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                            <img
                                // src={mentor.imageUrl}  // Use this if you have dynamic images
                                src="public/images/user_logo.jpg" // Placeholder image
                                alt={mentor.name}
                                className="w-32 h-32 rounded-full mx-auto mb-4"
                            />
                            <h2 className="text-xl font-semibold text-center">{mentor.name}</h2>
                            <p className="text-gray-600 text-center">{mentor.experience}</p>
                            <p className="text-yellow-500 text-center mb-4">⭐ {mentor.expertise}</p>
                            <button
                                onClick={() => handleBookSession(mentor)} // Pass the whole mentor object
                                className="block bg-blue-500 text-white px-4 py-2 rounded-md mx-auto hover:bg-blue-600 transition"
                            >
                                Book Session
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MentorsPage;
