import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import api from './routes';
import { notFound, errorHandler } from './middleware/errorMiddleware'; 

const app = express();

app.use(cors({
    origin: ['http://localhost:3000','https://allrounder-rkvzcnkh9-stephen-omagbemis-projects.vercel.app'],
  }));

  app.use(morgan('combined'));
  app.use(express.json());

  // app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use('/api/v1', api);
  app.use(notFound);
  app.use(errorHandler);
  
  // app.get('/*', (req, res) => {
  //   res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  // });
  
  export default app;