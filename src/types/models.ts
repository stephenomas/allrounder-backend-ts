import {ObjectId, Document} from 'mongoose'

export interface User extends Document {
    _id: ObjectId,
    iddd: string,
    name : string,
    email : string,
    password : string,
    phone: string,
    branch : ObjectId,
    role : ObjectId,
    status : Boolean,
    photo : String
 }


 export interface Branch extends Document {
    _id: ObjectId,
    name: string,
    address: string,
    state: string,
    user: ObjectId
 }

 export interface Ckd extends Document {
    _id: ObjectId,
    type: string,
    amount: number,
    remark : string,
    spec : ObjectId,
    user : ObjectId
    
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
    user: ObjectId
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
    status : string
 }

 export interface Sale extends Document {

 }

 