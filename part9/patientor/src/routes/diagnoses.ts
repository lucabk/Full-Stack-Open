import express from 'express';
import diagnosesService from '../services/diagnoses_service';

const diagnosesRouter = express.Router();
  
diagnosesRouter.get('/', (_req, res) => {
    res.send(diagnosesService.getDiagnoses())
});

export default diagnosesRouter;