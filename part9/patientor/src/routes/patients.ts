import express from 'express';
import patientsService from '../services/patients_service';
import { Request, Response } from 'express';
import { newPatientParser } from '../middleware';
import { newPatientEntry } from '../types';

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
patientsRouter.post('/', newPatientParser,(req: Request<unknown, unknown, newPatientEntry>, res: Response<newPatientEntry>) => {
    const addedEntry = patientsService.addPatient(req.body)
    res.status(201).json(addedEntry)
})  

export default patientsRouter;