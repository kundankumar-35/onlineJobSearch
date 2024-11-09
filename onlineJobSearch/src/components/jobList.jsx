import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicationData, setApplicationData] = useState({
        applicantName: '',
        applicantEmail: '',
        resume: '',
    });
    const navigate  = useNavigate()

    useEffect(() => {
        
            if (localStorage.getItem('auth') !== 'true') {
                navigate('/auth/login');
            }
    
        const fetchJobs = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/api/jobs/all-jobs');
                setJobs(data);
            } catch (error) {
                console.error('Failed to fetch jobs:', error);
                toast.error("Failed to fetch jobs.");
            }
        };
        fetchJobs();
    }, []);

    const handleApply = (jobId, title) => setSelectedJob({ jobId, title });

    const handleChange = ({ target: { name, value } }) =>
        setApplicationData((prevData) => ({ ...prevData, [name]: value }));

    const handleSubmitApplication = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `http://localhost:4000/api/jobs/apply`,
                applicationData, {
                    params: {
                        jobId: selectedJob.jobId,
                        jobTitle : selectedJob.title
                    }
                }
            );
            toast.success(data.message || "Application submitted successfully!");
            setApplicationData({ applicantName: '', applicantEmail: '', resume: '' });
            setSelectedJob(null);
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to submit application');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer position="top-right" />
            <h2 className="text-3xl font-semibold mb-6">Job Openings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {jobs.map((job) => (
                    <div
                        key={job._id}
                        className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300 cursor-pointer"
                        onClick={() => handleApply(job._id, job.title)}
                    >
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">{job.title}</h3>
                        <p className="text-gray-600 mt-2">{job.description}</p>
                        <p className="text-gray-600">
                            <span className="font-medium">Requirements:</span> {job.requirements}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium">Location:</span> {job.location}
                        </p>
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent click from triggering card's onClick
                                handleApply(job._id, job.title);
                            }}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        >
                            Apply
                        </button>
                    </div>
                ))}
            </div>
            {selectedJob && (
                <div className="mt-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <h3 className="text-xl font-medium mb-4">Apply for {selectedJob.title}</h3>
                    <form onSubmit={handleSubmitApplication} className="space-y-4">
                        <input
                            type="text"
                            name="applicantName"
                            placeholder="Name"
                            value={applicationData.applicantName}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                        />
                        <input
                            type="email"
                            name="applicantEmail"
                            placeholder="Email"
                            value={applicationData.applicantEmail}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                        />
                        <input
                            type="text"
                            name="resume"
                            placeholder="Resume URL"
                            value={applicationData.resume}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                        />
                        <button
                            type="submit"
                            className="w-full p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                        >
                            Submit Application
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default JobList;
