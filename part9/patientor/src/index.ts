import express from 'express';
import cors from 'cors';
import patientsRouter from './routes/patients';
import diagnosesRouter from './routes/diagnoses';
import { errorMiddleware } from './middleware';

const app = express();
app.use(express.json());
app.use(cors());

//PING-PONG
app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses',diagnosesRouter);
app.use('/api/patients', patientsRouter);
app.use(errorMiddleware)

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});