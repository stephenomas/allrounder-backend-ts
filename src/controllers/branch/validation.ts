import Joi from "joi";
import mongoose from "mongoose";

export const BranchSchema = Joi.object({
    name :Joi.string().required(),
    address: Joi.string().required(),
    state: Joi.string().required(),
});



