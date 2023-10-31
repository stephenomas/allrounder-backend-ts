
import mongoose from 'mongoose';
import { Product as IProduct } from '../types';

const ProductSchema = new mongoose.Schema({

   chasisnumber : {
    type : String,
    required : true
   }, 
   enginenumber : {
    type : String,
    required : true
   }, 
   color : {
    type : String,
    required : false
   }, 
   trampoline : {
    type : String,
    required : false
   }, 
   user : {
    type : mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
   },
   spec : {
    type : mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Spec"
   },
   remark : {
    type : String,
    required : false
   },
   status : {
      type : Boolean,
      default : true

   }
}, 
{
   timestamps:true
})

ProductSchema.set('toJSON', {
   transform: (doc, ret) => {
     
     ret.id = ret._id;
     delete ret.__v;
     delete ret._id;

     return ret;
   },
 });
const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;