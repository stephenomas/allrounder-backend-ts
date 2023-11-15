import {ObjectId, Document} from 'mongoose'
import { number } from 'joi';

export interface User extends Document {
    _id: ObjectId,
    name : string,
    email : string,
    password : string,
    phone: string,
    branch : ObjectId,
    role : Number,
    status : Boolean,
    photo : String,
    permissions : [
      _id: ObjectId
    ]
 }


 export interface Branch extends Document {
    _id: ObjectId,
    name: string,
    address: string,
    state: string,
    user: ObjectId,
    status: Boolean
 }

 export interface Ckd extends Document {
    _id: ObjectId,
    type: string,
    quantity: number,
    remark : string,
    spec : ObjectId,
    user : ObjectId, 
    status : boolean
    
 }

 export interface Ckd_history extends Document {
    _id: ObjectId,
    ckd : ObjectId,
    action: boolean,
    user: ObjectId
 }

 export interface Brand extends Document {
    _id: ObjectId,
    name: string,
    user: ObjectId,
    status : boolean
 }

 export interface Inventory extends Document {
    _id: ObjectId,
    spec : ObjectId,
    amount: number,
 }

 export interface NumberPlate extends Document {
    _id: ObjectId,
    numberPlate: string,
 }

 export interface Permission extends Document {
    _id: ObjectId,
    name:string
 }

 export interface Product extends Document {
    _id : ObjectId,
    user : ObjectId,
    spec : ObjectId,
    chasisnumber : string,
    enginenumber :string,
    color : string,
    trampoline : string,
    remark: string,
    status : boolean
 }

 export interface Sale extends Document {
    _id: ObjectId,
    name: string,
    email : string,
    number : string,
    address : string,
    paymentMethods : Array<{
        method : string,
        bank? : string,
        account? : string,
        amount : number
    }>,
    paymentStatus : string,
    unit : number,
    price : number,
    discountPrice: number,
    ckdSale: boolean,
    spec : ObjectId, 
    no_of_ckd : number,    
    no_of_engine : number,
    no_of_bolts : number,
    branch: ObjectId
    saleItems? : Array<{
        product: ObjectId,
        price : number, 
        note : string,
    }>
 }

export interface Spec extends Document {
    _id : ObjectId,
    name : string,
    brand : ObjectId,
    user : ObjectId,
    type : string,
    price : number,
    chasisdigit : number,
    enginedigit : number,
    engine : string,
    branch: ObjectId,
    status : boolean
} 


export interface Warehouse extends Document {
    _id : ObjectId,
    user : ObjectId,
    branch : ObjectId,
    destination : ObjectId,
    cbu? : Array<{
        spec: ObjectId,
        products : Array<ObjectId> 
    }>,
    ckd? : ObjectId,
    no_of_engines? : number
    no_of_bolts? : number,
    remark? : string,
    status  : string,
    receiver : ObjectId
}

export interface User_Permission extends Document {
   _id : ObjectId,
   user : ObjectId,
   permission : ObjectId
}


export interface Blacklist extends Document {
   _id : ObjectId,
   token : string
}