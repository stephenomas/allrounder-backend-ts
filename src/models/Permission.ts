import mongoose from "mongoose";
import { Permission as IPermission } from "../types";
import { Permission } from '../types/models';

const PermissionSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    }
}, {
    timestamps:true
})


const Permission  = mongoose.model<IPermission>('Permission', PermissionSchema);

export default Permission;