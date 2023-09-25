import Joi from "joi";
import mongoose from "mongoose";

export const RegistrationSchema = Joi.object({
    name :Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    confirmPassword: Joi.string()
    .valid(Joi.ref('password')) // Compare with the 'password' field
    .required()
    .label('Confirm Password')
    .messages({
      'any.only': '{{#label}} does not match the Password',
    }),
    phone : Joi.string().min(11).required(),
    branch: Joi.number().required(),
    role: Joi.number().required(),
  });


export const PasswordUpdateSchema = Joi.object({
  password: Joi.string().min(5).required(),
  confirmPassword: Joi.string()
  .valid(Joi.ref('password')) // Compare with the 'password' field
    .required()
    .label('Confirm Password')
    .messages({
      'any.only': '{{#label}} does not match the Password',
    })
})

//   // Define a custom validation function for the branchId
// const validateBranchId = async (value : number) => {
//     // Check if the branchId exists in the branches collection
//     const branchExists = await mongoose.connection.collection('branches').findOne({ id: value });
    
//     if (!branchExists) {
//       throw new Error('Branch not found');
//     }
    
//     return value; // Value is valid, return it
//   };
  
//   // Add the custom validation function to the branchId field
//   RegistrationSchema.custom((branch, helpers) => {
//     return validateBranchId(branch)
//       .catch((err) => helpers.error('any.custom', { customErrorKey: 'BranchNotFound', field: 'branch' }));
//   }, 'BranchIdValidation');