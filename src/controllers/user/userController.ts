import {userUpdateSchema, RegistrationSchema} from './validation'
import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';
import User from '../../models/User';
import { ResponseBody } from '../../types';
import bcrypt from 'bcrypt';
import { MongoClient, MongoError } from 'mongodb';
import { AuthRequest } from '../../types';
import { Permission } from '../../types/models';
import { paginate } from '../../utils/helpers';
import { PER_PAGE } from '../../utils/constants';

 const userController = {
    registerUser : async(req:Request, res:Response, next: NextFunction)  =>  {
        const {error} = RegistrationSchema.validate(req.body)
        if (error) {
            return res.status(400).json({message : error.message} as ResponseBody);
        }
        const {email, phone, branch, role, name, permissions} = req.body;
        try {
            const userExists = await User.findOne({
                $or: [
                  { email}, 
                  { phone}
                ],
              })
          
            if(userExists) 
                return res.status(400).json({message : 'User already exists'} as ResponseBody);
            
            const password = bcrypt.hashSync(req.body.password, 10);
         
            const user = await new User({
            name,
            email,
            password,
            phone,
            branch,
            role,
            permissions  
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
       
      
    },

    editUser : async(req:AuthRequest, res:Response, next:Function) => {

     
        const {error} = userUpdateSchema.validate(req.body)
        if (error) {
            return res.status(400).json({message : error.message} as ResponseBody);
        }
        if(req.body.password || req.body.password.length > 0){ 
            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }else{
            delete req.body.password
        }
        const user = req.user!;
        const update = {
            name : req.body.name ? req.body.name : user.name,
            phone  : req.body.phone ? req.body.phone : user.phone,
            password : req.body.password ?? user.password
        }
        try {
            const updatedUser = await User.findOneAndUpdate({_id:user.id}, update, {new:true}).orFail();
            if(updatedUser){
                return res.status(200).json({message : 'Profile Updated successfully',
                status : 200,
                data: updatedUser
                } as ResponseBody)
            }else{
                return res.status(400).json({message: 'not updated'})
            }
            
        } catch (error) {
            return res.status(400).json({message: (error as MongoError).message }as ResponseBody)
        }
       

    },

    getProfile : async(req: AuthRequest, res: Response) => {
        const user  =req.user!
        return res.status(200).json({message : 'Profile', status : 200, data : user} as ResponseBody)

    },

    adminEditUser : async(req: AuthRequest, res: Response) => {
        const {id} = req.params
     
        try {
            const {error} = userUpdateSchema.validate(req.body)
            if (error) {
                return res.status(400).json({message : error.message} as ResponseBody);
            }
            if(req.body.password){ 
                req.body.password = bcrypt.hashSync(req.body.password, 10)
            }
           // console.log(req.body);
            const updatedUser = await User.findOneAndUpdate({_id:id}, req.body, {new:true}).orFail();
            if(updatedUser){
                return res.status(200).json({message : 'Profile Updated successfully',
                status : 200,
                data: updatedUser
                } as ResponseBody)
            }else{
                return res.status(400).json({message: 'not updated'})
            }
        } catch (error) {
            return res.status(400).json({message: (error as MongoError).message }as ResponseBody)
        }
        
    },
    adminGetUser : async (req:AuthRequest, res: Response) => {
        const {id} = req.params
        try {
            const user = await User.findOne({_id : id}).populate('branch')
            if(!user) return res.status(404).json({status: 404, message : 'User not found'})
            return res.status(200).json({message : 'User',
            status : 200,
            data: user
            } as ResponseBody)
        } catch (error) {
            return res.status(400).json({message: (error as MongoError).message }as ResponseBody)
        }
    },
    getUsers : async (req : AuthRequest, res: Response) => {
        try {
            const perPage = PER_PAGE;
            const users =  User.find({_id : {$ne :req.user?._id}}).populate('branch')
            const data = await paginate('users', users, req, perPage);
            res.status(200).json({ message:'Users',data});
        }catch(error){
            return res.status(400).json({message: (error as MongoError).message }as ResponseBody)
        }
    },
    toggleUser : async (req : AuthRequest, res:Response) => {
        const {id} = req.params
        try {
            const user = await User.findById(id);
            if(user){
                user.status = !user.status;
                await user.save()
                res.status(200).json({message:`User ${user.status ? 'Activated': 'Deactivated'} successfully`})
            }else{
                return res.status(404).json({message: 'user not found'})
            }
           
        }catch(error){
            return res.status(400).json({message: (error as MongoError).message }as ResponseBody)
        }
    }
}


export default userController

