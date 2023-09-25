import { Request, Response} from 'express';
import Permission from '../models/Permission';
import { ResponseBody } from "../types";
import { MongoError } from 'mongodb';


const permissionController = {
    create : async (req: Request, res: Response) => {
        try {
            const {name} = req.body
            const exists = await Permission.findOne({name});
            if(exists){
                return res.status(400).json({message: "permission already exists"})
            }
            const permission = await new Permission({name}).save();
                return res.status(200).json({message: "Permission created successfully", data: permission} as ResponseBody)
        } catch (error) {
            return res.status(400).json({message:(error as MongoError).message})
        }
       
    },
    index : async (req: Request, res: Response) => {
        try{
            const permissions = await Permission.find({});
            return res.status(200).json({message: "Permissions", data: permissions})
        } catch (error) {
            return res.status(400).json({message:(error as MongoError).message})
        }
    }
}


export default permissionController;