import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { AuthRequest, ResponseBody, User as IUser } from '../types';
import Blacklist from '../models/Blacklist';
import Permission from '../models/Permission';
import { MongoError } from 'mongodb';

type Decoded = {
    id :string,
    [key : string] : any

}

type Auth = {
    message? : string,
    user? : Partial<IUser>
}
 const authenticated = async (req: AuthRequest, res:Response) => {
    return new Promise<Auth>((resolve,reject) => {
        let auth : Auth = {}
        const authHeader  = req.headers.authorization;
        if (authHeader) {
            const token = (authHeader as string).split(' ')[1];
            jwt.verify(token, process.env.JWT_SECRET as string,async(err, payload)=>{
                    try {
                     if(err){
                        resolve({message :"Invalid token"});
                     }else{
                        const blacklisted = await Blacklist.findOne({token})
                        if(blacklisted) resolve({message :"Invalid token"});
                        const user = await User.findById((payload as Decoded).id)
                        resolve({user : user!})
                     } 
                    } catch (err) {
                        console.log(err)
                        res.status(500).json({message : err ?? 'invalid Token'} as ResponseBody);
                    }
            })
      }else{
        resolve({message :"You're not Authenticated"});
      } 
    })
 }

export const authMiddleware = async (req :AuthRequest, res :Response, next: NextFunction) => {
    await authenticated(req, res).then((response) => {
        if(response.user){
            req.user = response.user
            next()
        }else{
            return res.status(401).json({message : response.message})
        }
    })
} 

export const PermissionMiddleware = (name : string) => {
    return async (req: AuthRequest, res: Response, next: NextFunction) => {
        await authenticated(req, res).then((response) => {
            if(response.user){
                req.user = response.user
                const user = req.user
                if(user.role == 1){
                    next()
                }else{
                    Permission.findOne({name}).then(response => {
                        if(user.permissions?.includes(response!.id)) {
                            next()
                        }else{ 
                            return res.status(403).json({message : "You are not authorized"} as ResponseBody);
                        }
                    }).catch(error => {
                        return res.status(400).json({message: (error as MongoError).message }as ResponseBody)
                    })
                }
            }else{
                return res.status(401).json({message : response.message})
            }
        })
    }
}


export const adminMiddleware = async (req : AuthRequest, res: Response, next: NextFunction) => {
        await authenticated(req, res).then((response) => {
            if(response.user){
                req.user = response.user
                const user = req.user!
                if(user.role == 1){
                    next()
                }else {
                    return res.status(403).json({message : "You are not authorized"} as ResponseBody);
                }
            }else{
               return res.status(401).json({message : response.message})
            }
        })
}




