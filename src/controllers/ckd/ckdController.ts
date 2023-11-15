import { NextFunction, Response } from "express";
import { AuthRequest, ResponseBody } from "../../types";
import { CkdSchema } from "./validation";
import Ckd from "../../models/Ckd";
import { MongoError } from "mongodb";
import { PER_PAGE } from "../../utils/constants";
import { paginate } from "../../utils/helpers";


const ckdController = {
    create : async (req : AuthRequest, res : Response, next : NextFunction) => {
        const {error} =  CkdSchema.validate(req.body);
        if(error){
            return res.status(400).json({message: error.message} as ResponseBody)
        }
        try {
            const exists = await Ckd.findOne({spec : req.body.spec });
            if(exists) {
                return res.status(400).json({message: 'Ckd already exists', status : 400} as ResponseBody)
            }
            const spec = await new Ckd({
                type : req.body.type,
                quantity : req.body.quantity,
                remark : req.body.remark,
                spec : req.body.spec,
                user : req.user!.id,
            }).save()
            return res.status(200).json({message: 'Ckd created', status:200, data : spec} as ResponseBody)
        } catch (error) {
            return res.status(500).json({message : (error as MongoError).message} as ResponseBody)

        }
        
    },
    adminIndex : async  ( req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const perPage = PER_PAGE;
            const ckds =  Ckd.find({}).populate({path :'spec', select : 'name'}).sort({ _id: -1 });
            const data =  await paginate('Ckds', ckds, req, perPage)
            return res.status(200).json({message: 'Ckds', status : 200, data } as ResponseBody)
        }catch(error){
            return res.status(500).json({message : (error as MongoError).message} as ResponseBody)
        }
    },
    index : async  ( req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const perPage = PER_PAGE;
            const ckds =  Ckd.find({status : true}).populate({path :'spec', select : 'name'}).sort({ _id: -1 });
            const data =  await paginate('Ckds', ckds, req, perPage)
            return res.status(200).json({message: 'Ckds', status : 200, data } as ResponseBody)
        }catch(error){
            return res.status(500).json({message : (error as MongoError).message} as ResponseBody)
        }
    },
}


export default ckdController
