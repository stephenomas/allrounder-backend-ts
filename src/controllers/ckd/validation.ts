import Joi from "joi";


export const CkdSchema = Joi.object({
    type: Joi.string().required(),
    quantity: Joi.number().required(),
    remark : Joi.string().optional(),
    spec : Joi.string().required(),
})