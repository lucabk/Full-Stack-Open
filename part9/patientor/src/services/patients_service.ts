import patientsData from '../../data/patients'
import { patientEntryFiltered, newPatientEntry, PatientEntry } from '../types'
import { v1 as uuid } from 'uuid'

const patients: patientEntryFiltered[] = patientsData as patientEntryFiltered[]//type assertion
//get all
const getPatients = ():patientEntryFiltered[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) =>({ 
        id, 
        name, 
        dateOfBirth, 
        gender, 
        occupation 
    }))
}

//get single
const getPatientById = (id:string):PatientEntry|undefined => {
    const patient: PatientEntry|undefined = patientsData.find(p => p.id === id) 
    return patient
}

//post
const addPatient = ( newPatient:newPatientEntry ):newPatientEntry => {
    const id = String(uuid())
    const newPatientEntry = {
        id,
        ...newPatient
    } 
    patients.push(newPatientEntry)
    return newPatientEntry
}

export default { getPatients, getPatientById, addPatient }