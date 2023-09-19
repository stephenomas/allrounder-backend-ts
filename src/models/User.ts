import { number } from 'joi';
import mongoose from 'mongoose';
import {User as IUser} from '../types';
import timezone from 'moment-timezone';

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type: String,
        required : true
    },
    phone: {
        type : String,
        required : true,
        unique : true
    },
    branch : {
        type: Number,
        required : true
    },
    role : {
        type: Number,
        required : true
    },
    // branch : {
    //     type : mongoose.Schema.Types.ObjectId, 
    //     ref: 'Branch' 
    // },
    // role : {
    //     type : mongoose.Schema.Types.ObjectId, 
    //     ref: 'Role' 
    // },
    status : {
        type : Boolean,
        default: true
    },
    photo : String,

    
},
{timestamps: true,
 toJSON: { virtuals: true }});



userSchema.set('toJSON', {
    transform: (doc, ret) => {
      // Exclude the 'password' field from the JSON representation
      ret.id = ret._id;
      delete ret.password;
      delete ret.__v;
      delete ret._id;

      return ret;
    },
  });
const User = mongoose.model<IUser>('User', userSchema);

export default User;