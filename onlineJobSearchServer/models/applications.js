import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    applicantName: {
        type: String,
        required: true,
        trim: true
    },
    applicantEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    resume: {
        type: String,
        required: true
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
});

const Application = mongoose.model('Application', applicationSchema);

export default Application;
