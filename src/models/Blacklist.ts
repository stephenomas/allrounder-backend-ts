import mongoose from "mongoose";
import { Blacklist as IBlacklist } from "../types";

const blacklistSchema = new mongoose.Schema({
    token: {
        type : String,
        required: true
    }
})


const Blacklist = mongoose.model('Blacklist', blacklistSchema);

export default  Blacklist