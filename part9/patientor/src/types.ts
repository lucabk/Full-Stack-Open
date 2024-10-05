export interface diagnoseEntry{
    code:string,
    name:string,
    latin?:string
}

export type Gender = 'male' | 'female' | 'other' 
export interface patientEntry{
    id:string
    name:string
    dateOfBirth:string
    ssn:string
    gender:Gender
    occupation:string
}

export type addPatientEntry = Omit<patientEntry, 'id'>

export type patientEntryFiltered = Omit<patientEntry, 'ssn'>