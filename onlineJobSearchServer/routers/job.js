import express from "express";
import job from '../models/jobs.js'
import Application from "../models/applications.js";
const router = express.Router()



// retrive all jobs
router.get('/all-jobs', async (req, res) => {
    try {
        const jobs = await job.find();
        res.status(200).json(jobs)
    } catch (e) {
        
        res.status(500).json({error : "not fetch the data"})
    }
})


// search special job
router.get('/special-job', async (req, res) => {
    try {
        const { title, location } = req.query;

        const searchQuery = {
            $or: [
                { title: { $regex: title, $options: 'i' } },
                { location: { $regex: location, $options: 'i' } },
            ],
        };
        console.log(title , location)

        const jobs = await job.find(searchQuery);
        
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Server error while searching jobs' });
    }
});



// post new job
router.post('/new-job', async (req, res) => {
    try {
        const newjob = new job(req.body)
        await newjob.save()
        res.status(201).json({ message : " job post successfully"})
    } catch (e) {
        console.log(e.message)
        res.status(500).json({error : "failed to post job"})
    }
})

// post new application for jobs
router.post('/apply', async (req, res) => {
    try {

        const jobId = req.query.jobId
        const jobTitle = req.query.jobTitle

        const newjob = new Application({
            ...req.body,
            jobId: jobId,
            title : jobTitle
            
        })
        // console.log(newjob)
        await newjob.save()
        // console.log(jobId , jobTitle)
        res.status(201).json({ message : "Application post successfully"})
    } catch (e) {
        console.log(e.message)
        res.status(500).json({error : "failed to post job"})
    }
})



// retrieve aall interships
router.get('/all-internship', async (req, res) => {
    try {
        const internship = await job.find({ type :"Internship"})
       res.status(200).json(internship)
    } catch (e) {
        console.log(e.message)
    }
})
export default router