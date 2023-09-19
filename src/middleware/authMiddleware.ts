import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { AuthRequest } from '../types';

type Decoded = {
    id :string,
    [key : string] : any

}

const authMiddleware = async (req :AuthRequest, res :Response, next: NextFunction) => {
    const authHeader  = req.headers.authorization;
    if (authHeader) {
        const token = (authHeader as string).split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET as string,async(err, payload)=>{
            if(err) res.status(401).json("Invalid token");
            try{
                const user = await User.findById((payload as Decoded).id)
                req.user = user!;
               next()
            
                }catch(err){
                    res.status(500).json(err);
                }
        })
    } else {
        return res.status(401).json("You are not authenticated");
    }
} 

export default authMiddleware