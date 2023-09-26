import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { AuthRequest, ResponseBody, User as IUser } from '../types';
import Blacklist from '../models/Blacklist';
import Permission from '../models/Permission';

type Decoded = {
    id :string,
    [key : string] : any

}

export const authMiddleware = async (req :AuthRequest, res :Response, next: NextFunction) => {
    const authHeader  = req.headers.authorization;
    if (authHeader) {
        const token = (authHeader as string).split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET as string,async(err, payload)=>{
            if(err) return res.status(401).json({message :"Invalid token"});
            try{
                const blacklisted = await Blacklist.findOne({token})
                if(blacklisted) return res.status(401).json({message : "Invalid token"})
                const user = await User.findById((payload as Decoded).id)
                req.user = user!;
                next()
            
                }catch(err){
                    res.status(500).json({message : err} as ResponseBody);
                }
        })
    } else {
        return res.status(401).json({message : "You are not authenticated"} as ResponseBody);
    }
} 

export const PermissionMiddleware = (name : string) => {
    return async (req: AuthRequest, res: Response, next: NextFunction) => {
        const user = req.user!
        if(user.role == 1){
            next()
        }else{
            try{
                const permission = await Permission.findOne({name})
                if(user.permissions?.includes(permission!.id)) {
                    next()
                }else{ 
                    return res.status(403).json({message : "You are not authorized"} as ResponseBody);
                }
            }catch(error){

            }
           
        }
    }
}


export const adminMiddleware = (req : AuthRequest, res: Response, next: NextFunction) => {
        const user = req.user!
        if(user.role == 1){
            next()
        }else {
            return res.status(403).json({message : "You are not authorized"} as ResponseBody);
        }
}




