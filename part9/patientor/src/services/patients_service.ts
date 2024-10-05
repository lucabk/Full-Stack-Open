import patientsData from '../../data/patients'
import { patientEntryFiltered } from '../types'

const patients: patientEntryFiltered[] = patientsData as patientEntryFiltered[]//type assertion
//all
const getPatients = ():patientEntryFiltered[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) =>({ 
        id, 
        name, 
        dateOfBirth, 
        gender, 
        occupation 
    }))
}

//single
const getPatientById = (id:string):patientEntryFiltered|undefined => {
    const entry = patients.find(p => p.id === id)
    return entry
}

export default { getPatients, getPatientById }