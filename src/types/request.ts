import {Request} from 'express'
import {User} from './models'


export interface AuthRequest extends Request {
    user : Partial<User>
}