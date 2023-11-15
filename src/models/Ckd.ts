
import mongoose from 'mongoose';
import { Ckd as ICkd } from '../types';

const CkdSchema = new mongoose.Schema({
   type : {
    type : String,
    required : true
   },
   quantity : {
    type : Number,
    required : true
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
   status : {
      type : Boolean,
      default : true

   }
}, 
{
   timestamps:true
})

CkdSchema.set('toJSON', {
   transform: (doc, ret) => {
     
     ret.id = ret._id;
     delete ret.__v;
     delete ret._id;

     return ret;
   },
 });
const Ckd = mongoose.model<ICkd>('Ckd', CkdSchema);

export default Ckd;