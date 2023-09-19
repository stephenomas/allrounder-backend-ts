import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();

// Update below to match your own MongoDB connection string.
const MONGO_URL = process.env.MONGO_URL as string;

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

export async function mongoConnect() {
    await mongoose.connect(MONGO_URL);

}

export async function mongoDisconnect() {
  await mongoose.disconnect();
}

