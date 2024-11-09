import { Router } from "express";
import company from '../models/companies.js'
const router = Router();

// Register a new company
router.post("/registerCompany", async (req, res) => {
    try {
        // const existingCompany = company.findOne({ name: req.body.name })
        // if (existingCompany) {
        //   return  res.status(400).json({message : " company already register"})
        // }
        const newCompany = new company(req.body);
        await newCompany.save();
        res.status(201).json({ message: "Company registered successfully!" });
       
    } catch (error) {
        res.status(500).json({ error: "Failed to register company" });
    }
});

router.get('/registerCompany', async (req, res) => {
    try {
        const companies = await company.find();
        res.status(200).json(companies)
    } catch (e) {
        console.log(e.message)
        res.status(500).json({error : " Failled to  fetch companies"})
    }
})

export default router;
