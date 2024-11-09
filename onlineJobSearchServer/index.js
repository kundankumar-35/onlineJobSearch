
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import auth from './routers/auth.js'
import becomeMentor from './routers/becomeMentor.js'
import registerCompany from './routers/RegisterCompany.js'
import job from './routers/job.js'
dotenv.config();







const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error));



app.use('/auth', auth);
app.use('/mentors',becomeMentor)
app.use('/api', registerCompany)
app.use('/api/jobs', job)








const PORT =process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
