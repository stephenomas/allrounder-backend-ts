
import mongoose from 'mongoose';
import { Brand as IBrand } from '../types';

const BrandSchema = new mongoose.Schema({
   name : {
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

BrandSchema.set('toJSON', {
   transform: (doc, ret) => {
     
     ret.id = ret._id;
     delete ret.__v;
     delete ret._id;

     return ret;
   },
 });
const Brand = mongoose.model<IBrand>('Brand', BrandSchema);

export default Brand;