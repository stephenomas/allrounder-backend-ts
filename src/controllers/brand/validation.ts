import Joi from "joi";
import mongoose from "mongoose";

export const BrandSchema = Joi.object({
    name :Joi.string().required()
});



