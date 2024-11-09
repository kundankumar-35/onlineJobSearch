import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    postedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Job', jobSchema);
