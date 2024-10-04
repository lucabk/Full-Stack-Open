import express from 'express';
import patientsService from '../services/patients_service';

const patientsRouter = express.Router();
  
patientsRouter.get('/', (_req, res) => {
    res.send(patientsService.getPatients())
});

export default patientsRouter;