import express from 'express';
import patientsService from '../services/patients_service';

const patientsRouter = express.Router();
  
patientsRouter.get('/', (_req, res) => {
    res.status(200).send(patientsService.getPatients())
});

patientsRouter.get('/:id', (req, res) => {
    const id = String(req.params.id)
    const patient = patientsService.getPatientById(id)
    if(patient)
        res.status(200).send(patient)
    else
        res.status(404).send('patient not found')
})

export default patientsRouter;