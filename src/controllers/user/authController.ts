import { Request, Response, NextFunction } from "express"
import User from "../../models/User";
import bcrypt from 'bcrypt'
import { ResponseBody } from "../../types";
import jwt from 'jsonwebtoken';
import { MongoError } from 'mongodb';


const authController = {
    login : async (req: Request, res: Response) => {
      const {email , password} = req.body;
      try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({status:404, message: "Invalid Username or Passwor"} as ResponseBody);
        }else{
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
        return res.status(404).json({status:404, message: (error as MongoError).message} as ResponseBody);
      }
      
    }   
}


export default authController