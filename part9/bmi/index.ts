import express  from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !Array.isArray(daily_exercises) || daily_exercises.some(isNaN) || isNaN(Number(target))) {
    res.status(StatusCode.BadRequest).json({ error: 'malformatted parameters' });
    return;
  }

  const exercises: number[] = daily_exercises.map((n: unknown) => Number(n));
  const result = calculateExercises(exercises, Number(target));
  res.status(StatusCode.Ok).json(result);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});