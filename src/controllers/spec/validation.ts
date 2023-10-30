import Joi from "joi";
import mongoose from "mongoose";

export const SpecSchema = Joi.object({
    name :Joi.string().required(),
    brand: Joi.string().required(),
    type: Joi.string().required(),
    price: Joi.number().required(),
    chasisdigit: Joi.number().required(),
    enginedigit: Joi.number().required(),
    engine : Joi.string().required(),
});


export default SpecSchema


