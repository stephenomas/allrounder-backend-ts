import { Request, Response, NextFunction } from "express";
import Branch from "../../models/Branch";
import { BranchSchema } from "./validation";
import { ResponseBody } from '../../types/response';
import { MongoError } from 'mongodb';
import { AuthRequest, Branch as IBranch } from "../../types";
import { paginate } from "../../utils/helpers";
import { PER_PAGE } from "../../utils/constants";

const branchController = {
    create : async (req : AuthRequest, res : Response, next : NextFunction) => {
        const {error} = BranchSchema.validate(req.body)
        if(error){
            return res.status(400).json({message: error.message} as ResponseBody)
        }
        const {name, address, state} = req.body
        try {
            const exists = await Branch.findOne({name : { $regex: new RegExp(`^${name}$`, 'i') }});
            if(exists){
                return res.status(400).json({message: 'Branch already exists', status : 400} as ResponseBody)
            }

            const branch = await new Branch({name, address, state, user: req.user!.id}).save();
            return res.status(200).json({message: 'Branch created', status:200, data : branch} as ResponseBody)
            
        } catch (error) {
            return res.status(500).json({message : (error as MongoError).message} as ResponseBody)
        }
      
    },

   adminIndex : async (req : AuthRequest, res : Response, next : NextFunction) => {
        try {
        const perPage = PER_PAGE;
        const  branches =  Branch.find({}).sort({ _id: -1 });
        const data = await paginate('branches', branches, req, perPage);
        return res.status(200).json({message: 'Branches', status : 200, data } as ResponseBody)
        } catch (error) {
            return res.status(500).json({message : (error as MongoError).message} as ResponseBody)
        }
    },

    index : async (req : Request, res : Response, next : NextFunction) => {
        try {
        const perPage = PER_PAGE;
        const  branches =  Branch.find({status : true}).sort({ _id: -1 });
        const data = await paginate('branches', branches, req, perPage);
        return res.status(200).json({message: 'Branches', status : 200, data } as ResponseBody)
        } catch (error) {
            return res.status(500).json({message : (error as MongoError).message} as ResponseBody)
        }
    },
    
    update: async (req : Request, res : Response, next : NextFunction) => {
        try{
            const { id : _id } = req.params;
            const branch = await Branch.findOneAndUpdate({_id}, req.body, {new:true}).orFail()
            return res.status(200).json({message:'Branch Updated Successfully', status : 200, data : branch} as ResponseBody)
        }catch(error) {
            return res.status(500).json({message:(error as MongoError).message})
        }
    },

    toggle : async (req:Request, res : Response) => {
        try{
            const { id : _id } = req.params;
            const branch : IBranch = await Branch.findById(_id).orFail();
            branch.status = !branch.status
            await branch.save()
            res.status(200).json({message:`Branch ${branch.status ? 'Activated': 'Deactivated'} successfully`})
           }catch(error) {
            return res.status(500).json({message:(error as MongoError).message})
        }
    }

}


export default branchController