import express from 'express';
import patientsService from '../services/patients_service';
import  toNewPatientEntry  from '../utils';

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
    try{
    const newPatientEntry =  toNewPatientEntry(req.body)//toNewPatientEntry receives the request body as a parameter and returns a properly-typed newPatientEntry object.
    const addedEntry = patientsService.addPatient(newPatientEntry)
    res.status(201).json(addedEntry)
    }
    catch(error:unknown){
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }

})  

export default patientsRouter;