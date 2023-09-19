import * as dotenv from 'dotenv';

import http from 'http';
import { mongoConnect } from './services/mongo';
import app from './app'

dotenv.config();
const PORT = process.env.PORT;

const server = http.createServer(app);


async function startServer() {
    await mongoConnect();
    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
}
  
startServer();