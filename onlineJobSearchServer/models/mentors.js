import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    expertise: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Correct export
const Mentors = mongoose.model("Mentors", mentorSchema);
export default Mentors;
