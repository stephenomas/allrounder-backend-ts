import Joi from "joi";


export const BranchSchema = Joi.object({
    name :Joi.string().required(),
    address: Joi.string().required(),
    state: Joi.string().required(),
});



