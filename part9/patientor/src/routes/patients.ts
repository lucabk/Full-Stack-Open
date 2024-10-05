import express from 'express';
import patientsService from '../services/patients_service';

const patientsRouter = express.Router();
//GET
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
//POST
patientsRouter.post('/', (req, res) => {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const { name, dateOfBirth, ssn, gender, occupation } = req.body
    const addedEntry = patientsService.addPatient({name, dateOfBirth, ssn, gender, occupation})
    res.status(201).json(addedEntry)
})  

export default patientsRouter;