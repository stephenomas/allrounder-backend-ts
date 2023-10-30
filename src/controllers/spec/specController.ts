import { Request, Response, NextFunction } from "express";
import { AuthRequest, ResponseBody } from "../../types";
import SpecSchema from "./validation";
import Spec from "../../models/Spec";
import { MongoError } from "mongodb";
import { PER_PAGE } from "../../utils/constants";
import { paginate } from "../../utils/helpers";
import mongoose from "mongoose";


const specController = {
    create : async ( req: AuthRequest, res: Response, next: NextFunction) => {
        const {error} = SpecSchema.validate(req.body)
        if(error){
            return res.status(400).json({message: error.message} as ResponseBody)
        }
        try {
            const exists = await Spec.findOne({name : { $regex: new RegExp(`^${req.body.name}$`, 'i') }, branch: req.user!.branch });
            if(exists) {
                return res.status(400).json({message: 'Model already exists', status : 400} as ResponseBody)
            }
            const spec = await new Spec({
                name : req.body.name,
                type : req.body.type,
                price : req.body.price,
                chasisdigit : req.body.chasisdigit,
                enginedigit : req.body.enginedigit,
                engine : req.body.engine,
                user : req.user!.id,
                branch: req.user!.branch,
                brand : req.body.brand,
            }).save()
            return res.status(200).json({message: 'Model created', status:200, data : spec} as ResponseBody)

        } catch (error) {
            return res.status(500).json({message : (error as MongoError).message} as ResponseBody)
        }
    },
    adminIndex : async ( req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const perPage = PER_PAGE;
            const specs =  Spec.find({}).sort({ _id: -1 });
            const data =  await paginate('Models', specs, req, perPage)
            return res.status(200).json({message: 'Models', status : 200, data } as ResponseBody)
        }catch(error){
            return res.status(500).json({message : (error as MongoError).message} as ResponseBody)
        }
    },
    index : async  ( req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const perPage = PER_PAGE;
            const specs =  Spec.find({status : {$ne : false}}).sort({ _id: -1 });
            const data =  await paginate('Models', specs, req, perPage)
            return res.status(200).json({message: 'Models', status : 200, data } as ResponseBody)
        }catch(error){
            return res.status(500).json({message : (error as MongoError).message} as ResponseBody)
        }
    },
    show : async  ( req: AuthRequest, res: Response, next: NextFunction) => {
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: 'Brand not found' });
        }
        try {
            const model = await Spec.findById(id)
            if(!model) return res.status(404).json({status: 404, message : 'Brand not found'})
            return res.status(200).json({message: 'Model', status : 200, data : model } as ResponseBody)
        }catch(error){
            return res.status(500).json({message : (error as MongoError).message} as ResponseBody)
        }
    },
    edit : async (req : Request, res : Response, next : NextFunction) => {
        try{
            const {error} = SpecSchema.validate(req.body)
            if(error) return res.status(400).json({message: error.message} as ResponseBody)
            const { id : _id } = req.params;
            const branch = await Spec.findOneAndUpdate({_id}, req.body, {new:true}).orFail()
            return res.status(200).json({message:'Models Updated Successfully', status : 200, data : branch} as ResponseBody)
        }catch(error) {
            return res.status(500).json({message:(error as MongoError).message})
        }
    },
    toggle : async (req:Request, res : Response) => {
        try{
            const { id : _id } = req.params;
            const spec  = await Spec.findById(_id).orFail();
            spec.status = !spec.status
            await spec.save()
            res.status(200).json({message:`Model ${spec.status ? 'Activated': 'Deactivated'} successfully`})
           }catch(error) {
            return res.status(500).json({message:(error as MongoError).message})
        }
    }
}


export default specController;