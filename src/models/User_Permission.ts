import mongoose from "mongoose";
import { User_Permission as Type } from "../types";

const User_PermissionSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    permission : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission'
    }
});


const User_Permission = mongoose.model<Type>('User_Permission', User_PermissionSchema);

export default User_Permission;