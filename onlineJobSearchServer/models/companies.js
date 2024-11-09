import { Schema, model } from "mongoose";

const CompanySchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    industry: { type: String, required: true },
    description: { type: String, required: true },
    logo: { type: String },
});

export default model("Company", CompanySchema);
