import {RegistrationSchema} from './validation'
import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';
import User from '../../models/User';
import { ResponseBody } from '../../types';
import bcrypt from 'bcrypt';
import { MongoClient, MongoError } from 'mongodb';

 const userController = {
      registerUser : async(req:Request, res:Response, next: NextFunction)  =>  {
        const {error} = RegistrationSchema.validate(req.body)
        if (error) {
            return res.status(400).json({message : error.message} as ResponseBody);
        }
        const {email, phone, branch, role, name} = req.body;
        try {
            const userExists = await User.findOne({email});  
            if(userExists) 
                return res.status(400).json({message : 'User already exists'} as ResponseBody);
            
            const password = bcrypt.hashSync(req.body.password, 10);
         
            const user = await new User({
            name,
            email,
            password,
            phone,
            branch,
            role  
            }).save();
            const data : ResponseBody = {
                message : "User Registered Successfully",
                status: 200, 
                data: user
            }
            return res.status(200).json(data);
        } catch (error ) {
            return res.status(500).json((error as MongoError).message);
        }
       
      
    }
}


export default userController

