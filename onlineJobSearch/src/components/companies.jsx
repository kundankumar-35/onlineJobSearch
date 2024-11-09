import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const AllCompaniesPage = () => {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);

    useEffect(() => {

       
            if (localStorage.getItem('auth') !== 'true') {
                navigate('/auth/login');
            }
      
       
        // Fetch all companies
        const fetchCompanies = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/registerCompany');
                setCompanies(response.data);
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        };

        fetchCompanies();
    }, []);

    if (companies.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Registered Companies</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {companies.map((company) => (
                    <div key={company.id} className="bg-white shadow-lg rounded-lg p-4">
                        <img
                            src={company.logo || "https://via.placeholder.com/150"} // Placeholder if no image
                            alt={`${company.name} logo`}
                            className="w-full h-32 object-cover rounded-md mb-4"
                        />
                        <h2 className="text-2xl font-semibold text-gray-700">{company.name}</h2>
                        <p className="text-gray-600 mb-1"><strong>Location:</strong> {company.location}</p>
                        <p className="text-gray-600 mb-1"><strong>Industry:</strong> {company.industry}</p>
                        <p className="text-gray-600 mb-2">{company.description}</p>
                        <button
                            onClick={() => navigate(`/company/${company.id}`)}
                            className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllCompaniesPage;
