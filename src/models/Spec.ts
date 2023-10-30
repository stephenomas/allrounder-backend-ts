
import mongoose from 'mongoose';
import { Spec as ISpec } from '../types';

const SpecSchema = new mongoose.Schema({
   name : {
    type : String,
    required : true
   },
   type : {
    type : String,
    required : true
   },
   price : {
    type : Number,
    required : true
   },
   chasisdigit : {
    type : Number,
    required : true
   }, 
   enginedigit : {
    type : Number,
    required : true
   }, 
   engine : {
    type : String,
    required : true
   }, 
   user : {
    type : mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
   },
   branch : {
    type : mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Branch"
   },
   brand : {
    type : mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Brand"
   },
   status : {
      type : Boolean,
      default : true

   }
}, 
{
   timestamps:true
})

SpecSchema.set('toJSON', {
   transform: (doc, ret) => {
     
     ret.id = ret._id;
     delete ret.__v;
     delete ret._id;

     return ret;
   },
 });
const Spec = mongoose.model<ISpec>('Spec', SpecSchema);

export default Spec;