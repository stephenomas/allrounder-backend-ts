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

PermissionSchema.set('toJSON', {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret.__v;
      delete ret._id;
      return ret;
    },
  });

const Permission  = mongoose.model<IPermission>('Permission', PermissionSchema);

export default Permission;