// models/job.js
import { Schema, model } from 'mongoose';

const jobSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Job', 'Internship'],
        default: 'Job',
    },
    description: {
        type: String,
        required: true,
    },
    postedAt: {
        type: Date,
        default: Date.now,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

const Newjob = model('Newjob', jobSchema);

export default Newjob;
