import React, { useState ,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterCompany = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        industry: "",
        description: "",
        logo: "",
    });






    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/registerCompany", formData);
            console.log(formData)
            if (response.status === 201) {
                alert("Company registered successfully!");
                navigate("/companies");
            }
        } catch (error) {
            // console.error("Error registering company:", error);
            alert("Failed to register company.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <h1 className="text-3xl font-semibold mb-6 text-center">Register Company</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Company Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Industry</label>
                    <input
                        type="text"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Logo URL</label>
                    <input
                        type="text"
                        name="logo"
                        value={formData.logo}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600"
                >
                    Register Company
                </button>
            </form>
        </div>
    );
};

export default RegisterCompany;
