import express  from 'express';
import { calculateBmi } from './bmiCalculator';

enum StatusCode{
  Ok=200,
  BadRequest=400
}

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  //the body field and the request.query of an Express Request object are explicitly typed any
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  
  if (isNaN(height) || isNaN(weight)) {
    res.status(StatusCode.BadRequest).json({ error: 'malformatted parameters' });
    return;//return here!
  }
  const bmi = calculateBmi(height,weight);
  res.status(StatusCode.Ok).json({weight, height, bmi});
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});