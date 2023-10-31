
import Joi from "joi";


export const ProductSchema = Joi.object({
    model :Joi.string().required(),
    chasisnumber: Joi.string().required(),
    enginenumber: Joi.string().required(),
    color : Joi.string().optional(),
    trampoline : Joi.string().optional(),
    remark : Joi.string().optional(),

});