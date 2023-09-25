
import mongoose from 'mongoose';
import { Branch as IBranch } from '../types';

const BranchSchema = new mongoose.Schema({
   name : {
    type : String,
    required : true
   },
   address : {
    type : String, 
    required : true
   },
   state : {
    type : String, 
    required : true
   },
   user : {
    type : mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
   },
   status : {
      type : Boolean,
      default : true

   }
}, 
{
   timestamps:true
})

BranchSchema.set('toJSON', {
   transform: (doc, ret) => {
     // Exclude the 'password' field from the JSON representation
     ret.id = ret._id;
     delete ret.__v;
     delete ret._id;

     return ret;
   },
 });
const Branch  = mongoose.model<IBranch>('Branch', BranchSchema);

export default Branch;