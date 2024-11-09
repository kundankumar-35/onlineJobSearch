import express from 'express';
import bcrypt from 'bcryptjs'
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
    // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User( req.body , req.body.password = hashedPassword  );
        // Save the user to the database
        await user.save();

        res.status(201).json({ message: "Successfully registered" });
    } catch (e) {
        res.status(500).json({ error: "Failed to register" });
    }
});

// router.post('/login', async (req, res) => {
//     try {
//         // check user's email already exists or not

//         const user = await User.findOne({ email: req.body.email })
       
//         // check user email is not found
//         if (!user) {
//           return  res.status(400).json({ message: "user not found" })
            
//         }

//         const ispassword = await bcrypt.compare(req.body.password, user.password)
//         if (!ispassword) {
//             res.status(400).json({message : " wrong password  "})
//         }



//         // if both match

//         res.status(200).json({message : "login successfully" , authorize : 'true'})
//     } catch (e) {
//         res.status(500).json({error : "failed to register"})
//     }
// })


export default router;
