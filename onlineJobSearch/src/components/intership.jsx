import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Internship() {
    const [internshipData, setInternshipData] = useState([]);
    const navigate = useNavigate()
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicationData, setApplicationData] = useState({
        applicantName: '',
        applicantEmail: '',
        resume: '',
    });
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        type: 'Job',
        description: '',
    });

    useEffect(() => {

      
            if (localStorage.getItem('auth') !== 'true') {
                navigate('/auth/login');
            }
      


        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/jobs/all-internship');
                setInternshipData(response.data);  // Assuming data is in response.data
                console.log(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    const handleApply = (jobId, title) => setSelectedJob({ jobId, title });

    const handleChange = ({ target: { name, value } }) =>
        setApplicationData((prevData) => ({ ...prevData, [name]: value }));

    const handleFormChange = ({ target: { name, value } }) =>
        setFormData((prevData) => ({ ...prevData, [name]: value }));

    const handleSubmitApplication = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `http://localhost:4000/jobs/AllJobs/${selectedJob.jobId}/apply`,
                applicationData
            );
            toast.success(data.message || "Application submitted successfully!");
            setApplicationData({ applicantName: '', applicantEmail: '', resume: '' });
            setSelectedJob(null);
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to submit application');
        }
    };

    const handleJobRegister = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:4000/jobs/hoster/newjob', formData);
            toast.success(data.message || "Job registered successfully!");
            setFormData({ title: '', company: '', location: '', type: 'Job', description: '' });
            await fetchData();  // Refresh job list after posting
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to register job');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer position="top-right" />

            {/* Display Job Postings */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Available Jobs/Internships</h2>
                <ul className="space-y-4">
                    {internshipData.map((job) => (
                        <li key={job.jobId} className="bg-white shadow-md p-4 rounded-lg">
                            <h3 className="text-xl font-bold">{job.title}</h3>
                            <p>Company: {job.company}</p>
                            <p>Location: {job.location}</p>
                            <p>Type: {job.type}</p>
                            <p>{job.description}</p>
                            <button
                                onClick={() => handleApply(job.jobId, job.title)}
                                className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                            >
                                Apply
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Application Form */}
            {selectedJob && (
                <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Apply for {selectedJob.title}</h2>
                    <form onSubmit={handleSubmitApplication} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="applicantName"
                                value={applicationData.applicantName}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="applicantEmail"
                                value={applicationData.applicantEmail}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Resume Link</label>
                            <input
                                type="text"
                                name="resume"
                                value={applicationData.resume}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white rounded-md py-2 mt-4 hover:bg-green-700"
                        >
                            Submit Application
                        </button>
                    </form>
                </div>
            )}

            {/* Job Registration Form */}
            <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Host a New Job/Internship</h2>
                <form onSubmit={handleJobRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleFormChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Company</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleFormChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleFormChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleFormChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        >
                            <option value="Job">Job</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleFormChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white rounded-md py-2 mt-4 hover:bg-blue-700"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
