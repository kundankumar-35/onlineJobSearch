import React  ,{ useEffect  ,useState} from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';


const LandingPage = () => {
    
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicationData, setApplicationData] = useState({
        applicantName: '',
        applicantEmail: '',
        resume: '',
    });

    

 console.log(localStorage.length)
    
    const navigate = useNavigate()


    useEffect(() => {
       
        const fetchJobs = async () => {
            try {
               
                // const  data  = await axios.get('http://localhost:4000/api/jobs/all-jobs');
                // setJobs(data);
            } catch (error) {
                console.error('Failed to fetch jobs:', error);
               
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
                `http://localhost:4000/api/all-jobs/${selectedJob.jobId}/apply`,
                applicationData
            );
            toast.success(data.message || "Application submitted successfully!");
            setApplicationData({ applicantName: '', applicantEmail: '', resume: '' });
            setSelectedJob(null);
        } catch (error) {
           console.log(error.message)
        }
    };
    // Function to search for jobs based on title and location
    const searchJob = async (e) => {
      
        e.preventDefault(); // Prevents the default form submission behavior
        try {
            const response = await axios.get('http://localhost:4000/api/jobs/special-job', {
                params: {
                    title: title,
                    location: location,
                },
            });
            setJobs(response.data); // Sets the results to display
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };


   



    return (

        <div className="bg-gray-50">
            {/* Header */}
            <header className="fixed top-0 left-0 w-full h-16 bg-blue-600 text-white shadow-md z-50 flex items-center justify-between px-6">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <h1 className="text-white text-3xl font-bold">JobFinder</h1>
                   
                    <nav className="space-x-6 flex justify-between items-center px-4">
                        <nav className="space-x-6  capitalize">
                            <Link to="/companies" className="hover:text-yellow-400">
                                Company
                            </Link>
                            <Link to="/jobList" className="hover:text-yellow-400">
                                jobs
                            </Link>
                            <Link to="/internships" className="hover:text-yellow-400">
                                Intership
                            </Link>
                            <Link to="/mentors" className="hover:text-yellow-400">
                                metorship
                            </Link>
                            <Link to="/hoster" className="hover:text-yellow-400 ">
                                Host
                            </Link>
                        </nav>
                       </nav>
                    
                   

                    <div className="flex items-center space-x-4">

                        <nav className='space-x-6 flex justify-beetween items-center px-4'>
                              {/* User Avatar */}
                        <div className="relative">
                                <img
                                    // onClick={() => navigate('/auth/profile') }
                                src="images/user_logo.jpg" // Placeholder for user avatar
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full border-2 border-white"
                                    
                            />
                            </div>
                            <button
                              
                                // onClick={ navigate('/auth/login')  }
                                className="bg-yellow-400 text-black  font-bold captilize px-6 py-1 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            { localStorage.getItem('auth')=='true' ? 'logout' : 'login'}
                            </button>
                          

                        </nav>
                      
                        

                     
                    </div>
                </div>
            </header>

            {/* Search Bar */}
            <section className="py-32">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-semibold text-center mb-4">Find Your Dream Job</h2>
                    <form className="flex justify-center" onSubmit={searchJob}>
                        <input
                            type="text"
                            placeholder="Job title or keywords"
                            className="border border-gray-300 rounded-l-md p-2 w-1/3"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            className="border border-gray-300 rounded-l-md p-2 w-1/3"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <button type="submit" className="bg-blue-600 text-white rounded-r-md p-2">
                            Search
                        </button>
                    </form>
                </div>
            </section>

            {/* Featured Jobs */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-semibold text-center mb-6">Featured Jobs</h2>
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
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 py-4">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-white">&copy; 2024 JobFinder. All rights reserved.</p>
                </div>
            </footer>





          


        </div>
    );
};

export default LandingPage;
