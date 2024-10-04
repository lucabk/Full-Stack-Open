import patientsData from '../../data/patients'
import { patientEntryFiltered } from '../types'

//Patients
const patients: patientEntryFiltered[] = patientsData as patientEntryFiltered[]//type assertion
const getPatients = ():patientEntryFiltered[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) =>({ 
        id, 
        name, 
        dateOfBirth, 
        gender, 
        occupation 
    }))
}

export default { getPatients }