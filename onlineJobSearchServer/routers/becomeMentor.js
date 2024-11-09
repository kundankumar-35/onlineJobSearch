// routes/mentor.js
import { Router } from 'express';
import mentor from '../models/mentors.js'
const router = Router();

// Mentor Registration Endpoint
router.post('/become-mentor', async (req, res) => {
    try {
        // Check if mentor already exists
        const existingMentor = await mentor.findOne({ email: req.body.email });
        if (existingMentor) {
            return res.status(400).json({ error: 'Mentor with this email already exists.' });
        }

        // Create and save new mentor
        const newMentor = new mentor(req.body);
        await newMentor.save();

        res.status(201).json({ message: 'Mentorship application submitted successfully.' });
    } catch (error) {
        console.error('Error saving mentor:', error);
        res.status(500).json({ error: 'Server error. Could not submit application.' });
    }
});
router.get('/all-mentors', async (req, res) => {
    try {
        const mentors = await mentor.find();
        res.status(200).json(mentors)
        
    } catch (e) {
        console.log(e.message)
    }
})

export default router;
