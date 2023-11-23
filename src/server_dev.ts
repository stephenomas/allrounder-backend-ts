import * as dotenv from 'dotenv';

import https from 'https';
import { mongoConnect } from './services/mongo';
import app from './app'
import fs from 'fs'

dotenv.config();
const PORT = process.env.PORT;

const options = {
  key: fs.readFileSync('/app/ssl/key.pem'),
  cert: fs.readFileSync('/app/ssl/cert.pem'),
  passphrase: 'allrounder'
};


const server = https.createServer(options,app);

//const server = http.createServer(app);
async function startServer() {
    await mongoConnect();
    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
}
  
startServer();