import patientsData from '../../data/patients'
import { patientEntryFiltered, newPatientEntry } from '../types'
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
const getPatientById = (id:string):patientEntryFiltered|undefined => {
    const entry = patients.find(p => p.id === id)
    return entry
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