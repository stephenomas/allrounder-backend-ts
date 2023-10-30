import { Request, Response, NextFunction } from "express"
import User from "../../models/User";
import bcrypt from 'bcrypt'
import { ResponseBody } from "../../types";
import jwt from 'jsonwebtoken';
import { MongoError } from 'mongodb';
import Blacklist from "../../models/Blacklist";


const authController = {
    login : async (req: Request, res: Response) => {
      const {email , password} = req.body;
      try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({status:404, message: "Invalid Username or Password"} as ResponseBody);
        
          }else{
            if(!user.status) return res.status(403).json({status:403, message: "Account is inactive contact Admin"} as ResponseBody);
            if(bcrypt.compareSync(password, user.password)){
                const token = jwt.sign({ id : user._id }, process.env.JWT_SECRET!, {
                    expiresIn: "30d",
                });
                return res.status(200).json({status: 200, message: "sign in successful", data :{user, token}} as ResponseBody);
            }else{
                return res.status(404).json({status:404, message: "Invalid Username or Password"} as ResponseBody);
            }
        }
      }catch(error){
        return res.status(500).json({status:500, message: (error as MongoError).message} as ResponseBody);
      }
      
    },
    
    logout : async (req:Request, res:Response) => {
      const authHeader  = req.headers.authorization;
      const token = (authHeader as string).split(' ')[1];
      try {
        const Blacklisted = await new Blacklist({
          token
        }).save()
        return res.status(200).json({status:200, message:'Logout Successful'})
      } catch (error) {
        return res.status(500).json({status:500, message: (error as MongoError).message} as ResponseBody);
      }

    }
}


export default authController